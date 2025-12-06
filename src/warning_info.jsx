import React from "react";
import { useNavigate } from "react-router-dom";

/* ---------------- Mock: 탐지 내역 ---------------- */
const eventList = [
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
    id: 106,
    event_id: "evt_20251126_230539",
    camera_id: "live_demo_cam",
    detected_class: "guns",
    danger_level: "HIGH",
    created_at: "2025-11-26T23:05:39",
    video_url:
      "https://smartshield-detections-dev.s3.ap-northeast-2.amazonaws.com/20251126/live_demo_cam/clips/evt_20251126_230539_guns_high.mp4",
  },

  // 더미 추가
  {
    id: 201,
    event_id: "evt_20251125_104455",
    camera_id: "parking_lot_cam",
    detected_class: "person",
    danger_level: "LOW",
    created_at: "2025-11-25T10:44:55",
    video_url: "https://example.com/v1.mp4",
  },
  {
    id: 202,
    event_id: "evt_20251124_083344",
    camera_id: "front_gate_cam",
    detected_class: "car",
    danger_level: "MEDIUM",
    created_at: "2025-11-24T08:33:44",
    video_url: "https://example.com/v2.mp4",
  },
  {
    id: 203,
    event_id: "evt_20251123_201522",
    camera_id: "live_demo_cam",
    detected_class: "knife",
    danger_level: "HIGH",
    created_at: "2025-11-23T20:15:22",
    video_url: "https://example.com/v3.mp4",
  },
];

export default function WarningInfo() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: 1280,
        height: 793,
        margin: "0 auto",
        position: "relative",
        background: "white",
        fontFamily: "Pretendard",
      }}
    >
      {/* ----------------------------------- 로고 ----------------------------------- */}
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

      {/* ----------------------------------- 가이드 아이콘 ----------------------------------- */}
      <img
        src="image_file/guide_icon.png"
        style={{
          width: 69,
          height: 69,
          left: 1104,
          top: 26,
          position: "absolute",
          cursor: "pointer",
        }}
        alt="guide"
      />

      {/* ----------------------------------- 홈 아이콘 ----------------------------------- */}
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
        alt="home"
      />

      {/* 상단 구분선 */}
      <div
        style={{
          width: "100%",
          top: 116,
          position: "absolute",
          borderTop: "1px solid black",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/*                       2-Column Layout Start                        */}
      {/* ------------------------------------------------------------------ */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 150,
          left: 24,
          width: 1130,
          gap: 30,
        }}
      >
        {/* -------------------- 왼쪽 상세 정보 -------------------- */}
        <div
          style={{
            flex: 1,
            background: "#EDEDED",
            borderRadius: 20,
            padding: "30px 30px",
            minHeight: 460,
          }}
        >
          <h2 style={{ fontSize: 28, marginBottom: 20 }}>위험 탐지 상세 정보</h2>

          <div style={{ fontSize: 18, lineHeight: 1.6 }}>
            <b>위험 수준:</b> HIGH <br />
            <b>점수:</b> 92.3 <br />
            <b>주요 분류:</b> Weapon
          </div>

          <h3 style={{ marginTop: 25, marginBottom: 10 }}>감지 근거</h3>
          <ul>
            <li>칼 형태의 객체가 85% 확률로 감지됨</li>
            <li>프레임 연속 검출에서 위험 패턴 일치</li>
          </ul>

          <h3 style={{ marginTop: 25, marginBottom: 10 }}>탐지 히스토리</h3>
          <ul>
            <li>2025-11-28 00:27:08 - Knife detected</li>
            <li>2025-11-27 23:34:07 - Knife detected</li>
            <li>2025-11-26 23:05:39 - Guns detected</li>
          </ul>
        </div>

        {/* -------------------- 오른쪽: 탐지 내역 -------------------- */}
        <div
          style={{
            flex: 1.2,
            background: "#F8F8F8",
            borderRadius: 20,
            padding: 20,
            maxHeight: 460,
            overflowY: "auto",
          }}
        >
          <h3 style={{ fontSize: 22, marginBottom: 15 }}>
            📌 위험 객체 탐지 내역
          </h3>

          {eventList.map((e) => (
            <div
              key={e.id}
              style={{
                background: "#fff",
                padding: "12px 15px",
                borderRadius: 12,
                border: "1px solid #DDD",
                marginBottom: 12,
                fontSize: 16,
              }}
            >
              <b>{e.event_id}</b>
              <br />
              카메라: {e.camera_id}  
              <br />
              객체: {e.detected_class} | 위험도: {e.danger_level}
              <br />
              시간: {e.created_at}
              <br />
              <a href={e.video_url} target="_blank" style={{ color: "#0D6CFB" }}>
                🔗 영상 링크
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
