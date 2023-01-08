import React from "react";
import AnimatedLogo from "./AnimatedLogo";
import ThemeToggle from "./ThemeToggle";

interface DefaultNavbarProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const DefaultNavbar: React.FC<DefaultNavbarProps> = ({ theme, setTheme }) => {
  return (
    <div className="top-0 z-20 pb-2 md:px-0">
      <div className="flex">
        <div className="flex pt-3">
          <a
            href="https://www.danielcoles.dev"
            target="_blank"
            rel="noreferrer"
          >
            <AnimatedLogo theme={theme} />
          </a>
          <div className="hidden md:flex">
            <span className="px-2">|</span>
            <div className="font-bold pb-2">STORY ESTIMATOR</div>
          </div>
        </div>
        <div className="ml-auto flex space-x-4">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </div>
  );
};

export default DefaultNavbar;

