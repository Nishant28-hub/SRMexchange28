import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function MacCursorFollower() {
  const [visible, setVisible] = useState(false);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const mouseX = useSpring(-200, springConfig);
  const mouseY = useSpring(-200, springConfig);

  useEffect(() => {
    // Only enable on pointer devices (desktop/laptop)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {/* macOS Ambient Spotlight Glow */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="h-96 w-96 rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/08 to-transparent blur-3xl"
      />
    </div>
  );
}
