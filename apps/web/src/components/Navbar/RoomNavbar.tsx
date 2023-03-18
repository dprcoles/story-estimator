import React from "react";
import { Player } from "@/types/player";
import UserIcon from "./UserIcon";
import AnimatedLogo from "./AnimatedLogo";
import ThemeToggle from "./ThemeToggle";
import { usePlayerStore } from "@/stores/playerStore";

interface RoomNavbarProps {
  setIsUserModalOpen: (isUserModalOpen: boolean) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const RoomNavbar: React.FC<RoomNavbarProps> = ({
  setIsUserModalOpen,
  theme,
  setTheme,
}) => {
  const { player } = usePlayerStore((state) => state);

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
          <UserIcon
            player={player}
            onEdit={() => setIsUserModalOpen(true)}
            theme={theme}
            setTheme={setTheme}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomNavbar;
