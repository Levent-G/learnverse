import React, { useEffect, useRef, useState } from "react";

export const TalkingBear = ({ isSpeaking, size = 60 }) => {
  const svgRef = useRef(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleMouseMove = (e) => {
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

      {/* Gözler */}
      <circle cx="38" cy="45" r={5} fill="#fff" />
      <circle cx="62" cy="45" r={5} fill="#fff" />
      <circle
        cx={38 + pupilOffset.x}
        cy={45 + pupilOffset.y}
        r={2}
        fill="#000"
      />
      <circle
        cx={62 + pupilOffset.x}
        cy={45 + pupilOffset.y}
        r={2}
        fill="#000"
      />

      {/* Ağız */}
      {isSpeaking ? (
        <g>
          <ellipse
            cx="50"
            cy="70"
            rx="6"
            ry="10"
            fill="#000"
            style={{
              transformOrigin: "center",
              animation: "talkAnim 0.25s infinite ease-in-out alternate",
            }}
          />
        </g>
      ) : (
        <line x1="42" y1="68" x2="58" y2="68" stroke="#000" strokeWidth="2" />
      )}

      {/* Kollar */}
      <ellipse cx="20" cy="105" rx="10" ry="25" fill="#A1887F" />
      <ellipse cx="80" cy="105" rx="10" ry="25" fill="#A1887F" />

      <style>{`
        @keyframes talkAnim {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(0.3); }
        }
      `}</style>
    </svg>
  );
};
