import React from "react";
import { Button } from "ui";

import { useSocketStore } from "@/stores/socketStore";
import { EmitEvent } from "@/types/server";
import { SKIP_VOTE_OPTION } from "@/utils/constants";

interface SkipButtonProps {
  currentStoryId: number;
}

const SkipButton: React.FC<SkipButtonProps> = ({ currentStoryId }) => {
  const emit = useSocketStore((state) => state.emit);

  const handleSkip = () => {
    emit(EmitEvent.Complete, {
      vote: SKIP_VOTE_OPTION,
      id: currentStoryId,
    });
  };

  return (
    <Button color="default" onClick={handleSkip}>
      Skip Story
    </Button>
  );
};

export default SkipButton;
