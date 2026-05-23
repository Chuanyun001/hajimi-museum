import { useState, useEffect, useRef } from 'react';

interface PixelCatProps {
  className?: string;
}

export default function PixelCat({ className = '' }: PixelCatProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isLagging, setIsLagging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [eyeColor, setEyeColor] = useState('#569cd6');
  const lagTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (isLagging) return;
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 2500);

    return () => clearInterval(blinkInterval);
  }, [isLagging]);

  useEffect(() => {
    const lagInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setIsLagging(true);
        setEyeColor('#f44747');
        lagTimerRef.current = setTimeout(() => {
          setIsLagging(false);
          setEyeColor('#569cd6');
        }, 1200 + Math.random() * 800);
      }
    }, 6000);

    return () => {
      clearInterval(lagInterval);
      if (lagTimerRef.current) clearTimeout(lagTimerRef.current);
    };
  }, []);

  const renderEyes = () => {
    if (isHovered) {
      return (
        <>
          <line x1="12" y1="8" x2="14" y2="10" stroke="#f44747" strokeWidth="1" />
          <line x1="14" y1="8" x2="12" y2="10" stroke="#f44747" strokeWidth="1" />
          <line x1="18" y1="8" x2="20" y2="10" stroke="#f44747" strokeWidth="1" />
          <line x1="20" y1="8" x2="18" y2="10" stroke="#f44747" strokeWidth="1" />
        </>
      );
    }

    if (isBlinking) {
      return (
        <>
          <rect x="12" y="9" width="2" height="1" fill={eyeColor} className="cat-eye" />
          <rect x="18" y="9" width="2" height="1" fill={eyeColor} className="cat-eye" />
        </>
      );
    }

    return (
      <>
        <rect
          x="12" y="8" width="2" height="2"
          fill={eyeColor}
          className="cat-eye cat-eye-open"
        />
        <rect
          x="18" y="8" width="2" height="2"
          fill={eyeColor}
          className="cat-eye cat-eye-open"
        />
        {isLagging && (
          <>
            <rect x="12" y="8" width="2" height="2" fill="#f44747" opacity="0.3" className="cat-eye-glitch" />
            <rect x="18" y="8" width="2" height="2" fill="#f44747" opacity="0.3" className="cat-eye-glitch" />
          </>
        )}
      </>
    );
  };

  const renderTail = () => (
    <g className={isLagging ? '' : 'cat-tail-wag'}>
      <rect x="24" y="14" width="4" height="2" fill="#d4d4d4" />
      <rect x="26" y="12" width="2" height="2" fill="#d4d4d4" />
    </g>
  );

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        viewBox="0 0 32 32"
        className={`w-full h-full ${isLagging ? 'cat-lag-freeze' : 'animate-breath'}`}
        style={{ imageRendering: 'pixelated' }}
      >
        <rect x="8" y="12" width="16" height="12" fill="#d4d4d4" className="cat-body" />
        <rect x="10" y="6" width="12" height="8" fill="#d4d4d4" />
        <rect x="10" y="4" width="4" height="4" fill="#d4d4d4" />
        <rect x="18" y="4" width="4" height="4" fill="#d4d4d4" />
        {renderEyes()}
        <rect x="15" y="10" width="2" height="1" fill="#ce9178" />
        <rect x="14" y="11" width="4" height="1" fill="#1e1e1e" />
        <rect x="10" y="22" width="4" height="2" fill="#d4d4d4" className="cat-paw-left" />
        <rect x="18" y="22" width="4" height="2" fill="#d4d4d4" className="cat-paw-right" />
        {renderTail()}
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1e1e1e]/20 animate-pulse pointer-events-none" />

      {isLagging && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[#f44747] whitespace-nowrap cat-lag-text">
          {'>'} ERROR: cat.exe 未响应
        </div>
      )}

      {isHovered && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[#ce9178] whitespace-nowrap">
          {'>'} 大脑宕机中...
        </div>
      )}

      <div className="cat-shadow" />
    </div>
  );
}
