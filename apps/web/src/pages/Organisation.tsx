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
      <motion.div variants={FADE_IN} className="h-screen max-h-full">
        <div className="px-2">
          <div className="main-panel__container rounded-lg bg-slate-100 px-8 py-4 dark:bg-zinc-900">
            <div className="p-8">
              <motion.h1 variants={FADE_FROM_LEFT} className="mb-8">
                {organisation.name.split(" ").map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent dark:from-red-600 dark:to-pink-500"
                  >
                    {word}{" "}
                  </span>
                ))}
              </motion.h1>
              <div className="my-8">
                <motion.div variants={FADE_FROM_LEFT} className="mb-4">
                  <Button variant="default" onClick={() => setIsModalOpen(true)}>
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
