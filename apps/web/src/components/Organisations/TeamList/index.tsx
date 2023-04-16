import { motion } from "framer-motion";
import React from "react";

import { OrganisationTeam } from "@/types/organisation";
import { FADE_IN, STAGGER } from "@/utils/variants";

import TeamCard from "./TeamCard";

interface TeamListProps {
  title: string;
  teams: OrganisationTeam[];
}

const TeamList: React.FC<TeamListProps> = ({ title, teams }) => {
  return (
    <motion.div variants={STAGGER}>
      <div className="font-semibold text-2xl mb-4">{title}</div>
      <div className="gap-2 grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
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
