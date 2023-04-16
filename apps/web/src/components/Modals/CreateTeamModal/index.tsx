import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "ui";

import { createTeam } from "@/api/team";
import { useOrganisationStore } from "@/stores/organisationStore";
import { ROUTE_TEAM } from "@/utils/constants";

interface CreateTeamModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [name, setName] = useState<string>("");
  const [alias, setAlias] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { organisation } = useOrganisationStore();
  const navigate = useNavigate();

  useEffect(() => {
    setAlias(name.replace(/\s/g, "-").toLowerCase());
  }, [name]);

  const handleOnCreate = async () => {
    setIsLoading(true);
    const team = await createTeam({
      organisationId: organisation.id,
      name,
      alias,
    });

    if (team.alias) {
      navigate(`${ROUTE_TEAM}/${team.alias}`);
      setIsOpen(false);
    }
  };

  const isValid =
    name.replace(/^\s+|\s+$|\s+(?=\s)/g, "").length > 0 &&
    alias.replace(/^\s+|\s+$|\s+(?=\s)/g, "").length > 0;

  return (
    <Modal
      open={isOpen}
      handleClose={() => setIsOpen(false)}
      size="sm"
      heading={<div className="text-lg font-medium">Create Team</div>}
      showClose
      footer={
        <Button
          onClick={() => handleOnCreate()}
          disabled={!isValid || isLoading}
          color="primary"
        >
          Create
        </Button>
      }
    >
      <div className="py-4 px-6 flex-auto">
        <div className="py-1">Team Name</div>
        <input
          className="p-4 mb-4 border bg-light-hover dark:bg-dark-hover border-transparent hover:border-dark-border-color dark:hover:border-dark-border-color focus:border-black dark:focus:border-white focus:outline-none w-full md:w-96 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name for your team"
        />
        {alias.length > 0 && (
          <div className="py-2 text-xs">
            Your team link will be: https://storyestimator.dev{ROUTE_TEAM}/
            {alias}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CreateTeamModal;
