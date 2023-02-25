import React, { useState } from "react";
import { createSession } from "@/api/session";
import Button from "@/components/Button";
import { PlayerInfo } from "@/types/player";
import { StoryDetails } from "@/types/story";
import { ROUTE_ROOM } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import CreateSessionModal from "../CreateSessionModal";
import History from "../MainPanel/History";

interface SessionSummaryProps {
  stories: StoryDetails[];
  players: PlayerInfo[];
  teamId: number;
}

const SessionSummary: React.FC<SessionSummaryProps> = ({ stories, teamId }) => {
  const [isSessionModalOpen, setIsSessionModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleCreateSession = async (name: string) => {
    const session = await createSession({ name: name, teamId });
    if (session.id) {
      navigate(`${ROUTE_ROOM}/${session.id}`);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <CreateSessionModal
        isOpen={isSessionModalOpen}
        setIsOpen={setIsSessionModalOpen}
        handleCreateSession={handleCreateSession}
      />
      <div className="p-8">
        <div className="flex mb-4">
          <Button onClick={handleGoBack}>{"<"} Go Back</Button>
        </div>
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
          <Button onClick={() => setIsSessionModalOpen(true)}>
            Create New Session
          </Button>
        </div>
      </div>
    </>
  );
};

export default SessionSummary;

