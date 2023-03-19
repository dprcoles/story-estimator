import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "ui";
import { ROUTE_ROOM, ROUTE_SUMMARY } from "@/utils/constants";
import { TeamSession } from "@/types/team";

interface SessionCardProps {
  session: TeamSession;
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const navigate = useNavigate();
  const { active, id, name, playerCount, storyCount } = session;

  const handleOnClick = () => {
    navigate(`${active ? ROUTE_ROOM : ROUTE_SUMMARY}/${id}`);
  };

  return (
    <div
      className={`md:w-150 p-4 bg-light-buttons dark:bg-dark-buttons rounded-md border-2 ease-linear transition-all duration-150 ${
        active
          ? "border-light-main dark:border-dark-main"
          : "border-transparent"
      }`}
    >
      <div className="text-lg font-bold mb-4">{name}</div>
      <div className="flex">
        <div>
          <div className="text-sm text-light-text dark:text-dark-text font-semibold">
            Players: {playerCount}
          </div>
          {!active && (
            <div className="text-sm text-light-text dark:text-dark-text font-semibold">
              Stories: {storyCount}
            </div>
          )}
        </div>
        <div className="ml-auto flex">
          <Button
            style={active ? "primary" : "default"}
            onClick={handleOnClick}
          >
            {active ? "Join" : "View Summary"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
