import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import { GiCardRandom } from "react-icons/gi";
import InviteButton from "../InviteButton";
import { FADE_DOWN, FADE_UP, STAGGER } from "@/utils/variants";
import { RoomIntegrations } from "@/types/room";
import ImportFromJiraButton from "@/components/ImportFromJiraButton";

interface GetStartedDisplayProps {
  setIsStoryModalOpen: (isStoryModalOpen: boolean) => void;
  setIsJiraImportModalOpen: (isJiraImportModalOpen: boolean) => void;
  integrations: RoomIntegrations | null;
}

const GetStartedDisplay: React.FC<GetStartedDisplayProps> = ({
  setIsStoryModalOpen,
  setIsJiraImportModalOpen,
  integrations,
}) => {
  return (
    <motion.div className="p-8" variants={STAGGER}>
      <motion.div
        variants={FADE_DOWN}
        className="flex justify-center items-center mb-8 text-8xl"
      >
        <GiCardRandom />
      </motion.div>
      <motion.div
        variants={FADE_UP}
        className="text-center font-bold text-5xl mb-16"
      >
        Let's get started!
      </motion.div>
      <motion.div variants={FADE_UP} className="flex justify-center space-x-4">
        <Button onClick={() => setIsStoryModalOpen(true)}>Create Story</Button>
        <InviteButton linkToCopy={window.location.href} />
      </motion.div>
      <ImportFromJiraButton
        isEnabled={Boolean(integrations?.jira)}
        setIsJiraImportModalOpen={setIsJiraImportModalOpen}
      />
    </motion.div>
  );
};

export default GetStartedDisplay;

