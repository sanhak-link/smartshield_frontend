import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------- Mock Data ---------------- */
const mockEventList = [
  {
    id: 104,
    event_id: "evt_20251128_002708",
    camera_id: "live_demo_cam",
    detected_class: "knife",
    danger_level: "HIGH",
    created_at: "2025-11-28T00:27:08",
    video_url:
      "https://smartshield-detections-dev.s3.ap-northeast-2.amazonaws.com/20251128/live_demo_cam/clips/evt_20251128_002708_knife_high.mp4",
  },
  {
    id: 102,
    event_id: "evt_20251128_002639",
    camera_id: "live_demo_cam",
    detected_class: "knife",
    danger_level: "HIGH",
    created_at: "2025-11-28T00:26:39",
    video_url:
      "https://smartshield-detections-dev.s3.ap-northeast-2.amazonaws.com/20251128/live_demo_cam/clips/evt_20251128_002639_knife_high.mp4",
  },
  {
    id: 101,
    event_id: "evt_20251128_002622",
    camera_id: "live_demo_cam",
    detected_class: "knife",
    danger_level: "HIGH",
    created_at: "2025-11-28T00:26:22",
    video_url:
      "https://smartshield-detections-dev.s3.ap-northeast-2.amazonaws.com/20251128/live_demo_cam/clips/evt_20251128_002622_knife_high.mp4",
  },
  {
    id: 105,
    event_id: "evt_20251127_233407",
    camera_id: "live_demo_cam",
    detected_class: "knife",
    danger_level: "HIGH",
    created_at: "2025-11-27T23:34:07",
    video_url:
      "https://smartshield-detections-dev.s3.ap-northeast-2.amazonaws.com/20251127/live_demo_cam/clips/evt_20251127_233407_knife_high.mp4",
  },
  {
    id: 103,
    event_id: "evt_20251127_232633",
    camera_id: "live_demo_cam",
    detected_class: "knife",
    danger_level: "HIGH",
    created_at: "2025-11-27T23:26:33",
    video_url:
      "https://smartshield-detections-dev.s3.ap-northeast-2.amazonaws.com/20251127/live_demo_cam/clips/evt_20251127_232633_knife_high.mp4",
  },
  {
    id: 106,
    event_id: "evt_20251126_230539",
    camera_id: "live_demo_cam",
    detected_class: "guns",
    danger_level: "HIGH",
    created_at: "2025-11-26T23:05:39",
    video_url:
      "https://smartshield-detections-dev.s3.ap-northeast-2.amazonaws.com/20251126/live_demo_cam/clips/evt_20251126_230539_guns_high.mp4",
  },
  {
    id: 107,
    event_id: "evt_20251123_193342",
    camera_id: "live_demo_cam",
    detected_class: "guns",
    danger_level: "HIGH",
    created_at: "2025-11-23T19:33:42",
    video_url:
      "https://smartshield-detections-dev.s3.ap-northeast-2.amazonaws.com/20251123/live_demo_cam/clips/evt_20251123_193342_guns_high.mp4",
  },
];

/* ------------------------------------------- */
/* 2. 리스트 아이템 (레이아웃 그대로 유지) */
/* ------------------------------------------- */

function VideoItem({ index, event }) {
  const column = index % 2;
  const row = Math.floor(index / 2);
  const leftBase = column === 1 ? 612 : 24;
  const top = 215 + row * 130 + 20;

  const dangerColor = {
    HIGH: "rgba(255,100,100,0.5)",
    MEDIUM: "rgba(255,200,100,0.5)",
    LOW: "rgba(0,0,0,0.25)",
  };

  const downloadVideo = () => {
    const link = document.createElement("a");
    link.href = event.video_url;
    link.download = `${event.event_id}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          background: dangerColor[event.danger_level],
          borderRadius: 20,
        }}
      />

      {/* 위험도 텍스트 */}
      <div
        style={{
          left: leftBase + 33,
          top: top + 47,
          position: "absolute",
          fontSize: 15,
          fontWeight: "bold",
        }}
      >
        {event.danger_level}
      </div>

      {/* 이벤트 ID */}
      <div
        style={{
          left: leftBase + 110,
          top: top + 47,
          position: "absolute",
          fontSize: 15,
          fontWeight: "bold",
          width: 300,
        }}
      >
        {event.event_id}
      </div>

      {/* 다운로드 버튼 */}
      <div
        onClick={downloadVideo}
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
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: 15 }}>다운로드</div>
      </div>
    </>
  );
}

/* ------------------------------------------- */
/* 3. 메인 화면 (검색 기능 포함) */
/* ------------------------------------------- */

export default function VideoInfo() {
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setVideoData(mockEventList);
  }, []);

  /* ---- 검색 필터 ---- */
  const filteredList = videoData.filter((e) => {
    const q = searchValue.toLowerCase();
    return (
      e.event_id.toLowerCase().includes(q) ||
      e.camera_id.toLowerCase().includes(q) ||
      e.detected_class.toLowerCase().includes(q)
    );
  });

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
      {/* ------------------ 로고 ------------------ */}
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

      <div
        style={{
          width: "100%",
          top: 116,
          borderTop: "1px solid black",
          position: "absolute",
        }}
      />

      {/* ------------------ 가이드 아이콘 ------------------ */}
      <img
        src="image_file/guide_icon.png"
        style={{
          width: 69,
          height: 69,
          left: 1104,
          top: 26,
          position: "absolute",
          cursor: "pointer",
          zIndex: 2000,
        }}
        alt=""
      />

      {/* ------------------ 홈 아이콘 ------------------ */}
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
        alt=""
      />

      {/* ------------------ 검색창 ------------------ */}
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

      {/* 검색 입력 */}
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="이벤트 ID, 카메라 ID, 감지 객체로 검색..."
        style={{
          left: 80,
          top: 145,
          position: "absolute",
          width: 1000,
          height: 30,
          border: "none",
          background: "transparent",
          outline: "none",
          fontSize: 18,
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
        alt=""
      />

      {/* ------------------ 리스트 ------------------ */}
      {filteredList.map((event, i) => (
        <VideoItem key={event.id} index={i} event={event} />
      ))}
    </div>
  );
}
