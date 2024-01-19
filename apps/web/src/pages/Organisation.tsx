import { motion } from "framer-motion";
import OrganisationProvider from "providers/OrganisationProvider";
import React, { useState } from "react";

import { Button } from "@/components/Core";
import CreateTeamModal from "@/components/Modals/CreateTeamModal";
import TeamList from "@/components/Organisations/TeamList";
import { useOrganisationStore } from "@/stores/organisationStore";
import { FADE_FROM_LEFT, FADE_IN } from "@/utils/variants";

const Organisation = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { organisation } = useOrganisationStore();

  return (
    <OrganisationProvider>
      <CreateTeamModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <motion.div variants={FADE_IN} className="max-h-full h-screen">
        <div className="px-2">
          <div className="bg-light-panels dark:bg-dark-panels rounded-lg py-4 px-8 main-panel__container">
            <div className="p-8">
              <motion.h1 variants={FADE_FROM_LEFT} className="mb-8">
                {organisation.name}
              </motion.h1>
              <div className="my-8">
                <motion.div variants={FADE_FROM_LEFT} className="mb-4">
                  <Button color="primary" onClick={() => setIsModalOpen(true)}>
                    Create Team
                  </Button>
                </motion.div>
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
