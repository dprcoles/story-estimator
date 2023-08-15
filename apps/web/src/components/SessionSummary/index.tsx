import React from "react";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Core";
import History from "@/components/Panels/MainPanel/History";
import { useSessionStore } from "@/stores/sessionStore";
import { SessionDetails } from "@/types/session";
import { DEFAULT_TEAM_ID } from "@/utils/constants";
import { ROUTE_TEAM } from "@/utils/constants";

import PlayerList from "./PlayerList";

interface SessionSummaryProps {
  session: SessionDetails;
}

const SessionSummary: React.FC<SessionSummaryProps> = ({ session }) => {
  const setIsSessionModalOpen = useSessionStore(
    (state) => state.setIsSessionModalOpen,
  );

  const { name, team, stories, players } = session;

  const navigate = useNavigate();

  const handleGoBack = () => {
    if (team.id !== DEFAULT_TEAM_ID) {
      navigate(`${ROUTE_TEAM}/${team.alias}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="p-4 md:p-8">
        <div className="md:flex mb-8">
          <Button onClick={handleGoBack}>
            <div className="flex items-center">
              <FaChevronLeft className="mr-2" />{" "}
              {team.id !== DEFAULT_TEAM_ID ? "Team" : "Home"} Page
            </div>
          </Button>
          <div className="mt-4 md:mt-0 md:ml-4">
            <Button onClick={() => setIsSessionModalOpen(true)} color="primary">
              <div className="flex items-center">
                <FaPlus className="mr-2" /> Create New Session
              </div>
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
