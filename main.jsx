import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './home';
import Register from './src/register';
import Detail from './src/detail.jsx';   // 경로 수정
import './app.css';

/** ---------- 알림 상태 훅 ---------- */
function useAlertState() {
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        const res = await fetch('/api/alerts/active', {
          signal: ctrl.signal,
          credentials: 'include',
        });
        if (res.ok) {
          const d = await res.json();
          setIsAlert(!!(d && (d.active || d.alert)));
        }
      } catch (_) {
        const q = new URLSearchParams(window.location.search);
        if (q.get('alert') === '1') setIsAlert(true);
      }
    })();

    let es;
    try {
      es = new EventSource('/api/alerts/stream', { withCredentials: true });
      es.addEventListener('alert.created', () => setIsAlert(true));
      es.addEventListener('alert.resolved', () => setIsAlert(false));
    } catch (_) {}

    return () => {
      ctrl.abort();
      if (es) es.close();
    };
  }, []);

  return isAlert;
}

/** ---------- 정상 레이아웃 ---------- */
function NormalLayout() {
  const navigate = useNavigate();  // detail page 경로 추가됨

  return (
    <div
      style={{
        width: 1280,
        height: 800,
        position: 'relative',
        background: 'white',
        overflow: 'hidden',
        margin: '0 auto',
        fontFamily:
          'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", Arial, sans-serif',
      }}
    >

      <div
        style={{
          width: 1280,
          height: 0,
          left: 0,
          top: 116,
          position: 'absolute',
          borderTop: '1px solid black',
        }}
      />

      {/* 왼쪽 카드 */}
      <div
        style={{
          width: 575,
          height: 624,
          left: 40,
          top: 138,
          position: 'absolute',
          background: 'rgba(78, 95, 208, 0.30)',
          borderRadius: 20,
        }}
      />

      <div
        style={{
          width: 443.77,
          height: 73.75,
          left: 106,
          top: 416,
          position: 'absolute',
          textAlign: 'center',
          color: 'black',
          fontSize: 40,
          fontWeight: 500,
          cursor: 'pointer',
          lineHeight: '22px',
        }}
       // onClick={() => navigate('/detail')}   // 정상 이동
      >
        도움 요청이
        <br />
        <br />
        존재하지 않습니다
        <br />
      </div>

      <img
        style={{
          width: 203,
          height: 305,
          left: 430,
          top: 407,
          position: 'absolute',
        }}
        src="image_file/normal_bird.png"
        alt="도움 요청 없음 캐릭터"
      />

      {/* 상단 로고 */}
      <div
        style={{
          width: 369,
          height: 64,
          left: 53,
          top: 53,
          position: 'absolute',
          textAlign: 'center',
          color: 'black',
          fontSize: 50,
          fontWeight: 300,
          lineHeight: '22px',
        }}
      >
        SMARTSHIELD
      </div>

      <div
        style={{
          width: 770,
          height: 31,
          left: 1101,
          top: 57,
          position: 'absolute',
          color: 'black',
          fontSize: 20,
          fontWeight: 300,
          lineHeight: '22px',
          textAlign: 'right',
        }}
      >
        정보 수정
      </div>

      {/* 오른쪽 영상 내역 패널 */}
      <div
        style={{
          width: 550,
          height: 350,
          left: 640,
          top: 138,
          position: 'absolute',
          background: '#D9D9D9',
          borderRadius: 20,
        }}
      />

      <div
        style={{
          width: 177,
          height: 31,
          left: 660,
          top: 175,
          position: 'absolute',
          textAlign: 'center',
          color: 'black',
          fontSize: 40,
          fontWeight: 500,
        }}
      >
        영상 내역
      </div>

      <div
        style={{
          width: 371,
          height: 64,
          left: 851,
          top: 182,
          position: 'absolute',
          color: 'black',
          fontSize: 20,
          fontWeight: 300,
          lineHeight: '22px',
        }}
      >
        현장의 전체 영상 및
        <br />
        위험 상황 영상을 확인할 수 있습니다.
      </div>

      <div
        style={{
          width: 470,
          height: 70,
          left: 672,
          top: 240,
          position: 'absolute',
          background: 'white',
          borderRadius: 20,
        }}
      />

      <div
        style={{
          width: 470,
          height: 70,
          left: 672,
          top: 328,
          position: 'absolute',
          background: 'white',
          borderRadius: 20,
        }}
      />

      <button
        type="button"
        style={{
          width: 460,
          height: 50,
          left: 677,
          top: 416,
          position: 'absolute',
          background: '#096BC7',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        전체 영상 확인하기
      </button>

      {/* 경위서 작성 패널 */}
      <div
        style={{
          width: 550,
          height: 250,
          left: 640,
          top: 510,
          position: 'absolute',
          background: '#D9D9D9',
          borderRadius: 20,
        }}
      />

      <div
        style={{
          width: 195,
          height: 35,
          left: 660,
          top: 525,
          position: 'absolute',
          textAlign: 'center',
          color: 'black',
          fontSize: 40,
          fontWeight: 500,
        }}
      >
        경위서 작성
      </div>

      <div
        style={{
          width: 287,
          height: 64,
          left: 862,
          top: 529,
          position: 'absolute',
          color: 'black',
          fontSize: 20,
          fontWeight: 300,
          lineHeight: '22px',
        }}
      >
        AI가 영상을 확인하고 요약하여
        <br />
        상황에 맞는 경위서를 작성해줍니다.
      </div>

      <div
        style={{
          width: 470,
          height: 70,
          left: 672,
          top: 586,
          position: 'absolute',
          background: 'white',
          borderRadius: 20,
        }}
      />

      <button
        type="button"
        style={{
          width: 460,
          height: 50,
          left: 677,
          top: 683,
          position: 'absolute',
          background: '#096BC7',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        새 경위서 작성
      </button>
    </div>
  );
}

/** ---------- 알림 모드 ---------- */
function AlertLayout() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: 1280,
        height: 800,
        position: 'relative',
        background: 'white',
        overflow: 'hidden',
        margin: '0 auto',
        fontFamily:
          'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", Arial, sans-serif',
      }}
    >

      <div
        style={{
          width: 1280,
          height: 0,
          left: 0,
          top: 116,
          position: 'absolute',
          borderTop: '1px solid black',
        }}
      />

      <div
        style={{
          width: 369,
          height: 35,
          left: 53,
          top: 53,
          position: 'absolute',
          textAlign: 'center',
          color: 'black',
          fontSize: 50,
          fontWeight: 300,
          lineHeight: '22px',
        }}
      >
        SMARTSHIELD
      </div>

      <div
        style={{
          width: 770,
          height: 31,
          left: 1101,
          top: 57,
          position: 'absolute',
          color: 'black',
          fontSize: 20,
          fontWeight: 300,
          lineHeight: '22px',
          textAlign: 'right',
        }}
      >
        정보 수정
      </div>

      {/* 영상 내역 패널 */}
      <div
        style={{
          width: 550,
          height: 350,
          left: 640,
          top: 138,
          position: 'absolute',
          background: '#D9D9D9',
          borderRadius: 20,
        }}
      />

      <div
        style={{
          width: 177,
          height: 31,
          left: 660,
          top: 175,
          position: 'absolute',
          textAlign: 'center',
          color: 'black',
          fontSize: 40,
          fontWeight: 500,
        }}
      >
        영상 내역
      </div>

      <div
        style={{
          width: 371,
          height: 64,
          left: 851,
          top: 182,
          position: 'absolute',
          color: 'black',
          fontSize: 20,
          fontWeight: 300,
          lineHeight: '22px',
        }}
      >
        현장의 전체 영상 및
        <br />
        위험 상황 영상을 확인할 수 있습니다.
      </div>

      <div
        style={{
          width: 470,
          height: 70,
          left: 672,
          top: 240,
          position: 'absolute',
          background: 'white',
          borderRadius: 20,
        }}
      />

      <div
        style={{
          width: 470,
          height: 70,
          left: 672,
          top: 328,
          position: 'absolute',
          background: 'white',
          borderRadius: 20,
        }}
      />

      <button
        type="button"
        style={{
          width: 460,
          height: 50,
          left: 677,
          top: 416,
          position: 'absolute',
          background: '#096BC7',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        전체 영상 확인하기
      </button>

      {/* 경위서 작성 */}
      <div
        style={{
          width: 550,
          height: 250,
          left: 640,
          top: 510,
          position: 'absolute',
          background: '#D9D9D9',
          borderRadius: 20,
        }}
      />

      <div
        style={{
          width: 195,
          height: 35,
          left: 660,
          top: 525,
          position: 'absolute',
          textAlign: 'center',
          color: 'black',
          fontSize: 40,
          fontWeight: 500,
        }}
      >
        경위서 작성
      </div>

      <div
        style={{
          width: 287,
          height: 64,
          left: 862,
          top: 529,
          position: 'absolute',
          color: 'black',
          fontSize: 20,
          fontWeight: 300,
          lineHeight: '22px',
        }}
      >
        AI가 영상을 확인하고 요약하여
        <br />
        상황에 맞는 경위서를 작성해줍니다.
      </div>

      <div
        style={{
          width: 470,
          height: 70,
          left: 672,
          top: 586,
          position: 'absolute',
          background: 'white',
          borderRadius: 20,
        }}
      />

      <button
        type="button"
        style={{
          width: 460,
          height: 50,
          left: 677,
          top: 683,
          position: 'absolute',
          background: '#096BC7',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        새 경위서 작성
      </button>

      {/* 좌측 빨간 패널 */}
      <div
        style={{
          width: 549.72,
          height: 624,
          left: 67,
          top: 138,
          position: 'absolute',
          background: '#D46464',
          borderRadius: 20,
          cursor: 'pointer',
        }}
        onClick={() => navigate('/detail')}
      />

      <img
        style={{
          width: 228.24,
          height: 342.36,
          left: 413.76,
          top: 389.04,
          position: 'absolute',
        }}
        src="image_file/emergency_bird.png"
        alt="위급 상황 캐릭터"
      />

      <div
        style={{
          width: 443.77,
          height: 73.75,
          left: 119.97,
          top: 423.91,
          position: 'absolute',
          textAlign: 'center',
          color: 'white',
          fontSize: 40,
          fontWeight: 500,
        }}
      >
        도움 요청을 확인해주세요
      </div>
    </div>
  );
}

/** ---------- 대시보드 ---------- */
function Dashboard() {
  const isAlert = useAlertState();
  return isAlert ? <AlertLayout /> : <NormalLayout />;
}

/** ---------- 라우팅 ---------- */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main-page" element={<Dashboard />} />
        <Route path="/detail" element={<Detail />} />  {/*detail 페이지 정상 등록 */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
