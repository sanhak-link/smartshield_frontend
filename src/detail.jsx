// detail.jsx
import React from "react";

export default function Detail() {
  return (
    //  화면 가운데 1280×800 고정
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
      {/*layout*/}
      <div
        style={{
          width: 1280,
          height: 800,
          position: "relative",
          background: "white",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 550,
            height: 265,
            left: 640,
            top: 158,
            position: "absolute",
            background: "#D9D9D9",
            borderRadius: 20,
          }}
        />
        <div
          style={{
            width: 312,
            height: 64,
            left: 756,
            top: 321,
            position: "absolute",
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
        <div
          style={{
            width: 265,
            height: 265,
            left: 640,
            top: 443,
            position: "absolute",
            background: "#D46464",
            borderRadius: 20,
          }}
        />
        <div
          style={{
            width: 265,
            height: 265,
            left: 926,
            top: 443,
            position: "absolute",
            background: "#D9D9D9",
            borderRadius: 20,
          }}
        />
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
        <div
          style={{
            width: 510,
            height: 31,
            left: 657,
            top: 275,
            position: "absolute",
            textAlign: "center",
            color: "black",
            fontSize: 40,
            fontWeight: 500,
            lineHeight: "22px",
            wordWrap: "break-word",
          }}
        >
          해당 경찰관 위치 및 정보 출력
        </div>
        <div
          style={{
            width: 237,
            height: 35,
            left: 654,
            top: 564,
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: 40,
            fontWeight: 500,
            lineHeight: "22px",
            wordWrap: "break-word",
          }}
        >
          추가 인원 출동
        </div>
        <div
          style={{
            width: 400,
            height: 607,
            left: -708,
            top: 70,
            position: "absolute",
            background: "rgba(78.13, 95.49, 208.34, 0.30)",
            borderRadius: 20,
          }}
        />
        <div
          style={{
            width: 550,
            height: 550,
            left: 64,
            top: 158,
            position: "absolute",
            background: "#D46464",
            borderRadius: 20,
          }}
        />
        <div
          style={{
            width: 444,
            height: 65,
            left: 117,
            top: 652,
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: 40,
            fontWeight: 500,
            lineHeight: "22px",
            wordWrap: "break-word",
          }}
        >
          {"< 객체명 >"}
        </div>
        <div
          style={{
            width: 444,
            height: 65,
            left: 117,
            top: 192,
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: 35,
            fontWeight: 500,
            lineHeight: "22px",
            wordWrap: "break-word",
          }}
        >
          위험 요소 판단 결과
        </div>
        <div
          style={{
            width: 400,
            height: 400,
            left: 141,
            top: 233,
            position: "absolute",
            background: "#D9D9D9",
            borderRadius: 20,
          }}
        />
        <div
          style={{
            width: 312,
            height: 64,
            left: 185,
            top: 401,
            position: "absolute",
            textAlign: "center",
            color: "black",
            fontSize: 20,
            fontWeight: 300,
            lineHeight: "22px",
            wordWrap: "break-word",
          }}
        >
          내부에 위험 객체 영상 또는 이미지가
          <br />
          들어갈 예정입니다.
        </div>
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
        <div
          style={{
            width: 770,
            height: 31,
            left: 1110,
            top: 55,
            position: "absolute",
            color: "black",
            fontSize: 20,
            fontWeight: 300,
            lineHeight: "22px",
            wordWrap: "break-word",
          }}
        >
          정보 수정
        </div>
      </div>
    </div>
  );
}
