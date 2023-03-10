import React, { useState } from "react";
import { motion } from "framer-motion";
import Button, { ButtonStyle } from "@/components/Button";
import { GiCardRandom } from "react-icons/gi";
import { FADE_DOWN, FADE_UP, STAGGER, EXPAND_IN } from "@/utils/variants";
import { RoomIntegrations } from "@/types/room";
import { EmitEvent } from "@/types/server";
import { useSocketStore } from "@/stores/socketStore";

interface GetStartedDisplayProps {
  setIsStoryModalOpen: (isStoryModalOpen: boolean) => void;
  hasStories: boolean;
  firstStoryId: number;
}

const GetStartedDisplay: React.FC<GetStartedDisplayProps> = ({
  setIsStoryModalOpen,
  hasStories,
  firstStoryId,
}) => {
  const { emit } = useSocketStore();
  const [clicked, setClicked] = useState<boolean>(false);

  const handleStartEstimating = () =>
    emit(EmitEvent.SetActiveStory, firstStoryId);

  const handleInvitePlayers = () => {
    navigator.clipboard.writeText(window.location.href);
    setClicked(true);

    setTimeout(() => setClicked(false), 3000);
  };

  return (
    <motion.div className="p-8" variants={STAGGER}>
      <div className="max-w-xl mx-auto">
        <motion.div
          variants={FADE_DOWN}
          className="flex justify-center items-center mb-8 text-8xl"
        >
          <GiCardRandom />
        </motion.div>
        <motion.div variants={FADE_UP} className="text-center mb-16">
          <div className="font-bold text-5xl">Let's get started!</div>
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
            <Button
              fullWidth
              style={ButtonStyle.Primary}
              onClick={handleStartEstimating}
            >
              <div className="p-2 text-lg font-semibold">Start Estimating</div>
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GetStartedDisplay;

