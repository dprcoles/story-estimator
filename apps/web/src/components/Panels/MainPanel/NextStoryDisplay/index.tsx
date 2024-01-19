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

  const isAdmin = useRoomStore((state) => state.isAdmin);
  const { emit } = useSocketStore();

  const handleCompleteSession = () => {
    setIsSubmitting(true);
    emit(EmitEvent.CompleteSession);
  };

  return (
    <>
      <motion.div variants={STAGGER} className="text-center max-w-2xl mx-auto">
        <motion.div variants={FADE_IN} className="py-8">
          <h2>All stories have been estimated!</h2>
        </motion.div>
        {isAdmin ? (
          <motion.div variants={FADE_IN}>
            <div className="text-md text-light-text dark:text-dark-text pb-8">
              You can either continue this session by adding another story, or
              end the session.
              <div className="mt-2">
                When you've added a new story, you can select it from the
                stories panel to start estimating.
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-4">
              <div className="pb-4">
                <Button
                  fullWidth
                  onClick={() => setIsStoryModalOpen(true)}
                  disabled={isSubmitting}
                >
                  Add Story
                </Button>
              </div>
              <div className="pb-4">
                <Button
                  fullWidth
                  onClick={handleCompleteSession}
                  color="primary"
                  disabled={isSubmitting}
                >
                  End Session
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div>Waiting for room admin...</div>
        )}
      </motion.div>
    </>
  );
};

export default NextStoryDisplay;
