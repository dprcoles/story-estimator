import { motion } from "framer-motion";
import React from "react";

import { OrganisationTeam } from "@/types/organisation";
import { FADE_IN, STAGGER } from "@/utils/variants";

import TeamCard from "./TeamCard";

interface TeamListProps {
  title: string;
  teams: OrganisationTeam[];
}

const TeamList = ({ title, teams }: TeamListProps) => {
  return (
    <motion.div variants={STAGGER}>
      <div className="mb-4 text-2xl font-semibold">{title}</div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4">
        {teams.length > 0 ? (
          teams.map((t) => (
            <motion.div key={t.id} variants={FADE_IN}>
              <TeamCard team={t} />
            </motion.div>
          ))
        ) : (
          <div className="text-light-text dark:text-dark-text">
            There are currently no teams to display
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TeamList;
