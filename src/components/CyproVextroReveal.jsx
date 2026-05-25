import React, { useEffect, useRef, useState } from "react";

const CyproVextroReveal = ({ isVisible }) => {
  const [render, setRender] = useState(isVisible);
  const laserRef = useRef(null);
  const vFillRef = useRef(null);
  const textRevealRef = useRef(null);
  const flowAnimRef = useRef(null);
  const flowAnimYRef = useRef(null);
  const flowAnimX2Ref = useRef(null);
  const flowAnimY2Ref = useRef(null);

  // Smooth unmount control
  useEffect(() => {
    if (isVisible) {
      setRender(true);
    } else {
      // 500ms ka delay taake transition animation smoothly fade-out ho sake
      const timeout = setTimeout(() => setRender(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!render) return;

    if (!document.getElementById("orbitron-font")) {
      const link = document.createElement("link");
      link.id = "orbitron-font";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap";
      document.head.appendChild(link);
    }

    const laser = laserRef.current;
    const totalLength = laser ? laser.getTotalLength() : 0;
    const maxCircles = 4;
    const speedFactor = 9.8;

    let currentOffset = 0;
    let currentSegmentLength = 35;
    let isFullVLocked = false;
    let animationFrameId = null;

    if (flowAnimRef.current) {
      flowAnimRef.current.setAttribute("values", "200%; 200%");
      flowAnimYRef.current.setAttribute("values", "-100%; -100%");
    }

    const runSeamlessLaser = () => {
      if (isFullVLocked || !laser) return;

      currentOffset -= speedFactor;
      if (currentSegmentLength < 190) {
        currentSegmentLength += 0.18;
      }

      laser.style.strokeDasharray = `${currentSegmentLength} ${totalLength}`;
      laser.style.strokeDashoffset = currentOffset;

      if (Math.abs(currentOffset) < totalLength * maxCircles) {
        animationFrameId = requestAnimationFrame(runSeamlessLaser);
      } else {
        snapAndLiquidFlow();
      }
    };

    const snapAndLiquidFlow = () => {
      isFullVLocked = true;
      if (!laser) return;

      laser.style.transition =
        "stroke-dasharray 0.4s cubic-bezier(0.1, 0.8, 0.3, 1), stroke-dashoffset 0.4s cubic-bezier(0.1, 0.8, 0.3, 1)";
      laser.style.strokeDasharray = `${totalLength} ${totalLength}`;
      laser.style.strokeDashoffset = -totalLength * maxCircles;

      setTimeout(() => {
        if (!flowAnimRef.current) return;
        flowAnimRef.current.setAttribute("values", "200%; 0%");
        flowAnimYRef.current.setAttribute("values", "-100%; 100%");
        flowAnimX2Ref.current.setAttribute("values", "100%; -100%");
        flowAnimY2Ref.current.setAttribute("values", "0%; 200%");

        flowAnimRef.current.beginElement();
        flowAnimYRef.current.beginElement();
        flowAnimX2Ref.current.beginElement();
        flowAnimY2Ref.current.beginElement();
      }, 200);

      setTimeout(() => {
        if (textRevealRef.current)
          textRevealRef.current.classList.add("reveal");
      }, 850);

      setTimeout(() => {
        if (vFillRef.current) vFillRef.current.classList.add("show-fill");
      }, 2400);
    };

    animationFrameId = requestAnimationFrame(runSeamlessLaser);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [render]);

  if (!render) return null;

  return (
    <div
      style={{
        ...styles.bodyWrapper,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
        pointerEvents: isVisible ? "all" : "none",
      }}
    >
      <div style={styles.container}>
        <div style={styles.canvasContainer}>
          <svg viewBox="0 0 100 100" style={styles.svgVisible}>
            <defs>
              <linearGradient
                id="laserGradient"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00ff66" />
                <stop offset="20%" stopColor="#ff7700" />
                <stop offset="40%" stopColor="#ff0055" />
                <stop offset="60%" stopColor="#a000ff" />
                <stop offset="80%" stopColor="#00d2ff" />
                <stop offset="100%" stopColor="#00ff66" />

                <animate
                  ref={flowAnimRef}
                  attributeName="x1"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
                <animate
                  ref={flowAnimYRef}
                  attributeName="y1"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
                <animate
                  ref={flowAnimX2Ref}
                  attributeName="x2"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
                <animate
                  ref={flowAnimY2Ref}
                  attributeName="y2"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </linearGradient>

              <clipPath id="wipeClip">
                <rect id="wipe-rect" x="0" y="0" width="0" height="100" />
              </clipPath>
            </defs>

            <path
              ref={vFillRef}
              id="v-fill"
              className="solid-fill"
              d="M 10,20 H 36 V 26 H 30 L 46,74 L 62,26 H 56 V 20 H 82 V 26 H 76 L 53,82 H 39 L 16,26 H 10 Z"
              style={styles.solidFill}
            />

            <path
              ref={laserRef}
              id="laser"
              className="laser-track"
              d="M 10,20 H 36 V 26 H 30 L 46,74 L 62,26 H 56 V 20 H 82 V 26 H 76 L 53,82 H 39 L 16,26 H 10 Z"
              style={styles.laserTrack}
            />
          </svg>
        </div>

        <div
          ref={textRevealRef}
          className="brand-text"
          style={styles.brandText}
        >
          Cypro Vextro
        </div>
      </div>

      <style>{`
        .laser-track { animation: megaGlowLoop 6s linear infinite; }
        @keyframes megaGlowLoop {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(255,255,255,0.9)) drop-shadow(0 0 10px #00ff66) drop-shadow(0 0 22px #ff0055); }
          25% { filter: drop-shadow(0 0 4px rgba(255,255,255,0.9)) drop-shadow(0 0 10px #ff7700) drop-shadow(0 0 22px #a000ff); }
          50% { filter: drop-shadow(0 0 4px rgba(255,255,255,0.9)) drop-shadow(0 0 10px #00d2ff) drop-shadow(0 0 22px #ff00aa); }
          75% { filter: drop-shadow(0 0 4px rgba(255,255,255,0.9)) drop-shadow(0 0 10px #ff0055) drop-shadow(0 0 22px #00ffcc); }
        }
        .solid-fill.show-fill {
          animation: fadeInFill 0.1s linear forwards, wipeLeftToRight 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes fadeInFill { to { opacity: 1; } }
        @keyframes wipeLeftToRight { from { width: 0; } to { width: 100px; } }
        
        .brand-text.reveal {
          opacity: 1 !important;
          letter-spacing: 8px !important;
          transform: scale(1) translateY(0) !important;
          filter: blur(0px) brightness(1.3) drop-shadow(0 0 12px rgba(0, 210, 255, 0.4)) !important;
          animation: textInkShift 4s linear infinite;
        }
        @keyframes textInkShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  bodyWrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99999,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  canvasContainer: {
    position: "relative",
    width: "320px",
    height: "320px",
    marginBottom: "-15px",
  },
  svgVisible: { width: "100%", height: "100%", overflow: "visible" },
  laserTrack: {
    fill: "transparent",
    stroke: "url(#laserGradient)",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  },
  solidFill: { fill: "#ffffff", clipPath: "url(#wipeClip)", opacity: 0 },
  brandText: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "2.1rem",
    fontWeight: 900,
    textTransform: "uppercase",
    textAlign: "center",
    background:
      "linear-gradient(135deg, #00ff66, #ff7700, #ff0055, #a000ff, #00d2ff, #00ff66)",
    backgroundSize: "300% 300%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    opacity: 0,
    letterSpacing: "28px",
    transform: "scale(0.9) translateY(20px)",
    filter: "blur(15px) brightness(0)",
    transition:
      "opacity 1.6s cubic-bezier(0.25, 1, 0.5, 1), letter-spacing 1.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 1.6s cubic-bezier(0.25, 1, 0.5, 1), filter 1.4s ease-out",
  },
};

export default CyproVextroReveal;
