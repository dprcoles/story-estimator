import React from "react";

import { Button } from "@/components/Core";
import { useSocketStore } from "@/stores/socketStore";
import { EmitEvent } from "@/types/server";
import { SKIP_VOTE_OPTION } from "@/utils/constants";

interface SkipButtonProps {
  currentStoryId: number;
}

const SkipButton = ({ currentStoryId }: SkipButtonProps) => {
  const emit = useSocketStore((state) => state.emit);

  const handleSkip = () => {
    emit(EmitEvent.Complete, {
      vote: SKIP_VOTE_OPTION,
      id: currentStoryId,
    });
  };

  return (
    <Button variant="outline" onClick={handleSkip}>
      Skip Story
    </Button>
  );
};

export default SkipButton;
