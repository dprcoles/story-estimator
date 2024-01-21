import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Core";
import { OrganisationTeam } from "@/types/organisation";
import { ROUTE_TEAM } from "@/utils/constants";

interface TeamCardProps {
  team: OrganisationTeam;
}

const TeamCard = ({ team }: TeamCardProps) => {
  const navigate = useNavigate();
  const { name, alias } = team;

  const handleOnClick = () => {
    navigate(`${ROUTE_TEAM}/${alias}`);
  };

  return (
    <div className="md:w-150 rounded-md border-2 border-transparent bg-neutral-100 p-4 transition-all duration-150 ease-linear dark:bg-black">
      <div className="mb-4 text-lg font-bold">{name}</div>
      <div className="flex">
        <div className="ml-auto flex">
          <Button variant="default" onClick={handleOnClick}>
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
