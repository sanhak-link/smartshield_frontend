// src/TutorialPopup.jsx
import React, { useState } from 'react';

// 튜토리얼 단계 데이터 정의 (이 부분은 수정 없어요 ~~ )
const steps = [
    // ... (steps 배열 내용 유지) ...
    {
        title: "SMARTSHIELD에 오신 것을 환영합니다!",
        content: "지금부터 안전 관제 시스템 사용법을 간단히 알려드릴게요.",
        type: 'default', // 일반 텍스트 타입
        image: "image_file/popup_bird.png" // 예시 이미지 
    },
    {
        title: "도움 요청 상태 확인",
        content: "도움 요청은 버튼 색상과 캐릭터의 색상으로 알 수 있어요.AI가 위험 요소를 점수화하여 임계치를 넘으면 도움 요청을 보냅니다.",
        type: 'status_check', // 특별 레이아웃 타입
    },
    {
        title: "주요 3가지 기능",
        content: "도움 요청 버튼의 오른쪽 편에는 3가지 기능이 있어요. 버튼을 눌러 원하는 기능을 실행해보세요.",
        type: 'feature_list', // 특별 레이아웃 타입
    },
    {
        title: "튜토리얼 완료!",
        content: "이제 SMARTSHIELD를 사용해 보세요. 궁금한 점은 상단의 가이드 아이콘을 다시 눌러주세요.",
        type: 'default',
        image: "image_file/popup_bird_2.png"
    },
];


// --- 컴포넌트 시작 ---
export default function TutorialPopup({ onClose }) {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose(); // 마지막 단계면 닫기
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    // 팝업창 중앙의 핵심 내용만 렌더링하는 함수
    const renderContent = () => {
        const step = steps[currentStep];

        switch (step.type) {
            case 'status_check':
                return (
                    <div style={contentLayout}>
                        <h2 style={titleStyle}>{step.title}</h2>
                        <p style={descriptionStyle}>{step.content}</p>
                        
                        <div style={statusGridStyle}>
                            {/* 좌측: 정상 상태 */}
                            <div style={{...statusBoxStyle, background: '#CED5E8'}}>
                                <div style={statusTextStyle}>도움 요청이 <br/> 존재하지 않습니다</div>
                                <img src="image_file/normal_bird.png" alt="Normal Bird" style={birdImageStyle} />
                            </div>
                            {/* 우측: 알림 상태 */}
                            <div style={{...statusBoxStyle, background: '#D46464'}}>
                                <div style={{...statusTextStyle, color: 'white'}}>도움 요청을 <br/> 확인해주세요</div>
                                <img src="image_file/emergency_bird.png" alt="Emergency Bird" style={birdImageStyle} />
                            </div>
                        </div>
                    </div>
                );
            case 'feature_list':
                const features = [
                    { title: "위험 탐지 내역", desc: "알림 내역을 확인할 수 있습니다." },
                    { title: "영상 내역", desc: "현장의 전체 영상 및 위험 상황 영상을 확인할 수 있습니다." },
                    { title: "경위서 작성", desc: "AI가 영상을 확인하고 요약하여 상황에 맞는 경위서를 작성해줍니다." }
                ];
                return (
                    <div style={contentLayout}>
                        <h2 style={titleStyle}>{step.title}</h2>
                        <p style={descriptionStyle}>{step.content}</p>
                        
                        <div style={featureListStyle}>
                            {features.map((feature, index) => (
                                <div key={index} style={featureItemStyle}>
                                    <h3 style={featureTitleStyle}>{feature.title}</h3>
                                    <p style={featureDescStyle}>{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'default':
            default:
                return (
                    <div style={{...contentLayout, justifyContent: 'flex-start'}}>
                        <h2 style={{...titleStyle, marginTop: 40}}>{step.title}</h2>
                        <p 
                            style={descriptionStyle}
                            dangerouslySetInnerHTML={{ __html: step.content }} 
                        />
                        {step.image && (
                            <img src={step.image} alt="step" style={{ height: 430, marginTop: 20 }} />
                        )}
                    </div>
                );
        }
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                {/* 닫기 버튼 (우측 상단 X) */}
                <button onClick={onClose} style={closeButtonStyle}>×</button>

                {/* 듀오링고 스타일 진행 바 */}
                <div style={progressContainerStyle}>
                    <div style={{ 
                        ...progressBarStyle, 
                        width: `${((currentStep + 1) / steps.length) * 100}%` 
                    }} />
                </div>

                {/* 컨텐츠 영역 */}
                <div style={{ minHeight: 400, width: '100%' }}>
                    {renderContent()}
                </div>

                {/* 하단 버튼 영역 */}
                <div style={footerStyle}>
                    {/* 이전 버튼 */}
                    <button 
                        onClick={handlePrev} 
                        style={{ ...buttonStyle, visibility: currentStep === 0 ? 'hidden' : 'visible', background: '#e5e5e5', color: '#333' }}
                    >
                        이전
                    </button>
                    
                    {/* 다음/완료 버튼 */}
                    <button 
                        onClick={handleNext} 
                        style={{ ...buttonStyle, background: '#0D6DFB', color: 'white', borderBottom: '4px solid #0D6DFB' }}
                    >
                        {currentStep === steps.length - 1 ? "완료" : "다음"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- 공통 스타일 ---

export const overlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 9999 
};


export const modalStyle = {
    width: 700, // 너비 확장
    padding: 30, backgroundColor: 'white',
    borderRadius: 20, position: 'relative',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    display: 'flex', flexDirection: 'column', gap: 20,
    alignItems: 'center'
};


export const closeButtonStyle = {
    position: 'absolute', top: 22, right: 20,
    background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#999'
};


export const progressContainerStyle = {
    width: '90%', height: 10, backgroundColor: '#e5e5e5',
    borderRadius: 5, overflow: 'hidden'
};


export const progressBarStyle = {
    height: '100%', backgroundColor: '#0D6DFB', transition: 'width 0.3s ease'
};

export const footerStyle = {
    width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 10
};

export const buttonStyle = {
    padding: '10px 24px', borderRadius: 12, border: 'none',
    fontSize: 16, fontWeight: 'bold', cursor: 'pointer',
    transition: 'transform 0.1s'
};

// --- 동적 컨텐츠 공통 스타일 ---
export const contentLayout = {
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};


export const titleStyle = { 
    fontSize: 28, 
    fontWeight: 700, 
    marginBottom: 15,
    color: '#333'
};


export const descriptionStyle = { 
    fontSize: 20, 
    color: '#555', 
    lineHeight: '1.5',
    marginBottom: 30
};

export const statusGridStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
    width: '100%'
};

export const statusBoxStyle = {
    width: 250, 
    height: 300, 
    borderRadius: 10, 
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};

export const statusTextStyle = {
    fontSize: 20,
    fontWeight: 500,
    color: 'black',
    textAlign: 'center',
    zIndex: 10,
    lineHeight: '1.4'
};

export const birdImageStyle = {
    position: 'absolute',
    bottom: -30, // 살짝 걸치게
    right: -30,
    width: 150, // 크기 조정
    height: 'auto'
};


// --- Step 3 (popup_2.png) 전용 스타일 ---

export const featureListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    width: '80%', // 너비 조정
    margin: '0 auto'
};


export const featureItemStyle = {
    padding: '15px 20px',
    background: '#E5E5E5',
    borderRadius: 8,
    textAlign: 'left'
};


export const featureTitleStyle = {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 5
};


export const featureDescStyle = {
    fontSize: 14,
    color: '#666'
};