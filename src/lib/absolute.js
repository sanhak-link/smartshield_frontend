import React, { useState, useEffect } from "react";
import { Home, Settings, Search, Video, X } from 'lucide-react';

/**
 * SmartShield 시스템의 이벤트 영상 목록을 위한 목업 데이터입니다.
 * 사용자께서 제공해주신 실제 데이터 형식으로 업데이트되었습니다.
 */
const mockEventList = [
  {
    "id": 104,
    "event_id": "evt_20251128_002708",
    "camera_id": "live_demo_cam",
    "detected_class": "knife",
    "danger_level": "HIGH",
    "created_at": "2025-11-28T00:27:08",
    "video_url": "https://smartshield-detections-dev.s3.ap-northeast-2.amazonaws.com/20251128/live_demo_cam/clips/evt_20251128_002708_knife_high.mp4"
  },
  {
    "id": 102,
    "event_id": "evt_20251128_002639",
    "camera_id": "live_demo_cam",
    "detected_class": "knife",
    "danger_level": "HIGH",
    "created_at": "2025-11-28T00:26:39",
    "video_url": "https://smartshield-detections-dev.s3.ap-northeast-2.amazonaws.com/20251128/live_demo_cam/clips/evt_20251128_002639_knife_high.mp4"
  },
  {
    "id": 101,
    "event_id": "evt_20251128_002622",
    "camera_id": "live_demo_cam",
    "detected_class": "knife",
    "danger_level": "HIGH",
    "created_at": "2025-11-28T00:26:22",
    "video_url": "https://smartshield-detections-dev.s3.ap-northeast-2.amazonaws.com/20251128/live_demo_cam/clips/evt_20251128_002622_knife_high.mp4"
  },
  {
    "id": 105,
    "event_id": "evt_20251127_233407",
    "camera_id": "live_demo_cam",
    "detected_class": "knife",
    "danger_level": "HIGH",
    "created_at": "2025-11-27T23:34:07",
    "video_url": "https://smartshield-detections-dev.s3.ap-northeast-2.amazonaws.com/20251127/live_demo_cam/clips/evt_20251127_233407_knife_high.mp4"
  },
  {
    "id": 103,
    "event_id": "evt_20251127_232633",
    "camera_id": "live_demo_cam",
    "detected_class": "knife",
    "danger_level": "HIGH",
    "created_at": "2025-11-27T23:26:33",
    "video_url": "https://smartshield-detections-dev.s3.ap-northeast-2.amazonaws.com/20251127/live_demo_cam/clips/evt_20251127_232633_knife_high.mp4"
  },
  {
    "id": 106,
    "event_id": "evt_20251126_230539",
    "camera_id": "live_demo_cam",
    "detected_class": "guns",
    "danger_level": "HIGH",
    "created_at": "2025-11-26T23:05:39",
    "video_url": "https://smartshield-detections-dev.s3.ap-northeast-2.amazonaws.com/20251126/live_demo_cam/clips/evt_20251126_230539_guns_high.mp4"
  },
  {
    "id": 107,
    "event_id": "evt_20251123_193342",
    "camera_id": "live_demo_cam",
    "detected_class": "guns",
    "danger_level": "HIGH",
    "created_at": "2025-11-23T19:33:42",
    "video_url": "https://smartshield-detections-dev.s3.ap-northeast-2.amazonaws.com/20251123/live_demo_cam/clips/evt_20251123_193342_guns_high.mp4"
  }
];


// useNavigate는 이 환경에서 사용할 수 없으므로 목업 함수를 사용합니다.
const useNavigate = () => (path) => console.log(`[Navigation] navigate to ${path}`);

/* ---------------------- 1. 모달 ---------------------- */

/**
 * 이벤트 관련 영상을 재생하는 모달 컴포넌트입니다.
 */
