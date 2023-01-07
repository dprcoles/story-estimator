import Button from "@/components/Button";
import { StoryDetails } from "@/types/story";
import React from "react";
import { useNavigate } from "react-router-dom";
import History from "../MainPanel/History";

interface SessionSummaryProps {
  stories: StoryDetails[];
}

const SessionSummary: React.FC<SessionSummaryProps> = ({ stories }) => {
  const navigate = useNavigate();

  const handleCreateNewSession = () => {
    navigate("/");
  };

  return (
    <div className="p-8">
      <div className="text-5xl font-bold pb-8">Session Summary</div>
      <div className="text-light-text dark:text-dark-text pb-4"></div>
      <div className="py-8">
        <History
          stories={stories.map(x => ({
            ...x,
            active: false,
            roomId: x.sessionId,
            endSeconds: x.endSeconds ?? undefined,
            startSeconds: x.startSeconds ?? undefined,
            totalTimeSpent: x.totalTimeSpent ?? undefined,
            estimate: x.estimate ?? undefined,
          }))}
        />
      </div>
      <div className="flex">
        <Button onClick={() => handleCreateNewSession()}>
          Create New Session
        </Button>
      </div>
    </div>
  );
};

export default SessionSummary;

