import React, { useState } from "react";

import { useInterval } from "@/hooks/index";

interface TimeSpentDisplayProps {
  startTime: number;
  totalTimeSpent: number;
}

const TimeSpentDisplay = ({
  startTime,
  totalTimeSpent,
}: TimeSpentDisplayProps) => {
  const [timeSpent, setTimeSpent] = useState<string>("");

  useInterval(() => {
    const currentTimeSeconds = new Date().getTime() / 1000;
    const seconds = Math.floor(currentTimeSeconds - startTime);

    setTimeSpent(
      new Date(seconds * 1000 + totalTimeSpent).toISOString().substr(14, 5),
    );
  }, 1000);

  return (
    <div className="text-light-text dark:text-dark-text items-center py-2 align-middle">
      Time Spent:
      <div className="text-2xl font-bold text-black dark:text-white">
        {timeSpent}
      </div>
    </div>
  );
};

export default TimeSpentDisplay;
