import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Core";
import { TeamSession } from "@/types/team";
import { ROUTE_ROOM, ROUTE_SUMMARY } from "@/utils/constants";

interface SessionCardProps {
  session: TeamSession;
}

const SessionCard = ({ session }: SessionCardProps) => {
  const navigate = useNavigate();
  const { active, id, name, playerCount, storyCount } = session;

  const handleOnClick = () => {
    navigate(`${active ? ROUTE_ROOM : ROUTE_SUMMARY}/${id}`);
  };

  return (
    <div
      className={`md:w-150 bg-light-buttons dark:bg-dark-buttons rounded-md border-2 p-4 transition-all duration-150 ease-linear ${
        active
          ? "border-light-main dark:border-dark-main"
          : "border-transparent"
      }`}
    >
      <div className="mb-4 text-lg font-bold">{name}</div>
      <div className="flex">
        <div>
          <div className="text-light-text dark:text-dark-text text-sm font-semibold">
            Players: {playerCount}
          </div>
          {!active && (
            <div className="text-light-text dark:text-dark-text text-sm font-semibold">
              Stories: {storyCount}
            </div>
          )}
        </div>
        <div className="ml-auto flex">
          <Button
            color={active ? "primary" : "default"}
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
