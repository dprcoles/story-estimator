import { motion } from "framer-motion";
import React, { useState } from "react";
import { GiCardRandom } from "react-icons/gi";

import { Button } from "@/components/Core";
import { useSocketStore } from "@/stores/socketStore";
import { EmitEvent } from "@/types/server";
import { EXPAND_IN, FADE_DOWN, FADE_UP, STAGGER } from "@/utils/variants";

interface GetStartedDisplayProps {
  setIsStoryModalOpen: (isStoryModalOpen: boolean) => void;
  hasStories: boolean;
  firstStoryId: number;
}

const GetStartedDisplay = ({
  setIsStoryModalOpen,
  hasStories,
  firstStoryId,
}: GetStartedDisplayProps) => {
  const { emit } = useSocketStore();
  const [clicked, setClicked] = useState<boolean>(false);

  const handleStartEstimating = () =>
    emit(EmitEvent.SetActiveStory, { id: firstStoryId });

  const handleInvitePlayers = () => {
    navigator.clipboard.writeText(window.location.href);
    setClicked(true);

    setTimeout(() => setClicked(false), 3000);
  };

  return (
    <motion.div className="p-8" variants={STAGGER}>
      <div className="mx-auto max-w-xl">
        <motion.div
          variants={FADE_DOWN}
          className="mb-8 flex items-center justify-center text-8xl"
        >
          <GiCardRandom />
        </motion.div>
        <motion.div variants={FADE_UP} className="mb-16 text-center">
          <h1>Let's get started!</h1>
        </motion.div>
        <motion.div variants={FADE_UP}>
          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-4">
            <div className="pb-4">
              <Button fullWidth onClick={() => setIsStoryModalOpen(true)}>
                Create Story
              </Button>
            </div>
            <div className="pb-4">
              <Button fullWidth onClick={handleInvitePlayers}>
                {!clicked ? "Invite Players" : "Copied Link"}
              </Button>
            </div>
          </div>
        </motion.div>
        <motion.div variants={EXPAND_IN} className="flex justify-center py-4">
          {hasStories && (
            <Button fullWidth color="primary" onClick={handleStartEstimating}>
              <div className="p-2 text-lg font-semibold">Start Estimating</div>
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GetStartedDisplay;
