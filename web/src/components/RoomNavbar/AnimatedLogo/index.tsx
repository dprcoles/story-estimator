import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ICON_FADE } from "@/utils/variants";

interface AnimatedLogoProps {
  theme: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ theme }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const rgbColour = theme === "dark" ? "255, 255, 255" : "18, 18, 18";

  return (
    <div>
      {mounted && (
        <svg
          width="50"
          height="24"
          viewBox="0 0 400 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M221 0.5H220.5V1V61V61.5V140.5V141V201V201.5H221H281H281.5H421H421.5V201V141V140.5H421H281.5V61.5H421H421.5V61V1V0.5H421H281.5H281H221Z"
            strokeWidth="5"
            stroke={`rgba(${rgbColour}, 1)`}
            strokeLinecap="square"
            variants={ICON_FADE(rgbColour)}
            initial="initial"
            animate="animate"
            key="D"
          />
          <motion.path
            d="M1 70.5H0.5V71V131V131.5H1H61H61.5V131V71V70.5H61H1ZM140.5 0.5H1H0.5V1V61V61.5H1H140.5V140.5H1H0.5V141V201V201.5H1H140.5H141H201H201.5V201V141V140.5V61.5V61V1V0.5H201H141H140.5Z"
            strokeWidth="5"
            stroke={`rgba(${rgbColour}, 1)`}
            strokeLinecap="square"
            variants={ICON_FADE(rgbColour)}
            initial="initial"
            animate="animate"
            key="C"
          />
        </svg>
      )}
    </div>
  );
};

export default AnimatedLogo;

