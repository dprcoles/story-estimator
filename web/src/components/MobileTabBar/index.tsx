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

const MobileTabBar: React.FC<MobileTabBarProps> = ({
  activeTab,
  setActiveTab,
}) => {
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
    <div className="fixed mx-auto justify-between bottom-0 z-20 w-full min-w-full border-t border-light-border-color dark:border-dark-border-color">
      <div className="m-0 flex p-2 py-4 bg-light-hover dark:bg-dark-hover">
        {tabs.map(t => (
          <button
            className={`text-center w-full ${
              t.enum === activeTab
                ? "text-light-main dark:text-dark-main"
                : "text-light-text dark:text-dark-text"
            }`}
            onClick={() => setActiveTab(t.enum)}
            key={t.enum}
          >
            <div className="text-2xl pb-1 flex justify-center items-center">
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

