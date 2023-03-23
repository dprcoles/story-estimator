import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "ui";

import { createSession } from "@/api/session";
import CreateSessionModal from "@/components/Modals/CreateSessionModal";
import History from "@/components/Panels/MainPanel/History";
import { SessionDetails } from "@/types/session";
import { ROUTE_ROOM } from "@/utils/constants";

import PlayerList from "./PlayerList";

interface SessionSummaryProps {
  session: SessionDetails;
}

const SessionSummary: React.FC<SessionSummaryProps> = ({ session }) => {
  const [isSessionModalOpen, setIsSessionModalOpen] = useState<boolean>(false);

  const { name, teamId, stories, players } = session;

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
      <div className="p-4 md:p-8">
        <div className="md:flex mb-8">
          <Button onClick={handleGoBack}>{"<"} Go Back</Button>
          <div className="mt-4 md:mt-0 md:ml-4">
            <Button onClick={() => setIsSessionModalOpen(true)}>
              Create New Session
            </Button>
          </div>
        </div>
        <div className="text-5xl font-bold pb-4">{name}</div>
        <div className="text-light-text dark:text-dark-text pb-4"></div>
        <div className="grid md:grid-cols-3 py-8">
          <div className="md:col-span-2">
            <History
              stories={stories.map((x) => ({
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
          <div className="mt-4 md:ml-4 md:mt-0">
            <PlayerList players={players} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionSummary;
