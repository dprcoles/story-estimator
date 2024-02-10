import classNames from "classnames";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { GiCardRandom } from "react-icons/gi";

import { Button } from "@/components/Core";
import { useRoomStore } from "@/stores/roomStore";
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
  const isAdmin = useRoomStore((state) => state.isAdmin);

  const handleStartEstimating = () => emit(EmitEvent.SetActiveStory, { id: firstStoryId });

  const handleInvitePlayers = () => {
    navigator.clipboard.writeText(window.location.href);
    setClicked(true);

    setTimeout(() => setClicked(false), 3000);
  };

  return (
    <motion.div className="p-8" variants={STAGGER}>
      <div className="mx-auto max-w-xl">
        <motion.div variants={FADE_DOWN} className="mb-8 flex items-center justify-center text-8xl">
          <GiCardRandom className="fill-blue-400 dark:fill-pink-500" />
        </motion.div>
        <motion.div variants={FADE_UP} className="mb-16 text-center">
          <h1>
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent dark:from-red-600 dark:to-pink-500">
              Let's{" "}
            </span>
            <span className="bg-gradient-to-l from-blue-400 to-purple-600 bg-clip-text text-transparent dark:from-red-600 dark:to-pink-500">
              get{" "}
            </span>
            <span className="bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              started
            </span>
          </h1>
        </motion.div>
        <motion.div variants={FADE_UP}>
          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-4">
            {isAdmin && (
              <div className="pb-4">
                <Button fullWidth onClick={() => setIsStoryModalOpen(true)}>
                  Create Story
                </Button>
              </div>
            )}
            <div className={classNames("pb-4", !isAdmin && "col-span-2")}>
              <Button fullWidth onClick={handleInvitePlayers}>
                {!clicked ? "Invite Players" : "Copied Link"}
              </Button>
            </div>
          </div>
        </motion.div>
        <motion.div variants={EXPAND_IN} className="flex justify-center py-4">
          {hasStories && isAdmin && (
            <Button fullWidth variant="default" onClick={handleStartEstimating}>
              <div className="p-2 text-lg font-semibold">Start Estimating</div>
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GetStartedDisplay;
