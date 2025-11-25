import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WarningInfo() {
  const navigate = useNavigate();
  
  const [dangerInfo, setDangerInfo] = useState(null);

  // 위험 정보 API 호출
  useEffect(() => {
    async function fetchDangerInfo() {
      try {
        const res = await fetch("/api/alerts/info");   // 백엔드 엔드포인트 이름은 원하는 걸로 수정 가능
        if (!res.ok) throw new Error("API 오류");
        const data = await res.json();
        setDangerInfo(data);
      } catch (err) {
        console.error("위험 정보 불러오기 실패:", err);
      }
    }
    fetchDangerInfo();
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
      {/* ---------------------- 상단 로고 ---------------------- */}
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

      {/* 상단 아이콘 */}
      <img
        src="image_file/guide_icon.png"
        style={{ width: 69, height: 69, left: 1104, top: 26, position: "absolute" }}
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

      {/* 검색창 (video_info와 동일 위치 유지) */}
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

      <img
        src="image_file/search_icon.png"
        style={{
          width: 25,
          height: 25,
          left: 42,
          top: 148,
          position: "absolute",
        }}
        alt="검색"
      />

      {/* ---------------------- 위험 탐지 정보 ---------------------- */}
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 210,
          width: 1138,
          minHeight: 500,
          background: "#ECECEC",
          borderRadius: 20,
          padding: "30px 40px",
          fontSize: 20,
          overflowY: "auto",
        }}
      >
        <h2 style={{ marginBottom: 20, fontSize: 32, fontWeight: 600 }}>
          위험 탐지 상세 정보
        </h2>

        {!dangerInfo ? (
          <div style={{ fontSize: 22, color: "#555" }}>불러오는 중...</div>
        ) : (
          <>
            {/* Level & Score */}
            <div style={{ marginBottom: 20 }}>
              <b>위험 수준(Level):</b> {dangerInfo.level}
              <br />
              <b>점수(score):</b> {dangerInfo.score}
              <br />
              <b>주요 분류(main_class):</b> {dangerInfo.main_class}
            </div>

            {/* Reasons 배열 */}
            <div style={{ marginBottom: 20 }}>
              <b>감지 근거(reasons):</b>
              <ul style={{ marginTop: 10 }}>
                {dangerInfo.reasons.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
            </div>

            {/* History 배열 */}
            <div style={{ marginBottom: 20 }}>
              <b>탐지 히스토리(history):</b>
              <ul style={{ marginTop: 10 }}>
                {dangerInfo.history.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