function VideoModal({ eventData, isOpen, onClose }) {
  if (!isOpen || !eventData) return null;

  // Danger Level에 따른 색상 및 텍스트 설정
  const getDangerClass = (level) => {
    switch (level) {
      case 'HIGH':
        return 'bg-red-600 text-white';
      case 'MEDIUM':
        return 'bg-yellow-500 text-gray-900';
      default:
        return 'bg-green-500 text-white';
    }
  };

  // 날짜 포맷
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 md:p-8"
      >
        <div className="flex justify-between items-start border-b pb-3 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            이벤트 영상 확인
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-600 hover:text-gray-900 transition"
            title="닫기"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* 비디오 플레이어 */}
        <div className="w-full bg-gray-900 rounded-xl overflow-hidden shadow-lg mb-4 aspect-video">
          {/* 실제 비디오 URL을 <video> 태그에 사용합니다. (브라우저 환경에 따라 재생이 제한될 수 있습니다.) */}
          <video
            key={eventData.video_url} // key를 사용하여 URL이 변경될 때마다 컴포넌트를 리셋
            controls
            autoPlay
            className="w-full h-full object-cover"
          >
            <source src={eventData.video_url} type="video/mp4" />
            <p className="text-white p-4">비디오를 재생할 수 없습니다. (URL 오류 또는 형식 문제)</p>
          </video>
        </div>
        
        {/* 이벤트 상세 정보 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <p>
            <span className="font-semibold text-gray-600">이벤트 ID:</span> {eventData.event_id}
          </p>
          <p>
            <span className="font-semibold text-gray-600">카메라 ID:</span> {eventData.camera_id}
          </p>
          <p>
            <span className="font-semibold text-gray-600">감지 객체:</span> <span className="font-bold text-blue-600">{eventData.detected_class.toUpperCase()}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-600">발생 시각:</span> {formatTime(eventData.created_at)}
          </p>
          <p className="sm:col-span-2">
            <span className="font-semibold text-gray-600">위험도:</span> 
            <span className={`inline-block ml-2 px-3 py-1 text-xs font-bold rounded-full ${getDangerClass(eventData.danger_level)}`}>
              {eventData.danger_level}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- 2. 영상 목록 아이템 ---------------------- */

/**
 * 단일 이벤트 항목을 표시하는 컴포넌트입니다.
 */
function VideoItem({ event, onVideoClick }) {
    // Danger Level에 따른 색상 설정
    const getDangerColor = (level) => {
        switch (level) {
            case 'HIGH': return 'border-red-500 bg-red-50 hover:bg-red-100';
            case 'MEDIUM': return 'border-yellow-500 bg-yellow-50 hover:bg-yellow-100';
            default: return 'border-green-500 bg-green-50 hover:bg-green-100';
        }
    };

    // 시간 포맷 (날짜와 시간)
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('ko-KR', {
            year: '2-digit', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', hour12: false
        });
    };

    return (
        <div 
            className={`flex items-center p-3 sm:p-4 rounded-xl shadow-md cursor-pointer transition duration-200 border-l-8 ${getDangerColor(event.danger_level)}`}
            onClick={() => onVideoClick(event)}
        >
            {/* 썸네일 (아이콘으로 대체) */}
            <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-300 rounded-lg mr-4 sm:mr-6 text-gray-700">
                <Video className="w-8 h-8" />
            </div>

            {/* 상세 정보 */}
            <div className="flex-grow min-w-0">
                <p className="text-base sm:text-lg font-bold truncate text-gray-900">
                    {event.event_id}
                </p>
                <div className="text-xs sm:text-sm text-gray-600 space-x-2">
                    <span className="font-medium">{formatTime(event.created_at)}</span>
                    <span className="text-blue-600 font-semibold">{event.detected_class.toUpperCase()}</span>
                    <span>({event.camera_id})</span>
                </div>
            </div>

            {/* 영상 확인 버튼 */}
            <button
                className="flex-shrink-0 ml-4 px-3 py-2 text-xs sm:text-sm font-semibold bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-150"
                onClick={(e) => {
                    e.stopPropagation(); // 부모의 onClick 방지
                    onVideoClick(event);
                }}
            >
                영상 확인
            </button>
        </div>
    );
}

/* ---------------------- 3. 메인 ---------------------- */

/**
 * 전체 이벤트 영상 목록을 보여주는 메인 컴포넌트입니다.
 */
export default function VideoInfo() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 통합된 mockEventList 직접 사용
  const videoData = mockEventList;

  const handleVideoClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // 검색 필터링 로직
  const filteredVideos = videoData.filter(event =>
    event.event_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.detected_class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.camera_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-100 font-sans">
      {/* 최대 너비 컨테이너 (중앙 정렬) */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* 상단 헤더 영역 */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          
          {/* 로고 */}
          <div
            onClick={() => navigate("/main-page")}
            className="text-3xl sm:text-4xl font-extralight text-gray-800 cursor-pointer hover:text-blue-600 transition duration-150"
          >
            SMARTSHIELD
          </div>

          {/* 우측 아이콘 */}
          <div className="flex items-center space-x-3">
            <div
              className="p-2 sm:p-3 rounded-full bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200 transition"
              title="설정/가이드"
              onClick={() => console.log("Navigate to Settings (Simulated)")}
            >
              <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div
              className="p-2 sm:p-3 rounded-full bg-red-100 text-red-600 cursor-pointer hover:bg-red-200 transition"
              title="홈으로"
              onClick={() => navigate("/main-page")}
            >
              <Home className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>
        
        {/* 주요 내용 컨테이너 */}
        <div className="p-4 sm:p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-2">
                이벤트 영상 기록 목록
            </h1>

            {/* 검색창 */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="이벤트 ID, 카메라 ID, 감지 객체로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* 영상 목록 */}
            <div 
                className="space-y-4 max-h-[500px] overflow-y-auto p-2 -m-2 rounded-xl"
                style={{ scrollbarWidth: 'thin' }}
            >
                {filteredVideos.length > 0 ? (
                    filteredVideos.map((event) => (
                        <VideoItem
                            key={event.id}
                            event={event}
                            onVideoClick={handleVideoClick}
                        />
                    ))
                ) : (
                    <div className="text-center py-10 text-xl text-gray-500">
                        "{searchTerm}"에 해당하는 이벤트 기록이 없습니다.
                    </div>
                )}
            </div>
        </div>
        
      </div>

      {/* 모달 */}
      <VideoModal
        eventData={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}