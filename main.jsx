import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './home.jsx';
import Register from './src/register';
import Detail from './src/detail.jsx';
import VideoInfo from './src/video_info.jsx';
import WarningInfo from './src/warning_info.jsx';
import WriteInfo from './src/write_down.jsx';
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

// 기본 상태 
function NormalLayout() {
  const navigate = useNavigate();
  return (
    <div style={{ width: 1280, height: 800, position: 'relative', background: 'white', overflow: 'hidden' }}>

      {/* ===== 오른쪽 패널 1: 위험 탐지 내역 ===== */}
      <div style={{
        width: 550, height: 120, left: 640, top: 136,
        position: 'absolute', background: '#D9D9D9', borderRadius: 20
      }}
       onClick={() => navigate('/warning-info')}  
      />

      <div style={{
        left: 660, top: 165, position: 'absolute',
        color: 'black', fontSize: 32, fontWeight: 600
      }}
      >
        위험 탐지 내역
      </div>

      <div style={{
        left: 662, top: 207, position: 'absolute',
        color: '#444', fontSize: 18, fontWeight: 300, lineHeight: '22px'
      }}>
        알림 내역을 확인할 수 있습니다.
      </div>


      {/* ===== 오른쪽 패널 2: 영상 내역 ===== */}
      <div style={{
        width: 550, height: 120, left: 640, top: 287,
        position: 'absolute', background: '#D9D9D9', borderRadius: 20
      }}
       onClick={() => navigate('/video-info')} 
      />

      <div style={{
        left: 660, top: 310,position: 'absolute',
        color: 'black', fontSize: 32, fontWeight: 600
      }}>
        영상 내역
      </div>
      

      <div style={{
        left: 660, top: 355, position: 'absolute',
        color: '#444', fontSize: 18, fontWeight: 300, lineHeight: '22px'
      }}>
        현장의 전체 영상 및 위험 상황 영상을 확인할 수 있습니다.
      </div>


      {/* ===== 오른쪽 패널 3: 경위서 작성 ===== */}
      <div style={{
        width: 550, height: 120, left: 640, top: 435,
        position: 'absolute', background: '#D9D9D9', borderRadius: 20
      }}
      onClick={() => navigate('/write-down')}  
      />

      <div style={{
        left: 660, top: 455, position: 'absolute',
        color: 'black', fontSize: 32, fontWeight: 600
      }}>
        경위서 작성
      </div>

      <div style={{
        left: 660, top: 500, position: 'absolute',
        color: '#444', fontSize: 18, fontWeight: 300, lineHeight: '22px'
      }}>
        AI가 영상을 확인하고 요약하여<br />
        상황에 맞는 경위서를 작성해줍니다.
      </div>


      {/* ===== 상단 로고 ===== */}
      <div style={{
        left: 53, top: 53, position: 'absolute',
        fontSize: 50, fontWeight: 300
      }}>
        SMARTSHIELD
      </div>

      {/* ===== 상단 라인 ===== */}
      <div
        style={{
          width: 1280, height: 0, left: 0, top: 116,
          position: 'absolute', borderTop: '1px solid black'
        }}
      />

      {/* ===== 상단 아이콘 ===== */}
       <img style={{ width: 69, height: 69, left: 1104, top: 26, position: 'absolute' }} src="image_file/guide_icon.png" />
       <img style={{ width: 100, height: 100, left: 1170, top: 16, position: 'absolute' }} src="image_file/home_icon.png" onClick={() => navigate('/main-page')}  />


      {/* ===== 좌측 패널 ===== */}
      <div style={{
        width: 575, height: 624, left: 40, top: 138,
        position: 'absolute', background: 'rgba(78,95,208,0.30)', borderRadius: 20
      }} />

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
      >
        도움 요청이
        <br />
        <br />
        존재하지 않습니다
        <br />
      </div>

      <img
        style={{
          width: 230, height: 330,
          left: 404, top: 410,
          position: 'absolute'
        }}
        src="image_file/normal_bird.png"
      />
    </div>
  );
}


