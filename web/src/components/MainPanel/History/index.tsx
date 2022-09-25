import React from "react";
import { motion } from "framer-motion";
import { Story } from "@/types/story";
import { NON_NUMERIC_OPTIONS } from "@/utils/constants";
import { FADE_IN, STAGGER } from "@/utils/variants";
import { getTimeSpent } from "@/utils/functions";
import { MdOutlineHistory } from "react-icons/md";

interface HistoryProps {
  stories: Array<Story>;
}

const History: React.FC<HistoryProps> = ({ stories }) => {
  const completeStories = stories.filter(x => x.hasOwnProperty("endSeconds"));

  const totalEstimate = completeStories
    .filter(
      x => ![...NON_NUMERIC_OPTIONS, "", undefined].includes(x.vote as string)
    )
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
      <div className="text-center text-dark-text">
        <div className="flex justify-center align-middle">
          <MdOutlineHistory size={150} className="opacity-5" />
        </div>
        No history to display for this session
      </div>
    );

  return (
    <div>
      <div className="text-2xl font-medium pb-2">
        {completeStories.length} / {stories.length} Stories Estimated
      </div>
      <table className="table-auto w-full">
        <thead className="text-dark-text font-medium">
          <tr>
            <th className="text-left border-b border-dark-border-color py-2">
              Description
            </th>
            <th className="text-left border-b border-dark-border-color py-2">
              Estimate
            </th>
            <th className="text-left border-b border-dark-border-color py-2">
              Time spent (mm:ss)
            </th>
          </tr>
        </thead>
        <motion.tbody variants={STAGGER} className="text-dark-text">
          {completeStories.map(x => (
            <motion.tr variants={FADE_IN} key={`${x.id}-table-row`}>
              <td className="py-2 text-white">{x.description}</td>
              <td className="py-2">{x.vote ?? "-"}</td>
              <td className="py-2">{getTimeSpent(x.totalTimeSpent)}</td>
            </motion.tr>
          ))}
          <motion.tr variants={FADE_IN} className="font-bold text-white">
            <td className="py-2 border-t-2 border-dark-border-color">Total</td>
            <td className="py-2 border-t-2 border-dark-border-color">
              {totalEstimate}
            </td>
            <td className="py-2 border-t-2 border-dark-border-color">
              {getTotalTimeSpent()}
            </td>
          </motion.tr>
        </motion.tbody>
      </table>
    </div>
  );
};

export default History;

