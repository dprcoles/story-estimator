import classNames from "classnames";
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
      className={classNames(
        "md:w-150 rounded-md border-2 bg-neutral-200 p-4 transition-all duration-150 ease-linear dark:bg-black",
        active ? "border-blue-400 dark:border-pink-500" : "border-transparent",
      )}
    >
      <div className="mb-4 text-lg font-bold">{name}</div>
      <div className="flex">
        <div>
          <div className="text-sm font-semibold text-black dark:text-white">
            Players: {playerCount}
          </div>
          {!active && (
            <div className="text-sm font-semibold text-black dark:text-white">
              Stories: {storyCount}
            </div>
          )}
        </div>
        <div className="ml-auto flex">
          <Button variant={active ? "default" : "outline"} onClick={handleOnClick}>
            {active ? "Join" : "View Summary"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