// alert 상태
function AlertLayout() {
  const navigate = useNavigate();

  const handleAlertClick = async () => {
    try {
      await fetch('/api/alerts/resolve', { method: 'POST' });
    } catch (_) {}
    navigate('/detail');
  };

  return (
    <div style={{ width: 1280, height: 800, position: 'relative', background: 'white', overflow: 'hidden' }}>

      {/* ===== 오른쪽 패널 1 ===== */}
      <div style={{
        width: 550, height: 120, left: 640, top: 136,
        position: 'absolute', background: '#D9D9D9', borderRadius: 20
      }}
      onClick={() => navigate('/warning-info')}  
      />

      <div style={{
        left: 660, top: 165, position: 'absolute',
        color: 'black', fontSize: 32, fontWeight: 600
      }}>
        위험 탐지 내역
      </div>

      <div style={{
        left: 662, top: 207, position: 'absolute',
        color: '#444', fontSize: 18, fontWeight: 300, lineHeight: '22px'
      }}>
        알림 내역을 확인할 수 있습니다.
      </div>

      {/* ===== 오른쪽 패널 2 ===== */}
      <div style={{
        width: 550, height: 120, left: 640, top: 287,
        position: 'absolute', background: '#D9D9D9', borderRadius: 20
      }}
       onClick={() => navigate('/video-info')} 
      />

      <div style={{
        left: 660, top: 310, position: 'absolute',
        color: 'black', fontSize: 32, fontWeight: 600
      }}>
        영상 내역
      </div>

      <div style={{
        left: 660, top: 355, position: 'absolute',
        color: '#444', fontSize: 18, fontWeight: 300, lineHeight: '22px'
      }}>
        현장의 전체 영상 및 위험 상황 영상을 확인할 수 있습니다.
      </div>

      {/* ===== 오른쪽 패널 3 ===== */}
      <div style={{
        width: 550, height: 120, left: 640, top: 435,
        position: 'absolute', background: '#D9D9D9', borderRadius: 20
      }}
      onClick={() => navigate('/write-down')}  
      />

      <div style={{
        left: 660, top: 455, position: 'absolute',
        color: 'black', fontSize: 32, fontWeight: 600
      }}>
        경위서 작성
      </div>

      <div style={{
        left: 660, top: 500, position: 'absolute',
        color: '#444', fontSize: 18, fontWeight: 300, lineHeight: '22px'
      }}>
        AI가 영상을 확인하고 요약하여<br />
        상황에 맞는 경위서를 작성해줍니다.
      </div>


      {/* ===== 상단 로고 ===== */}
      <div style={{
        left: 53, top: 53, position: 'absolute',
        fontSize: 50, fontWeight: 300
      }}>
        SMARTSHIELD
      </div>

      {/* ===== 상단 구분선 ===== */}
      <div
        style={{
          width: 1280, height: 0, left: 0, top: 116,
          position: 'absolute', borderTop: '1px solid black'
        }}
      />

      {/* ===== 상단 아이콘 ===== */}
      <img style={{ width: 69, height: 69, left: 1104, top: 26, position: 'absolute' }} src="image_file/guide_icon.png" />
      <img style={{ width: 100, height: 100, left: 1170, top: 16, position: 'absolute' }} src="image_file/home_icon.png"/>


      {/* ===== 좌측 빨간 패널 ===== */}
      <div
        onClick={handleAlertClick}
        style={{
          width: 575, height: 624, left: 40, top: 138,
          position: 'absolute', background: '#D46464', borderRadius: 20,
          cursor: 'pointer'
        }}
      />

      <img
        style={{
          width: 230, height: 330,
          left: 411, top: 410,
          position: 'absolute'
        }}
        src="image_file/emergency_bird.png"
      />

      <div
        style={{
          width: 443.77,
          height: 73.75,
          left: 106,
          top: 416,
          position: 'absolute',
          textAlign: 'center',
          color: 'white',
          fontSize: 40,
          fontWeight: 500,
          cursor: 'pointer',
          lineHeight: '22px',
        }}
      >
        도움 요청을
        <br />
        <br />
        확인해주세요
        <br />
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
        <Route path="/detail" element={<Detail />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/video-info" element={<VideoInfo />} />
        <Route path="/warning-info" element={<WarningInfo />} />
        <Route path="/write-down" element={<WriteInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <div
    style={{
      width: "100vw",
      height: "100vh",
      background: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden"
    }}
  >
    <div style={{ transform: "translateY(-130px)" }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </div>
  </div>
);
