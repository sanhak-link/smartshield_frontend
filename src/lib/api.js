// src/lib/api.js
// ──────────────────────────────────────────────────────────────
// 프록시(상대경로)와 절대경로(.env) 둘 다 지원
//    - .env가 비어있으면 Vite 프록시(/api → 8080)를 가정
//    - .env가 있으면 그 값을 절대 BASE로 사용
//  /api 중복/누락 자동 회피, v1 경로까지 후보 시도
//  JSON 파싱 실패/네트워크 오류/서버 HTML 에러 대응
//  토큰 키 자동 인식(accessToken | token)
// ──────────────────────────────────────────────────────────────

const RAW_BASE = (import.meta.env.VITE_API_BASE_URL || '').trim();
const ABS_BASE = RAW_BASE.replace(/\/+$/, '');     // 절대경로 사용 시
const USE_PROXY = ABS_BASE === '';                 // 프록시 모드 여부

// 내부 유틸
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchWithTimeout(url, init = {}, timeoutMs = 10000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: ctrl.signal, ...init });
  } finally {
    clearTimeout(id);
  }
}

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// 프록시 모드일 때는 기본적으로 /api 프리픽스를 붙인다.
// 절대 BASE가 있을 때는 BASE 뒤에 붙인다.
function buildUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (USE_PROXY) {
    // 이미 /api 로 시작하면 그대로, 아니면 /api 붙이기
    return p.startsWith('/api/') ? p : `/api${p}`;
  }
  return `${ABS_BASE}${p}`;
}

// 로그인 후보 경로 생성 (/api 유무/버전 자동 커버)
function loginCandidates() {
  if (USE_PROXY) {
    // 프록시 모드: 프론트는 /api로 호출 → 백엔드가 /api를 쓴다는 가정
    return ['/api/auth/login', '/api/v1/auth/login', '/auth/login'];
  }
  // 절대 BASE 모드
  const baseHasApi = /\/api$/.test(ABS_BASE);
  if (baseHasApi) {
    return [`${ABS_BASE}/auth/login`, `${ABS_BASE}/v1/auth/login`];
  }
  return [`${ABS_BASE}/api/auth/login`, `${ABS_BASE}/auth/login`, `${ABS_BASE}/api/v1/auth/login`];
}

function saveTokenMaybe(data) {
  const token = data?.accessToken || data?.token || null;
  if (token) {
    try {
      localStorage.setItem('accessToken', token);
    } catch { /* storage 막힌 환경 대비 */ }
  }
  return token;
}

export function getToken() {
  try { return localStorage.getItem('accessToken'); } catch { return null; }
}
export function clearToken() {
  try { localStorage.removeItem('accessToken'); } catch {}
}

// ── API: 로그인 ───────────────────────────────────────────────
export async function login({ email, password }) {
  const body = JSON.stringify({ email, password });
  const candidates = loginCandidates();
  let lastErr = '로그인 실패';

  for (const url of candidates) {
    try {
      const res = await fetchWithTimeout(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      }, 10000);

      // 네트워크 레벨 실패가 아니면 응답 파싱
      const data = await safeJson(res);
      const success =
        res.ok && (data?.success === true || data?.ok === true || data?.accessToken || data?.token);

      if (!success) {
        lastErr = (data && (data.message || data.error)) || `HTTP ${res.status} at ${url}`;
        // 다른 후보도 시도
        continue;
      }

      saveTokenMaybe(data);
      return { ok: true, data, used: url };
    } catch (e) {
      // fetch 자체가 터진 경우(ECONNREFUSED, timeout, abort 등)
      lastErr = e?.message || '네트워크 오류';
      // 아주 짧게 양보 후 다음 후보
      await sleep(50);
      continue;
    }
  }

  return { ok: false, error: lastErr };
}

// ── API: 인증 필요 호출 ───────────────────────────────────────
export async function apiAuthFetch(path, options = {}) {
  const token = getToken();
  const headers = new Headers(options.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);

  // JSON 바디면 자동으로 Content-Type 세팅
  const init = { ...options, headers };
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const url = buildUrl(path);
  const res = await fetchWithTimeout(url, init, 10000);

  // 204(No Content) 케이스 방어
  let data = null;
  if (res.status !== 204) data = await safeJson(res);

  return { status: res.status, ok: res.ok, data, used: url };
}
