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
    <div className="border-light-border-color dark:border-dark-border-color fixed bottom-0 z-20 mx-auto w-full min-w-full justify-between border-t">
      <div className="bg-light-hover dark:bg-dark-hover m-0 flex p-2 py-4">
        {tabs.map((t) => (
          <button
            className={`w-full text-center ${
              t.enum === activeTab
                ? "text-light-main dark:text-dark-main"
                : "text-light-text dark:text-dark-text"
            }`}
            onClick={() => setActiveTab(t.enum)}
            key={t.enum}
          >
            <div className="flex items-center justify-center pb-1 text-2xl">
              {t.icon}
            </div>
            <div className="text-xs font-medium">{t.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileTabBar;
