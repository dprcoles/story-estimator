import { motion } from "framer-motion";
import React from "react";
import { MdOutlineHistory } from "react-icons/md";

import { Story } from "@/types/story";
import { NON_NUMERIC_OPTIONS } from "@/utils/constants";
import { getTimeSpent } from "@/utils/functions";
import { FADE_IN, STAGGER } from "@/utils/variants";

interface HistoryProps {
  stories: Array<Story>;
}

const History = ({ stories }: HistoryProps) => {
  const completeStories = stories.filter((x) => x.hasOwnProperty("endSeconds"));

  const totalEstimate = completeStories
    .filter(
      (x) =>
        ![...NON_NUMERIC_OPTIONS, "", undefined, null].includes(
          x.estimate as string,
        ),
    )
    .map((x) => Number(x.estimate))
    .reduce((x, y) => x + y, 0);

  const getTotalTimeSpent = () => {
    const total = completeStories.reduce(
      (x, y) => x + ((y.totalTimeSpent ?? 0) as number),
      0,
    );

    return getTimeSpent(total);
  };

  if (completeStories.length === 0)
    return (
      <div className="text-light-text dark:text-dark-text text-center">
        <div className="flex justify-center align-middle">
          <MdOutlineHistory size={150} className="opacity-5" />
        </div>
        No history to display for this session
      </div>
    );

  return (
    <div>
      <div className="pb-2 text-2xl font-medium">
        {completeStories.length} / {stories.length} Stories Estimated
      </div>
      <table className="w-full table-auto">
        <thead className="text-light-text dark:text-dark-text font-medium">
          <tr>
            <th className="border-light-border-color dark:border-dark-border-color border-b py-2 text-left">
              Description
            </th>
            <th className="border-light-border-color dark:border-dark-border-color border-b py-2 text-left">
              Estimate
            </th>
            <th className="border-light-border-color dark:border-dark-border-color border-b py-2 text-left">
              Time spent (mm:ss)
            </th>
          </tr>
        </thead>
        <motion.tbody
          variants={STAGGER}
          className="text-light-text dark:text-dark-text"
        >
          {completeStories.map((x) => (
            <motion.tr variants={FADE_IN} key={`${x.id}-table-row`}>
              <td className="py-2 text-black dark:text-white">
                {x.description}
              </td>
              <td className="py-2">{x.estimate ?? "-"}</td>
              <td className="py-2">{getTimeSpent(x.totalTimeSpent)}</td>
            </motion.tr>
          ))}
          <motion.tr
            variants={FADE_IN}
            className="font-bold text-black dark:text-white"
          >
            <td className="border-light-border-color dark:border-dark-border-color border-t-2 py-2">
              Total
            </td>
            <td className="border-light-border-color dark:border-dark-border-color border-t-2 py-2">
              {totalEstimate}
            </td>
            <td className="border-light-border-color dark:border-dark-border-color border-t-2 py-2">
              {getTotalTimeSpent()}
            </td>
          </motion.tr>
        </motion.tbody>
      </table>
    </div>
  );
};

export default History;
