import React, { useEffect, useState } from 'react';
import { getVideoUrl } from '../lib/api'; 

/**
 * S3에 저장된 영상을 불러와 재생하는 컴포넌트입니다.
 * Pre-signed URL을 요청하고 로딩/에러 상태를 관리합니다.
 * * @param {object} props 
 * @param {string} props.filename S3에 저장된 영상의 전체 경로 (S3 Key)
 */
export default function VideoPlayer({ filename }) {
  // S3 임시 URL을 저장할 상태
  const [videoSrc, setVideoSrc] = useState("");
  // 로딩 상태 관리
  const [loading, setLoading] = useState(true);
  // 에러 메시지 저장
  const [error, setError] = useState(null);

  useEffect(() => {
    // filename이 없으면 요청하지 않습니다.
    if (!filename) {
        setError("영상 파일 이름(filename)이 제공되지 않았습니다.");
        setLoading(false);
        return;
    }

    const fetchVideo = async () => {
      setLoading(true);
      setError(null);
      setVideoSrc("");

      try {
        // 1. API를 호출하여 S3 Pre-signed URL을 받아옵니다.
        const res = await getVideoUrl(filename); 

        if (res.ok) {
          setVideoSrc(res.url); // S3 임시 URL 저장
        } else {
          // API 호출 실패 시 에러 메시지 저장
          setError(res.error || "영상 주소 요청에 실패했습니다.");
        }
      } catch (e) {
        // 네트워크 오류 등 예외 발생 시 처리
        console.error("Video fetch error:", e);
        setError("네트워크 오류가 발생했습니다.");
      }
      setLoading(false);
    };

    fetchVideo();
  }, [filename]); // filename prop이 바뀔 때마다 다시 URL을 요청합니다.

  // ──────────────── UI 렌더링 ────────────────

  if (loading) {
    return (
        <div style={{ 
            width: '100%', height: '100%', display: 'flex', 
            justifyContent: 'center', alignItems: 'center', 
            backgroundColor: '#f0f0f0', borderRadius: '8px' 
        }}>
            영상을 불러오는 중입니다...
        </div>
    );
  }

  if (error) {
    return (
        <div style={{ 
            width: '100%', height: '100%', display: 'flex', 
            flexDirection: 'column', justifyContent: 'center', 
            alignItems: 'center', backgroundColor: '#fee', color: '#c00', 
            borderRadius: '8px', padding: 15 
        }}>
            영상 로드 오류: 
            <span style={{ fontSize: '0.8em', marginTop: '5px' }}>
                {error}
            </span>
        </div>
    );
  }

  // 성공적으로 URL을 받아왔을 때
  return (
    <video 
      controls 
      autoPlay 
      muted // 뮤트 필요하면 사용
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
      src={videoSrc} // 여기에 S3 임시 URL이 적용됩니다.
    >
      브라우저가 비디오 태그를 지원하지 않습니다.
    </video>
  );
}