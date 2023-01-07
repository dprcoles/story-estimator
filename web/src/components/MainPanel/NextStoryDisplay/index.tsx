import React from "react";
import { motion } from "framer-motion";
import Button, { ButtonStyle } from "@/components/Button";
import { useSocketStore } from "@/stores/socketStore";
import { EmitEvent } from "@/types/server";
import { FADE_IN, STAGGER } from "@/utils/variants";

interface NextStoryDisplayProps {
  setIsStoryModalOpen: (isStoryModalOpen: boolean) => void;
}

const NextStoryDisplay: React.FC<NextStoryDisplayProps> = ({
  setIsStoryModalOpen,
}) => {
  const { emit } = useSocketStore();

  const handleCompleteSession = () => {
    emit(EmitEvent.CompleteSession);
  };

  return (
    <motion.div variants={STAGGER} className="text-center p-8 space-y-8">
      <motion.div variants={FADE_IN} className="font-bold text-3xl">
        All stories have been estimated!
      </motion.div>
      <div className="text-md text-light-text dark:text-dark-text">
        You can either continue this session by adding another story, or end the
        session.
      </div>
      <motion.div variants={FADE_IN} className="flex justify-center space-x-8">
        <Button onClick={() => setIsStoryModalOpen(true)}>Add Story</Button>
        <Button onClick={handleCompleteSession} style={ButtonStyle.Primary}>
          End Session
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default NextStoryDisplay;

