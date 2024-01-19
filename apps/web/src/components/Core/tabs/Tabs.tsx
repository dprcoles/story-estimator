import classNames from "classnames";
import React from "react";

type Tab = {
  id: string;
  label: string;
};

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  fullWidth?: boolean;
}

const Tabs = ({ tabs, activeTab, setActiveTab, fullWidth }: TabsProps) => {
  return (
    <>
      {tabs.map((x) => (
        <button
          key={x.id}
          className={classNames(
            "rounded-md p-3 text-sm",
            x.id === activeTab && "bg-light-hover dark:bg-dark-hover",
            x.id !== activeTab && "bg-transparent",
            fullWidth && "w-full",
          )}
          onClick={() => setActiveTab(x.id)}
        >
          {x.label}
        </button>
      ))}
    </>
  );
};

export default Tabs;
