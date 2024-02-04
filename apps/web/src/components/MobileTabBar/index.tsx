import React from "react";
import { FaUsers } from "react-icons/fa";
import { GiCardRandom } from "react-icons/gi";
import { HiOutlineBookOpen } from "react-icons/hi";

export enum MobileTabBarType {
  Estimate = "estimate",
  Stories = "stories",
  Players = "players",
}

interface MobileTabBarProps {
  activeTab: MobileTabBarType;
  setActiveTab: (activeTab: MobileTabBarType) => void;
}

const MobileTabBar = ({ activeTab, setActiveTab }: MobileTabBarProps) => {
  const tabs = [
    {
      title: "Estimate",
      icon: <GiCardRandom />,
      enum: MobileTabBarType.Estimate,
    },
    {
      title: "Stories",
      icon: <HiOutlineBookOpen />,
      enum: MobileTabBarType.Stories,
    },
    {
      title: "Players",
      icon: <FaUsers />,
      enum: MobileTabBarType.Players,
    },
  ];

  return (
    <div className="fixed bottom-0 z-20 mx-auto w-full min-w-full justify-between border-t border-blue-400 dark:border-pink-500">
      <div className="m-0 flex bg-neutral-200 p-2 py-4 dark:bg-zinc-800">
        {tabs.map((t) => (
          <button
            className={`w-full text-center ${
              t.enum === activeTab
                ? "text-blue-400 dark:text-pink-500"
                : "text-black dark:text-white"
            }`}
            onClick={() => setActiveTab(t.enum)}
            key={t.enum}
          >
            <div className="flex items-center justify-center pb-1 text-2xl">{t.icon}</div>
            <div className="text-xs font-medium">{t.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileTabBar;
