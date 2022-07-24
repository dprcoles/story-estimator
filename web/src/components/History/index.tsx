import React from "react";
import { motion } from "framer-motion";
import { Story } from "@/types/story";
import { NON_NUMERIC_OPTIONS } from "@/utils/constants";
import { FADE_IN, STAGGER } from "@/utils/variants";
import { getTimeSpent } from "@/utils/functions";

interface HistoryProps {
  stories: Array<Story>;
}

const History: React.FC<HistoryProps> = ({ stories }) => {
  const completeStories = stories.filter(x => x.hasOwnProperty("endSeconds"));

  const totalEstimate = completeStories
    .filter(x => !NON_NUMERIC_OPTIONS.includes(x.vote as string))
    .map(x => Number(x.vote))
    .reduce((x, y) => x + y, 0);

  const getTotalTimeSpent = () => {
    const total = Math.max(
      ...completeStories.map(x => x.totalTimeSpent as number)
    );

    return getTimeSpent(total);
  };

  if (completeStories.length === 0)
    return (
      <div className="flex justify-center align-middle">
        No history to display for this session
      </div>
    );

  return (
    <div>
      <table className="table-auto border-separate border-spacing-1 w-full">
        <thead>
          <th className="text-left">Description</th>
          <th className="text-left">Estimate</th>
          <th className="text-left">Time spent (mm:ss)</th>
        </thead>
        <motion.tbody variants={STAGGER}>
          {completeStories.map(x => (
            <motion.tr variants={FADE_IN}>
              <td>{x.description}</td>
              <td>{x.vote}</td>
              <td>{getTimeSpent(x.totalTimeSpent)}</td>
            </motion.tr>
          ))}
          <motion.tr variants={FADE_IN} className="font-bold">
            <td className="text-center border-t-2 border-b-2 border-black dark:border-white">
              Total
            </td>
            <td className="border-t-2 border-b-2 border-black dark:border-white">
              {totalEstimate}
            </td>
            <td className="border-t-2 border-b-2 border-black dark:border-white">
              {getTotalTimeSpent()}
            </td>
          </motion.tr>
        </motion.tbody>
      </table>
    </div>
  );
};

export default History;

