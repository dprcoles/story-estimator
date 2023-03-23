import { Button } from "ui";
import React from "react";
import SessionList from "./SessionList";
import { TeamSession } from "@/types/team";
import { useSessionStore } from "@/stores/sessionStore";

interface SessionsPanelProps {
  sessions: TeamSession[];
}

const SessionsPanel: React.FC<SessionsPanelProps> = ({ sessions }) => {
  const setIsSessionModalOpen = useSessionStore(
    (state) => state.setIsSessionModalOpen,
  );

  const splitSessions = sessions.reduce(
    (r, o) => {
      r[o.active ? "active" : "inactive"].push(o);
      return r;
    },
    {
      active: [] as TeamSession[],
      inactive: [] as TeamSession[],
    },
  );

  return (
    <>
      <div className="flex">
        <Button onClick={() => setIsSessionModalOpen(true)}>
          Create New Session
        </Button>
      </div>
      <div className="my-8">
        <SessionList title="Active Sessions" sessions={splitSessions.active} />
      </div>
      <div className="my-8">
        <SessionList
          title="Inactive Sessions"
          sessions={splitSessions.inactive}
        />
      </div>
    </>
  );
};

export default SessionsPanel;
