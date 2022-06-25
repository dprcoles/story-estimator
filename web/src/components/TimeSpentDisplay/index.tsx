import React, { useState } from "react";
import { useInterval } from "@/hooks/index";

interface TimeSpentDisplayProps {
  startTime: number;
}

const TimeSpentDisplay: React.FC<TimeSpentDisplayProps> = ({ startTime }) => {
  const [timeSpent, setTimeSpent] = useState<string>("");

  useInterval(() => {
    const currentTimeSeconds = new Date().getTime() / 1000;
    const seconds = Math.floor(currentTimeSeconds - startTime);

    setTimeSpent(new Date(seconds * 1000).toISOString().substr(14, 5));
  }, 1000);

  return (
    <div className="align-middle items-center py-2">
      <span className="font-bold text-lg">{timeSpent}</span>
    </div>
  );
};

export default TimeSpentDisplay;

