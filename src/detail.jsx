import React from "react";
import { useNavigate } from "react-router-dom";

export default function Detail() {
   const navigate = useNavigate();
  return (
    // 화면 가운데 1280×800 고정
    <div
      style={{
        width: 1280,
        height: 800,
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
        background: "white",
        fontFamily:
          'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: 1280,
          height: 800,
          position: "relative",
          background: "white",
          overflow: "hidden",
        }}
      >
        {/* 1. 상단 타이틀 영역 (SMARTSHIELD) */}
        <div
          style={{
            width: 369,
            height: 35,
            left: 44,
            top: 53,
            position: "absolute",
            textAlign: "center",
            color: "black",
            fontSize: 50,
            fontWeight: 300,
            lineHeight: "22px",
            wordWrap: "break-word",
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          SMARTSHIELD
        </div>

        {/* 상단 구분선 */}
        <div
          style={{
            width: 1280,
            height: 0,
            left: 0,
            top: 117,
            position: "absolute",
            outline: "1px black solid",
            outlineOffset: "-0.50px",
          }}
        />

        {/* 2. 메인 정보 영역 (상단 빨간색 바 + 아래 큰 회색 영역) */}

        {/* 🔴 상단 빨간색 바 (실시간 현장 상황 타이틀) */}
        <div
          style={{
            width: 1125,
            height: 57,
            left: 64,
            top: 158,
            position: "absolute",
            background: "#D46464",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: "hidden",
          }}
        >
          {/* 텍스트: 실시간 현장 상황 */}
          <div
            style={{
              width: "100%",
              height: 28,
              top: 17,
              position: "absolute",
              textAlign: "center",
              color: "white",
              fontSize: 35,
              fontWeight: 500,
              lineHeight: "22px",
              wordWrap: "break-word",
            }}
          >
            실시간 현장 상황
          </div>
        </div>

        {/* 🌫️ 아래 큰 회색 영역 (데이터/영상 출력 공간) */}
        <div
          style={{
            width: 1125,
            height: 430,
            left: 64,
            top: 158 + 57,
            position: "absolute",
            background: "#D9D9D9",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            // 상단 바와 붙이기 위해 border-radius 조정
            overflow: "hidden", // 영상이 영역을 벗어나지 않도록 설정
          }}
        >
          {/* 실시간 카메라 영상 스트림 */}
          <img
            src="http://localhost:5001/live"
            alt="실시간 현장 영상"
            style={{
              width: "calc(100% - 40px)",
              height: "calc(100% - 40px)",
              margin: "20px", // 영역 내부에 20px 마진
              objectFit: "cover",
              borderRadius: 12,
              backgroundColor: "black", // 스트림 안 뜰 때 배경
            }}
          />
        </div>

        {/* 3. 하단 버튼 영역 */}

        {/* 🌫️ 왼쪽 버튼: 해당 경찰관 위치 및 정보 출력 */}
        <div
          style={{
            width: 550,
            height: 104,
            left: 64,
            top: 668,
            position: "absolute",
            background: "#D9D9D9",
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "black",
              fontSize: 30,
              fontWeight: 500,
              lineHeight: "22px",
              wordWrap: "break-word",
            }}
          >
            해당 경찰관 위치 및 정보 출력
          </div>
          <div
            style={{
              marginTop: 10,
              textAlign: "center",
              color: "black",
              fontSize: 20,
              fontWeight: 300,
              lineHeight: "22px",
              wordWrap: "break-word",
            }}
          >
            세부 정보 출력은 개발 예정입니다
          </div>
        </div>

        {/* 🔴 오른쪽 버튼: 추가 인원 출동 */}
        <div
          style={{
            width: 550,
            height: 104,
            left: 633,
            top: 668,
            position: "absolute",
            background: "#D46464",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 40,
              fontWeight: 500,
              lineHeight: "22px",
              wordWrap: "break-word",
            }}
            onClick={() => navigate("/main-page")}
          >
            추가 인원 출동
          </div>
        </div>
      </div>
    </div>
  );
}