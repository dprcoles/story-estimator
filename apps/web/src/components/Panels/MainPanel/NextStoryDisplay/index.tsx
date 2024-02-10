import { motion } from "framer-motion";
import React, { useState } from "react";

import { Button } from "@/components/Core";
import { useRoomStore } from "@/stores/roomStore";
import { useSocketStore } from "@/stores/socketStore";
import { EmitEvent } from "@/types/server";
import { FADE_IN, STAGGER } from "@/utils/variants";

interface NextStoryDisplayProps {
  setIsStoryModalOpen: (isStoryModalOpen: boolean) => void;
}

const NextStoryDisplay = ({ setIsStoryModalOpen }: NextStoryDisplayProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { isAdmin, admin } = useRoomStore((state) => state);
  const { emit } = useSocketStore();

  const handleCompleteSession = () => {
    setIsSubmitting(true);
    emit(EmitEvent.CompleteSession);
  };

  return (
    <>
      <motion.div variants={STAGGER} className="mx-auto max-w-2xl text-center">
        <motion.div variants={FADE_IN} className="py-8">
          <h2>All stories have been estimated!</h2>
        </motion.div>
        {isAdmin ? (
          <motion.div variants={FADE_IN}>
            <div className="text-md pb-8 text-black dark:text-white">
              You can either continue this session by adding another story, or end the session.
              <div className="mt-2">
                When you've added a new story, you can select it from the stories panel to start
                estimating.
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-4">
              <div className="pb-4">
                <Button fullWidth onClick={() => setIsStoryModalOpen(true)} disabled={isSubmitting}>
                  Add Story
                </Button>
              </div>
              <div className="pb-4">
                <Button
                  fullWidth
                  onClick={handleCompleteSession}
                  variant="default"
                  disabled={isSubmitting}
                >
                  End Session
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="animate-pulse">
            Waiting for <b>{admin ? `${admin.emoji} ${admin.name}` : "room admin"}</b>...
          </div>
        )}
      </motion.div>
    </>
  );
};

export default NextStoryDisplay;
