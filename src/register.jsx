import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, sendEmailCode, verifyEmailCode } from "./lib/api.js";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    emailCode: "",
    password: "",
    isEmailVerified: false,
  });

  const [msg, setMsg] = useState("");
  const [emailSendLoading, setEmailSendLoading] = useState(false);
  const [emailVerifyLoading, setEmailVerifyLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  // 인증코드 보내기
  const handleSendEmailCode = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMsg("올바른 이메일을 입력하세요.");
      return;
    }
    setEmailSendLoading(true);
    setMsg("");
    const res = await sendEmailCode(form.email);
    setEmailSendLoading(false);
    setMsg(res.ok ? "인증 코드가 발송되었습니다." : (res.error || "인증 코드 발송 실패"));
  };

  // 인증코드 확인
  const handleVerifyEmailCode = async () => {
    if (!form.emailCode.trim()) {
      setMsg("인증 코드를 입력하세요.");
      return;
    }
    setEmailVerifyLoading(true);
    setMsg("");
    const res = await verifyEmailCode({ email: form.email, code: form.emailCode });
    setEmailVerifyLoading(false);
    if (!res.ok) setMsg(res.error || "인증 실패");
    else {
      setForm((p) => ({ ...p, isEmailVerified: true }));
      setMsg("✔ 이메일 인증이 완료되었습니다.");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setMsg("이름을 입력하세요.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setMsg("이메일 형식이 올바르지 않습니다.");
    if (!form.isEmailVerified) return setMsg("이메일 인증을 완료해주세요.");
    if (form.password.length < 6) return setMsg("비밀번호는 6자 이상이어야 합니다.");

    setLoading(true);
    setMsg("");
    try {
      const res = await signup({
        email: form.email,
        password: form.password,
        name: form.name,
        phoneNumber: form.phoneNumber,
      });
      if (!res.ok) setMsg(res.error || "회원가입에 실패했습니다.");
      else navigate("/main-page");
    } catch {
      setMsg("네트워크 오류");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: 1280,
        height: 800,
        position: "relative",
        background: "white",
        overflow: "hidden",
        fontFamily:
          'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", Arial, sans-serif',
      }}
    >
      {/* 연보라 패널 (배경) */}
      <div
        style={{
          width: 545,
          height: 680,
          left: 381,
          top: 66,
          position: "absolute",
          background: "rgba(78.13, 95.49, 208.34, 0.30)",
          borderRadius: 20,
        }}
      />

      {/* 큰 타이틀 */}
      <div
        style={{
          width: 535,
          left: 414,
          top: 125,
          position: "absolute",
          color: "black",
          fontSize: 30,
          fontWeight: 700,
          wordWrap: "break-word",
        }}
      >
        시스템 사용을 위해 정보를 입력해주세요.
      </div>

      {/* 이름 라벨 + 인풋 */}
      <Label x={420} y={176} text="이름" />
      <InputBox x={420} y={203} w={469}>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="이름을 입력해주세요"
          style={inputStyle}
        />
      </InputBox>

      {/* 전화번호 */}
      <Label x={420} y={265} text="전화번호" />
      <InputBox x={421} y={289} w={468}>
        <input
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={onChange}
          placeholder="전화번호를 입력해주세요"
          style={inputStyle}
        />
      </InputBox>

      {/* 이메일 + 인증코드 보내기 버튼 (가로 분할) */}
      <Label x={420} y={354} text="이메일" />
      <InputBox x={421} y={376} w={320}>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="이메일을 입력해주세요"
          style={inputStyle}
        />
      </InputBox>
      <ActionBtn
        x={748}
        y={376}
        w={141}
        text={emailSendLoading ? "발송 중..." : "인증 코드 보내기"}
        onClick={emailSendLoading ? undefined : handleSendEmailCode}
        bg="#7658E4"
      />

      {/* 인증 코드 + 인증 확인 버튼 */}
      <Label x={420} y={452} text="인증 코드" />
      <InputBox x={421} y={474} w={320}>
        <input
          name="emailCode"
          value={form.emailCode}
          onChange={onChange}
          placeholder="메일로 받은 코드를 입력해주세요"
          style={inputStyle}
        />
      </InputBox>
      <ActionBtn
        x={748}
        y={474}
        w={141}
        text={emailVerifyLoading ? "확인 중..." : "인증 확인"}
        onClick={emailVerifyLoading ? undefined : handleVerifyEmailCode}
        bg="#7658E4"
      />

      {/* 비밀번호 */}
      <Label x={421} y={548} text="비밀번호" />
      <InputBox x={420} y={572} w={469}>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          placeholder="••••••••"
          style={inputStyle}
        />
      </InputBox>

      {/* 메시지 영역 (인풋 아래 적당히) */}
      {msg && (
        <div
          style={{
            position: "absolute",
            left: 420,
            top: 630,
            width: 469,
            color: form.isEmailVerified ? "#1C9A36" : "#c00",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {msg}
        </div>
      )}

      {/* 가입하기 버튼 (클릭 → 폼 submit) */}
      <button
        type="button"
        onClick={() => {
          if (!loading) {
            const f = document.getElementById("register-form");
            if (f?.requestSubmit) f.requestSubmit();
            else f?.submit();
          }
        }}
        disabled={loading}
        style={{
          width: 468,
          height: 50,
          left: 420,
          top: 658,
          position: "absolute",
          background: "#096BC7",
          overflow: "hidden",
          borderRadius: 6,
          border: "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        <div
          style={{
            textAlign: "right",
            color: "white",
            fontSize: 16,
            fontWeight: 600,
            wordWrap: "break-word",
            letterSpacing: ".02em",
          }}
        >
          {loading ? "처리 중..." : "가입하기"}
        </div>
      </button>

      {/* 실제 폼 (submit용) — 화면엔 보이지 않음 */}
      <form id="register-form" onSubmit={onSubmit} style={{ display: "none" }} />
    </div>
  );
}

/* ───────────────── helper UI components ───────────────── */

function Label({ x, y, text }) {
  return (
    <div
      style={{
        left: x,
        top: y,
        position: "absolute",
        color: "rgba(0, 0, 0, 0.85)",
        fontSize: 16,
        fontWeight: 600,
        wordWrap: "break-word",
      }}
    >
      {text}
    </div>
  );
}

function InputBox({ x, y, w, children }) {
  return (
    <div
      style={{
        width: w,
        height: 50,
        left: x,
        top: y,
        position: "absolute",
        background: "white",
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  );
}

function ActionBtn({ x, y, w, text, onClick, bg = "#7658E4" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: w,
        height: 50,
        left: x,
        top: y,
        position: "absolute",
        background: bg,
        overflow: "hidden",
        borderRadius: 6,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        border: "none",
        color: "#fff",
        fontSize: 16,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
}

const inputStyle = {
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: 16,
  fontWeight: 500,
  color: "#111",
};
