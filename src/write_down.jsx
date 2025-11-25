// src/video_info.jsx
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** ---------------------- 1. 모달 컴포넌트 (VideoModal) ---------------------- */
function VideoModal({ videoTitle, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: 900,
          height: 600,
          background: "white",
          borderRadius: 20,
          padding: 30,
          position: "relative",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ fontSize: 36, fontWeight: 600, marginBottom: 20 }}>
          {videoTitle} 영상 정보
        </h2>

        <div
          style={{
            width: "100%",
            height: 400,
            backgroundColor: "#333",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: 24,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          [여기에 비디오 플레이어 삽입]
        </div>

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 30,
            background: "none",
            border: "none",
            fontSize: 30,
            cursor: "pointer",
            color: "#555",
          }}
        >
          &times;
        </button>

        <div style={{ fontSize: 18, color: "#666" }}>
          <b>탐지 시간:</b> 2025-11-25 10:30:00<br />
          <b>파일 크기:</b> 150MB
        </div>
      </div>
    </div>
  );
}

/** ---------------------- 2. 영상 목록 아이템 ---------------------- */
function VideoItem({ top, title, onVideoClick }) {
  const leftBase = title.includes("우측") ? 612 : 24;

  return (
    <>
      <div
        style={{
          width: 550,
          height: 107,
          left: leftBase,
          top,
          position: "absolute",
          background: "#D9D9D9",
          borderRadius: 20,
          cursor: "pointer",
        }}
       // onClick={() => onVideoClick(title)}
      />

      {/* 썸네일 */}
      <div
        style={{
          width: 80,
          height: 80,
          left: leftBase + 13,
          top: top + 14,
          position: "absolute",
          background: "rgba(0,0,0,0.25)",
          borderRadius: 20,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: leftBase + 33,
          top: top + 47,
          fontSize: 15,
          fontWeight: 300,
        }}
      >
        썸네일
      </div>

      {/* 제목 */}
      <div
        style={{
          position: "absolute",
          left: leftBase + 150,
          top: top + 47,
          fontSize: 15,
          fontWeight: 300,
        }}
      >
        {title}
      </div>

      {/* 영상 확인 버튼 */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onVideoClick(title);
        }}
        style={{
          width: 105,
          height: 45,
          left: leftBase + 433,
          top: top + 30,
          position: "absolute",
          background: "rgba(13,108,251,0.36)",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 300 }}>경위서 작성</div>
      </div>
    </>
  );
}

/** ---------------------- 3. 메인 컴포넌트 ---------------------- */
export default function WriteInfo() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState("");

  const handleVideoClick = (title) => {
    setSelectedVideoTitle(title);
    setIsModalOpen(true);
  };
  const [videoData, setVideoData] = useState([]);
  
  useEffect(() => {
   async function fetchVideos() {
    try {
      const res = await fetch('/api/videos');   // 아직 존재하지 않아도 됨
      if (!res.ok) throw new Error("API 응답 오류");
      const data = await res.json();

      // 서버에서 ["좌측", "우측"] 이런 title만 주는 경우가 있으니 여기서 UI용 처리도 가능
      setVideoData(data);

    } catch (err) {
      console.error(" 영상 목록 불러오기 실패:", err);
      // 실패해도 화면은 기존처럼 빈 상태 + 오류 없음
    }
  }

  fetchVideos();
}, []);
  return (
    <div
      style={{
        width: 1280,
        height: 793,
        margin: "0 auto",
        position: "relative",
        background: "white",
        overflow: "hidden",
        fontFamily: "Pretendard",
      }}
    >
      {/* 로고 */}
      <div
        onClick={() => navigate("/main-page")}
        style={{
          left: 53,
          top: 49,
          position: "absolute",
          fontSize: 50,
          fontWeight: 300,
          cursor: "pointer",
        }}
      >
        SMARTSHIELD
      </div>

      {/* 상단 라인 */}
      <div
        style={{
          width: "100%",
          height: 0,
          top: 116,
          position: "absolute",
          borderTop: "1px solid black",
        }}
      />

      {/* 아이콘 */}
      <img
        src="image_file/guide_icon.png"
        style={{
          width: 69,
          height: 69,
          left: 1104,
          top: 26,
          position: "absolute",
        }}
        alt="가이드"
      />

      <img
        src="image_file/home_icon.png"
        style={{
          width: 100,
          height: 100,
          left: 1170,
          top: 16,
          position: "absolute",
          cursor: "pointer",
        }}
        onClick={() => navigate("/main-page")}
        alt="홈"
      />

      {/* 검색창 */}
      <div
        style={{
          width: 1138,
          height: 47,
          left: 24,
          top: 136,
          position: "absolute",
          background: "#D9D9D9",
          borderRadius: 20,
        }}
      />

      {/* 검색 아이콘 */}
      <img
        src="image_file/search_icon.png"
        style={{
          width: 25,
          height: 25,
          left: 42,
          top: 148,
          position: "absolute",
        }}
      />

      {/* 영상 리스트 */}
      {videoData.map((v) => (
        <VideoItem key={v.id} top={v.top} title={v.title} onVideoClick={handleVideoClick} />
      ))}

      {/* 페이지네이션 */}
      <div
        style={{
          left: 507,
          top: 752,
          position: "absolute",
          fontSize: 30,
          fontWeight: 300,
        }}
      >
        1&nbsp;&nbsp;2&nbsp;&nbsp;3&nbsp;&nbsp;4&nbsp;&nbsp;5
      </div>

      <img
        src="image_file/left_bar.png"
        style={{
          width: 30,
          height: 55,
          left: 464,
          top: 740,
          position: "absolute",
          cursor: "pointer",
        }}
        alt="이전"
      />

      <img
        src="image_file/right_bar.png"
        style={{
          width: 23,
          height: 44,
          left: 670,
          top: 747,
          position: "absolute",
          cursor: "pointer",
        }}
        alt="다음"
      />

      {/* 모달 */}
      <VideoModal
        videoTitle={selectedVideoTitle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
