import React, { useState } from "react";

import { useInterval } from "@/hooks/index";

interface TimeSpentDisplayProps {
  startTime: number;
  totalTimeSpent: number;
}

const TimeSpentDisplay: React.FC<TimeSpentDisplayProps> = ({
  startTime,
  totalTimeSpent,
}) => {
  const [timeSpent, setTimeSpent] = useState<string>("");

  useInterval(() => {
    const currentTimeSeconds = new Date().getTime() / 1000;
    const seconds = Math.floor(currentTimeSeconds - startTime);

    setTimeSpent(
      new Date(seconds * 1000 + totalTimeSpent).toISOString().substr(14, 5),
    );
  }, 1000);

  return (
    <div className="align-middle items-center py-2 text-light-text dark:text-dark-text">
      Time Spent:
      <div className="font-bold text-2xl text-black dark:text-white">
        {timeSpent}
      </div>
    </div>
  );
};

export default TimeSpentDisplay;
