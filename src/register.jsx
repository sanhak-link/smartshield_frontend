import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, sendEmailCode, verifyEmailCode } from "./lib/api.js";

// 선택 가능한 이메일 도메인 목록 
const DOMAIN_LIST = [
  "chungbuk.ac.kr",
  "cbnu.ac.kr",
  // 필요한 도메인 추가
];

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    // 기존 email을 분리합니다.
    emailLocalPart: "", // @ 앞부분
    emailDomain: "",    // @ 뒷부분 (도메인)
    emailCode: "",
    password: "",
    isEmailVerified: false,
  });

  const [msg, setMsg] = useState("");
  const [emailSendLoading, setEmailSendLoading] = useState(false);
  const [emailVerifyLoading, setEmailVerifyLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // 도메인 선택 모달 표시 여부 상태
  const [showDomainModal, setShowDomainModal] = useState(false);

  // 완성된 이메일 주소를 반환하는 헬퍼 함수
  const getFullEmail = () => {
    if (!form.emailLocalPart || !form.emailDomain) return "";
    return `${form.emailLocalPart}@${form.emailDomain}`;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  // 도메인 선택 핸들러
  const handleSelectDomain = (domain) => {
    setForm((p) => ({ ...p, emailDomain: domain }));
    setShowDomainModal(false);
  };

  // 인증코드 보내기
  const handleSendEmailCode = async () => {
    const fullEmail = getFullEmail();
    if (!form.emailLocalPart.trim()) {
        setMsg("이메일 아이디를 입력하세요.");
        return;
    }
    if (!form.emailDomain) {
        setMsg("이메일 도메인을 선택하세요.");
        return;
    }
    // 간단한 이메일 형식 검사 (필요시 정규식 강화)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fullEmail)) {
      setMsg("올바른 이메일 형식이 아닙니다.");
      return;
    }

    setEmailSendLoading(true);
    setMsg("");
    // 변경된 부분: fullEmail을 사용
    const res = await sendEmailCode(fullEmail);
    setEmailSendLoading(false);
    setMsg(res.ok ? "인증 코드가 발송되었습니다." : (res.error || "인증 코드 발송 실패"));
  };

  // 인증코드 확인
  const handleVerifyEmailCode = async () => {
    const fullEmail = getFullEmail();
    if (!fullEmail) {
        setMsg("이메일을 먼저 입력해주세요.");
        return;
    }
    if (!form.emailCode.trim()) {
      setMsg("인증 코드를 입력하세요.");
      return;
    }
    setEmailVerifyLoading(true);
    setMsg("");
    // 변경된 부분: fullEmail 사용
    const res = await verifyEmailCode({ email: fullEmail, code: form.emailCode });
    setEmailVerifyLoading(false);
    if (!res.ok) setMsg(res.error || "인증 실패");
    else {
      setForm((p) => ({ ...p, isEmailVerified: true }));
      setMsg("✔ 이메일 인증이 완료되었습니다.");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const fullEmail = getFullEmail();

    if (!form.name.trim()) return setMsg("이름을 입력하세요.");
    if (!fullEmail) return setMsg("이메일을 입력하세요.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fullEmail)) return setMsg("이메일 형식이 올바르지 않습니다.");
    if (!form.isEmailVerified) return setMsg("이메일 인증을 완료해주세요.");
    if (form.password.length < 6) return setMsg("비밀번호는 6자 이상이어야 합니다.");

    setLoading(true);
    setMsg("");
    try {
      const res = await signup({
        email: fullEmail, // 변경된 부분
        password: form.password,
        name: form.name,
        phoneNumber: form.phoneNumber,
      });
      if (!res.ok) setMsg(res.error || "회원가입에 실패했습니다.");
      else {
        localStorage.removeItem('accessToken');
        navigate("/home");
      }
    } catch {
      setMsg("네트워크 오류");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: 1280, height: 800, margin: "0 auto", position: 'relative', background: 'white', overflow: 'hidden' }}>
        {/* 배경 패널 */}
      <div style={{ width: 545, height: 680, left: 382, top: 67, position: 'absolute', background: 'rgba(78.13, 95.49, 208.34, 0.30)', borderRadius: 20 }} />
      
      {/* 메인 타이틀 */}
      <div style={{ width: 535, left: 414, top: 125, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'Pretendard', fontWeight: '700', wordWrap: 'break-word' }}>시스템 사용을 위해 정보를 입력해주세요.</div>

      {/* --- 이름 영역 --- */}
      <div style={{ left: 420, top: 176, position: 'absolute', color: 'rgba(0, 0, 0, 0.85)', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600', wordWrap: 'break-word' }}>이름</div>
      <InputBox x={420} y={203} w={469}>
        <input name="name" value={form.name} onChange={onChange} placeholder="이름을 입력해주세요" style={inputStyle} />
      </InputBox>

      {/* --- 전화번호 영역 --- */}
      <div style={{ left: 420, top: 265, position: 'absolute', color: 'rgba(0, 0, 0, 0.85)', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600', wordWrap: 'break-word' }}>전화번호</div>
      <InputBox x={421} y={289} w={468}>
        <input name="phoneNumber" value={form.phoneNumber} onChange={onChange} placeholder="전화번호를 입력해주세요" style={inputStyle} />
      </InputBox>

      {/* --- 이메일 영역 (분할 디자인 적용) --- */}
      <div style={{ left: 420, top: 354, position: 'absolute', color: 'rgba(0, 0, 0, 0.85)', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600', wordWrap: 'break-word' }}>이메일(현재 학교 도메인만 가능합니다)</div>
      
      {/* 1. 이메일 아이디 입력 박스 (좌측) */}
      <InputBox x={421} y={376} w={146}>
        <input name="emailLocalPart" value={form.emailLocalPart} onChange={onChange} placeholder="이메일 ID" style={inputStyle} />
      </InputBox>

      {/* 2. @ 기호 */}
      <div style={{ width: 33, height: 36, left: 570, top: 383, position: 'absolute', color: 'rgba(0, 0, 0, 0.85)', fontSize: 30, fontFamily: 'Pretendard', fontWeight: '600', textAlign: 'center' }}>@</div>

      {/* 3. 도메인 선택 박스 (중앙 우측) - 클릭 시 모달 오픈 */}
      <div 
        onClick={() => setShowDomainModal(true)}
        style={{ width: 136, height: 50, left: 605, top: 376, position: 'absolute', background: 'white', borderRadius: 6, display:'flex', alignItems:'center', padding:'0 16px', cursor:'pointer' }}
      >
         <div style={{ color: form.emailDomain ? '#111' : '#888888', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '500', width:'100%', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {form.emailDomain || "-선택-"}
         </div>
      </div>

      {/* 4. 인증 코드 보내기 버튼 (우측 끝) */}
      <ActionBtn
        x={748} y={376} w={141}
        text={emailSendLoading ? "발송 중..." : "인증 코드 보내기"}
        onClick={emailSendLoading ? undefined : handleSendEmailCode}
      />

      {/* --- 인증 코드 입력 영역 --- */}
      <div style={{ left: 420, top: 452, position: 'absolute', color: 'rgba(0, 0, 0, 0.85)', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600', wordWrap: 'break-word' }}>인증 코드</div>
      <InputBox x={421} y={474} w={320}>
         <input name="emailCode" value={form.emailCode} onChange={onChange} placeholder="인증 코드를 입력해주세요" style={inputStyle} />
      </InputBox>
       {/* 인증 확인 버튼 */}
      <ActionBtn
        x={748} y={474} w={141}
        text={emailVerifyLoading ? "확인 중..." : "인증 확인"}
        onClick={emailVerifyLoading ? undefined : handleVerifyEmailCode}
      />

      {/* --- 비밀번호 영역 --- */}
      <div style={{ left: 421, top: 548, position: 'absolute', color: 'rgba(0, 0, 0, 0.85)', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600', wordWrap: 'break-word' }}>비밀번호</div>
      <InputBox x={420} y={572} w={469}>
        <input name="password" type="password" value={form.password} onChange={onChange} placeholder="••••••••" style={inputStyle} />
      </InputBox>


      {/* 메시지 표시 영역 */}
      {msg && (
        <div style={{ position: "absolute", left: 420, top: 630, width: 469, color: form.isEmailVerified ? "#1C9A36" : "#c00", fontSize: 14, fontWeight: 600, fontFamily: 'Pretendard' }}>
          {msg}
        </div>
      )}


      {/* --- 가입하기 버튼 --- */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        style={{
          width: 468, height: 50, left: 420, top: 658, position: 'absolute',
          background: '#096BC7', borderRadius: 6, border: 'none',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1
        }}
      >
        <div style={{ color: 'white', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600' }}>
          {loading ? "처리 중..." : "가입하기"}
        </div>
      </button>


      {/* --- 도메인 선택 모달 --- */}
      {showDomainModal && (
        <DomainSelectionModal 
            domainList={DOMAIN_LIST} 
            onSelect={handleSelectDomain} 
            onClose={() => setShowDomainModal(false)} 
        />
      )}

    </div>
  );
}


/* ───────────────── Helper UI Components ───────────────── */

// 입력 박스 래퍼 (디자인 제공 좌표/크기 기반)
function InputBox({ x, y, w, children }) {
    return (
      <div style={{ width: w, height: 50, left: x, top: y, position: "absolute", background: "white", borderRadius: 6, display: "flex", alignItems: "center", padding: "0 16px", boxSizing: "border-box" }}>
        {children}
      </div>
    );
}

// 보라색 액션 버튼 (인증코드 발송/확인용)
function ActionBtn({ x, y, w, text, onClick }) {
    return (
      <button type="button" onClick={onClick} style={{ width: w, height: 50, left: x, top: y, position: "absolute", background: '#7658E4', overflow: 'hidden', borderRadius: 6, justifyContent: 'center', alignItems: 'center', display: 'inline-flex', border:'none', cursor:'pointer', padding:0 }}>
        <div style={{ textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600', wordWrap: 'break-word' }}>
            {text}
        </div>
      </button>
    );
}

// input 태그 기본 스타일
const inputStyle = {
    width: "100%", height: "100%", border: "none", outline: "none", background: "transparent", fontSize: 16, fontWeight: 500, color: "#111", fontFamily: 'Pretendard'
};


/* ───────────────── 도메인 선택 모달 컴포넌트 ───────────────── */
function DomainSelectionModal({ domainList, onSelect, onClose }) {
    return (
        // 모달 배경 (클릭 시 닫힘)
        <div 
            onClick={onClose}
            style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1000,
                display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}
        >
            {/* 모달 컨텐츠 박스 */}
            <div 
                onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
                style={{
                    width: 300, backgroundColor: 'white', borderRadius: 12,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)', overflow: 'hidden',
                    fontFamily: 'Pretendard'
                }}
            >
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #eee', fontWeight: 700, fontSize: 18 }}>
                    도메인 선택
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: '10px 0', maxHeight: 300, overflowY: 'auto' }}>
                    {domainList.map((domain) => (
                        <li 
                            key={domain}
                            onClick={() => onSelect(domain)}
                            style={{
                                padding: '12px 20px', cursor: 'pointer', fontSize: 16,
                                transition: 'background 0.2s', color: '#333'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = '#f5f5f5'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                        >
                            @{domain}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}