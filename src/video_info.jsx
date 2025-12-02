// src/video_info.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------------- 1. 모달 ---------------------- */
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
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: 24,
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
            fontSize: 30,
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

/* ---------------------- 2. 영상 목록 아이템 ---------------------- */
function VideoItem({ index, title, onVideoClick }) {
  const top = 215 + index * 130 + 20;
  const leftBase = title.includes("우측") ? 612 : 24;

  return (
    <>
      <div
        style={{
          width: 550,
          height: 107,
          left: leftBase,
          top: top,
          position: "absolute",
          background: "#D9D9D9",
          borderRadius: 20,
          cursor: "pointer",
        }}
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
          left: leftBase + 33,
          top: top + 47,
          position: "absolute",
          fontSize: 15,
        }}
      >
        썸네일
      </div>

      {/* 제목 */}
      <div
        style={{
          left: leftBase + 150,
          top: top + 47,
          position: "absolute",
          fontSize: 15,
        }}
      >
        {title}
      </div>

      {/* 영상 확인 버튼 */}
      <div
        onClick={() => onVideoClick(title)}
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
        <div style={{ fontSize: 15 }}>영상 확인</div>
      </div>
    </>
  );
}

/* ---------------------- 3. 메인 ---------------------- */
export default function VideoInfo() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState("");
  const [videoData, setVideoData] = useState([]);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleOpenTutorial = () => {
    setShowTutorial(true);
  };

  const handleVideoClick = (title) => {
    setSelectedVideoTitle(title);
    setIsModalOpen(true);
  };

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        if (!res.ok) throw new Error("API 오류 발생");
        const data = await res.json();
        setVideoData(data);
      } catch (err) {
        console.error("영상 목록 불러오기 실패:", err);
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
          cursor: "pointer",
        }}
      >
        SMARTSHIELD
      </div>

      {/* 상단 라인 */}
      <div
        style={{
          width: "100%",
          top: 116,
          borderTop: "1px solid black",
          position: "absolute",
        }}
      />

      {/* 가이드 아이콘 */}
      <img
        src="image_file/guide_icon.png"
        onClick={handleOpenTutorial}
        style={{
          width: 69,
          height: 69,
          left: 1104,
          top: 26,
          position: "absolute",
          cursor: "pointer",
          zIndex: 2000,
        }}
      />

      {/* 홈 */}
      <img
        src="image_file/home_icon.png"
        onClick={() => navigate("/main-page")}
        style={{
          width: 100,
          height: 100,
          left: 1170,
          top: 16,
          position: "absolute",
          cursor: "pointer",
        }}
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

      {/* 영상 목록 */}
      {videoData.map((v, i) => (
        <VideoItem
          key={v.id}
          index={i}
          title={v.title}
          onVideoClick={handleVideoClick}
        />
      ))}

      {/* 모달 */}
      <VideoModal
        videoTitle={selectedVideoTitle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
