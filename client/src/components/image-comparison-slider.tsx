import { useState, useRef, useCallback } from "react";

interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeDate?: string;
  afterDate?: string;
}

export function ImageComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  beforeDate,
  afterDate,
}: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video cursor-ew-resize select-none overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      
      <img
        src={beforeImage}
        alt={beforeLabel}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        draggable={false}
      />

      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-600"
          >
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 15 12 9 6" transform="translate(6, 0)" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 text-xs uppercase tracking-widest pointer-events-none">
        <span className="font-medium">{beforeLabel}</span>
        {beforeDate && <span className="ml-2 opacity-70">{beforeDate}</span>}
      </div>
      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 text-xs uppercase tracking-widest pointer-events-none">
        <span className="font-medium">{afterLabel}</span>
        {afterDate && <span className="ml-2 opacity-70">{afterDate}</span>}
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-4 py-2 text-xs uppercase tracking-widest pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
        Drag to Compare
      </div>
    </div>
  );
}
