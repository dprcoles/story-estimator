import React from "react";
import { motion } from "framer-motion";
import SessionCard from "../SessionCard";
import { TeamSession } from "@/types/team";
import { FADE_IN, STAGGER } from "@/utils/variants";

interface SessionListProps {
  title: string;
  sessions: TeamSession[];
}

const SessionList: React.FC<SessionListProps> = ({ title, sessions }) => {
  return (
    <motion.div variants={STAGGER}>
      <div className="font-semibold text-2xl mb-4">{title}</div>
      <div className="gap-2 grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
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
