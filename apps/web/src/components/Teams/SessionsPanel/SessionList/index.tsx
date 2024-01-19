import { motion } from "framer-motion";
import React from "react";

import { TeamSession } from "@/types/team";
import { FADE_IN, STAGGER } from "@/utils/variants";

import SessionCard from "../SessionCard";

interface SessionListProps {
  title: string;
  sessions: TeamSession[];
}

const SessionList = ({ title, sessions }: SessionListProps) => {
  return (
    <motion.div variants={STAGGER}>
      <div className="mb-4 text-2xl font-semibold">{title}</div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
        {sessions.length > 0 ? (
          sessions.map((s) => (
            <motion.div key={s.id} variants={FADE_IN}>
              <SessionCard session={s} />
            </motion.div>
          ))
        ) : (
          <div className="text-light-text dark:text-dark-text">
            There are currently no sessions to display
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SessionList;
