import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Core";
import { OrganisationTeam } from "@/types/organisation";
import { ROUTE_TEAM } from "@/utils/constants";

interface TeamCardProps {
  team: OrganisationTeam;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const navigate = useNavigate();
  const { name, alias } = team;

  const handleOnClick = () => {
    navigate(`${ROUTE_TEAM}/${alias}`);
  };

  return (
    <div className="md:w-150 p-4 bg-light-buttons dark:bg-dark-buttons rounded-md border-2 ease-linear transition-all duration-150 border-transparent">
      <div className="text-lg font-bold mb-4">{name}</div>
      <div className="flex">
        <div className="ml-auto flex">
          <Button color={"primary"} onClick={handleOnClick}>
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
