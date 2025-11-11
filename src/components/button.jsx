import React, { forwardRef } from "react";

/*
   # 버튼 컴포넌트
  - 레이아웃(부모 그리드/컨테이너)에는 영향 주지 않도록 width/position을 강제하지 않음
  - 상태/크기/아이콘/로딩/비활성/링크 모두 지원
 
  사용 예)
   <Button variant="primary" size="md" onClick={...}>로그인</Button>
   <Button variant="danger" loading>삭제 중...</Button>
   <Button as="a" href="/register" variant="ghost">회원가입</Button>
   // import { Link } from "react-router-dom";
   // <Button as={Link} to="/home">홈으로</Button>
 */
const Button = forwardRef(
  (
    {
      as: Comp = "button",
      variant = "primary",       // "primary" | "danger" | "ghost"
      size = "md",               // "sm" | "md" | "lg"
      fullWidth = false,
      iconLeft = null,
      iconRight = null,
      loading = false,
      disabled = false,
      type,                      // 기본값은 실제 엘리먼트 타입에 따라 하단에서 설정
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    const isButtonEl = Comp === "button";
    const computedType = isButtonEl ? (type || "button") : undefined;
    const isDisabled = disabled || loading;

    const classes = [
      "btn",
      `btn--${variant}`,
      `btn--${size}`,
      fullWidth ? "btn--block" : "",
      isDisabled ? "btn--disabled" : "",
      loading ? "btn--loading" : "",
      className
    ]
      .filter(Boolean)
      .join(" ");

    // 접근성: a/Link로 렌더링 시 키보드/리더 호환
    const a11yProps =
      isButtonEl
        ? { type: computedType, disabled: isDisabled, "aria-busy": loading || undefined }
        : {
            role: "button",
            "aria-disabled": isDisabled || undefined,
            "aria-busy": loading || undefined,
            tabIndex: isDisabled ? -1 : 0
          };

    // 로딩 스피너 (텍스트 왼쪽)
    const Spinner = () => (
      <svg
        className="btn__spinner"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25" />
        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" fill="none">
          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite" />
        </path>
      </svg>
    );

    return (
      <Comp
        ref={ref}
        className={classes}
        {...a11yProps}
        {...rest}
        onClick={(e) => {
          if (isDisabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          if (typeof rest.onClick === "function") rest.onClick(e);
        }}
      >
        {/* 아이콘/스피너 + 텍스트 + 아이콘 */}
        {loading && <Spinner />}
        {iconLeft && !loading ? <span className="btn__icon btn__icon--left">{iconLeft}</span> : null}
        <span className="btn__label">{children}</span>
        {iconRight ? <span className="btn__icon btn__icon--right">{iconRight}</span> : null}
      </Comp>
    );
  }
);

export default Button;
