import React, { useEffect, useRef, useState } from "react";

export const BearWithArms = ({
  size = 60,
  expression = "neutral", // neutral, happy, sad, surprised
}) => {
  const svgRef = useRef(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const svg = svgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 10);
      const angle = Math.atan2(dy, dx);

      setPupilOffset({
        x: Math.cos(angle) * dist * 0.2,
        y: Math.sin(angle) * dist * 0.2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const isHappy = expression === "happy";
  const isSad = expression === "sad";
  const isSurprised = expression === "surprised";

  return (
    <svg
      ref={svgRef}
      width={size}
      height={(size * 1.5).toFixed(0)}
      viewBox="0 0 100 140"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* Kulaklar */}
      <circle cx="30" cy="30" r="15" fill="#8D6E63" />
      <circle cx="70" cy="30" r="15" fill="#8D6E63" />

      {/* Kafa */}
      <circle cx="50" cy="50" r="35" fill="#A1887F" />

      {/* Gözler (beyaz) */}
      <circle cx="38" cy="45" r={isSurprised ? 8 : 5} fill="#fff" />
      <circle cx="62" cy="45" r={isSurprised ? 8 : 5} fill="#fff" />

      {/* Gözbebekleri */}
      <circle
        cx={38 + pupilOffset.x}
        cy={45 + pupilOffset.y}
        r={isSurprised ? 4 : 2}
        fill="#000"
      />
      <circle
        cx={62 + pupilOffset.x}
        cy={45 + pupilOffset.y}
        r={isSurprised ? 4 : 2}
        fill="#000"
      />

      {/* Ağız */}
      {isHappy && (
        <path
          d="M38 65 Q50 75 62 65"
          stroke="#000"
          strokeWidth="2"
          fill="none"
        />
      )}
      {isSad && (
        <>
          <path
            d="M38 75 Q50 65 62 75"
            stroke="#000"
            strokeWidth="2"
            fill="none"
          />
          {/* Gözyaşı */}
          <circle cx="38" cy="55" r="2" fill="#2196f3" />
          <circle cx="62" cy="55" r="2" fill="#2196f3" />
        </>
      )}
      {isSurprised && (
        <>
          {/* Ağız açık */}
          <ellipse
            cx="50"
            cy="70"
            rx="10"
            ry="8"
            fill="#000"
            stroke="#000"
            strokeWidth="1"
          />
          {/* Eller ağızda */}
          <ellipse cx="25" cy="90" rx="12" ry="20" fill="#A1887F" />
          <ellipse cx="75" cy="90" rx="12" ry="20" fill="#A1887F" />
        </>
      )}
      {!isHappy && !isSad && !isSurprised && (
        <line x1="42" y1="68" x2="58" y2="68" stroke="#000" strokeWidth="2" />
      )}

      {/* Kollar (normal durumda) */}
      {!isSurprised && (
        <>
          <ellipse cx="20" cy="105" rx="10" ry="25" fill="#A1887F" />
          <ellipse cx="80" cy="105" rx="10" ry="25" fill="#A1887F" />
        </>
      )}
    </svg>
  );
};
