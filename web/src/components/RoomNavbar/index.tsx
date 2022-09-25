import React from "react";
import { Player } from "@/types/player";
import UserIcon from "./UserIcon";
import AnimatedLogo from "./AnimatedLogo";
import Button from "../Button";
import { StorageItem } from "@/types/storage";
import ThemeToggle from "./ThemeToggle";

interface RoomNavbarProps {
  player?: Player;
  setIsUserModalOpen: (isUserModalOpen: boolean) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const RoomNavbar: React.FC<RoomNavbarProps> = ({
  player,
  setIsUserModalOpen,
  theme,
  setTheme,
}) => {
  return (
    <div className="top-0 z-20 pb-2 md:px-0">
      <div className="flex">
        <div className="flex pt-3">
          <a href="https://www.danielcoles.dev">
            <AnimatedLogo theme={theme} />
          </a>
          <span className="px-2">|</span>
          <div className="font-bold pb-2">STORY ESTIMATOR</div>
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

