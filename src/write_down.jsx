import React, { useState, useEffect } from "react";

export default function WriteInfo() {
  const [latestVideo, setLatestVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);   // 시작하자마자 로딩 ON
  const [report, setReport] = useState("");  // 경위서 저장

 useEffect(() => {
  async function fetchLatestVideo() {
    try {
      const res = await fetch("/api/videos/latest");
      if (!res.ok) throw new Error("API 에러");

      const data = await res.json();
      setLatestVideo(data);

       // 최신 영상 ID로 경위서 요청
      await fetchReport(data.id);
      

      setIsLoading(false);

    } catch (err) {
      console.error("최신 영상 불러오기 실패:", err);
      // 실패해도 로딩 유지 → setIsLoading(false) 제거
    }
  }

  fetchLatestVideo();
}, []);

  // 백엔드 경위서 API 요청
  async function fetchReport(videoId) {
    try {
      const res = await fetch(`/api/videos/${videoId}/report`);
      if (!res.ok) throw new Error("경위서 API 에러");

      const data = await res.json();
      setReport(data.report);   // "report" 필드에 경위서 전체 텍스트

    } catch (err) {
      console.error("경위서 가져오기 실패:", err);
    }
  }

  return (
    <div
      style={{
        width: 1280,
        height: 793,
        position: "relative",
        background: "white",
        overflow: "hidden",
      }}
    >

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

      {/* 큰 내용 박스 */}
      <div
        style={{
          width: 1138,
          height: 500,
          left: 24,
          top: 215,
          position: "absolute",
          background: "rgba(217,217,217,0.30)",
          borderRadius: 20,
          padding: 20,              // ← 추가
          overflowY: "auto",        // ← 추가
        }}
      >

        {/* 분석 중 로딩 화면 */}
        {isLoading && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              background: "rgba(255,255,255,0.4)",
              zIndex: 10,
              borderRadius: 20,
            }}
          >
           <div
             className="spinner"
             style={{
             borderRadius: "50%",
             height: 48,
             width: 48,
             borderBottom: "3px solid #1D4ED8",
             }}
            >           
            </div>


            <p style={{ marginLeft: 16, color: "#4B5563", fontSize: 18 }}>
              영상을 분석하고 경위서를 작성하는 중입니다...
            </p>
          </div>
        )}
        {/* 경위서 출력 */}
  {!isLoading && report && (
    <div
      style={{
        padding: 20,
        fontSize: 18,
        lineHeight: "28px",
        whiteSpace: "pre-line",
      }}
    >
      {report}
    </div>
  )}

      </div>

      {/* SMARTSHIELD 로고 */}
      <div
        style={{
          width: 369,
          height: 35,
          left: 53,
          top: 49,
          position: "absolute",
          textAlign: "center",
          color: "black",
          fontSize: 50,
          fontFamily: "Pretendard",
          fontWeight: 300,
          lineHeight: "22px",
          wordWrap: "break-word",
          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        SMARTSHIELD
      </div>

      {/* 최신 영상 제목 */}
      {latestVideo && (
        <div
          style={{
            left: 40,
            top: 230,
            position: "absolute",
            fontSize: 20,
            fontWeight: 400,
          }}
        >
          최신 영상: {latestVideo.title}
        </div>
      )}

      {/* 왼쪽 외곽 박스 */}
      <div
        style={{
          width: 400,
          height: 607,
          left: -708,
          top: 70,
          position: "absolute",
          background: "rgba(78,95,208,0.30)",
          borderRadius: 20,
        }}
      />

      {/* 상단 라인 */}
      <div
        style={{
          width: 1280,
          height: 0,
          left: 0,
          top: 116,
          position: "absolute",
          outline: "1px solid black",
        }}
      />

      {/* 홈 아이콘 */}
      <img
        style={{
          width: 100,
          height: 100,
          left: 1180,
          top: 15,
          position: "absolute",
        }}
        src="image_file/home_icon.png"
        alt="home"
      />

      {/* "영상 제목" */}
      <div
        style={{
          width: 70,
          height: 23,
          left: 558,
          top: 148,
          position: "absolute",
          textAlign: "center",
          color: "black",
          fontSize: 15,
          fontFamily: "Pretendard",
          fontWeight: 300,
        }}
      >
         {latestVideo ? latestVideo.title : "영상 제목"}
      </div>

      {/* 가이드 */}
      <img
        style={{
          width: 69,
          height: 69,
          left: 1104,
          top: 28,
          position: "absolute",
        }}
        src="image_file/guide_icon.png"
        alt="guide"
      />
    </div>
  );
}
