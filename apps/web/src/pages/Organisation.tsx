import { motion } from "framer-motion";
import OrganisationProvider from "providers/OrganisationProvider";
import React from "react";

import TeamList from "@/components/Organisations/TeamList";
import { useOrganisationStore } from "@/stores/organisationStore";
import { FADE_FROM_LEFT, FADE_IN } from "@/utils/variants";

const Organisation: React.FC = () => {
  const { organisation } = useOrganisationStore();
  return (
    <OrganisationProvider>
      <motion.div variants={FADE_IN} className="max-h-full h-screen">
        <div className="px-2">
          <div className="bg-light-panels dark:bg-dark-panels rounded-lg py-4 px-8 main-panel__container">
            <div className="p-8">
              <motion.div
                variants={FADE_FROM_LEFT}
                className="font-bold text-5xl mb-8"
              >
                {organisation.name}
              </motion.div>
              <div className="my-8">
                <TeamList title="Teams" teams={organisation.teams} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </OrganisationProvider>
  );
};

export default Organisation;
