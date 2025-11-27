import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WriteInfo() {
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 페이지 들어올 때 가장 최근 IncidentReport 불러오기
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/report/latest");
        if (res.status === 204) {
          setError("아직 생성된 경위서가 없습니다.");
          return;
        }
        if (!res.ok) {
          throw new Error("서버 응답 오류");
        }
        const data = await res.json();
        setReport(data);
      } catch (e) {
        console.error("경위서 불러오기 실패:", e);
        setError("경위서를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    })();
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

      {/* 제목 */}
      <div
        style={{
          left: 60,
          top: 145,
          position: "absolute",
          fontSize: 28,
          fontWeight: 600,
        }}
      >
        자동 출동 경위서
      </div>

      {/* 정보/본문 박스 */}
      <div
        style={{
          width: 1160,
          height: 560,
          left: 60,
          top: 190,
          position: "absolute",
          background: "#F2F2F2",
          borderRadius: 20,
          padding: 24,
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        {loading && <div style={{ fontSize: 18 }}>경위서를 불러오는 중입니다...</div>}

        {!loading && error && (
          <div style={{ fontSize: 18, color: "#D46464" }}>{error}</div>
        )}

        {!loading && !error && report && (
          <>
            {/* 사건 기본 정보 */}
            <div style={{ marginBottom: 20, fontSize: 16, color: "#555" }}>
              <div>
                <b>이벤트 ID:</b> {report.eventId}
              </div>
              <div>
                <b>카메라 ID:</b> {report.cameraId}
              </div>
              <div>
                <b>감지 객체:</b> {report.detectedClass}
              </div>
              <div>
                <b>위험도:</b> {report.dangerLevel}
              </div>
              <div>
                <b>영상 다운로드:</b>{" "}
                <a
                  href={report.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#0D6CFB" }}
                >
                  {report.videoUrl}
                </a>
              </div>
            </div>

            {/* 요약 */}
            {report.summary && (
              <div
                style={{
                  marginBottom: 20,
                  padding: 12,
                  background: "white",
                  borderRadius: 12,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  fontSize: 15,
                  color: "#333",
                }}
              >
                <b>요약</b>
                <div style={{ marginTop: 8, whiteSpace: "pre-line" }}>
                  {report.summary}
                </div>
              </div>
            )}

            {/* 전체 경위서 */}
            <div
              style={{
                padding: 16,
                background: "white",
                borderRadius: 12,
                boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                fontSize: 15,
                color: "#222",
                whiteSpace: "pre-line", // 줄바꿈 유지
              }}
            >
              {report.report}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
