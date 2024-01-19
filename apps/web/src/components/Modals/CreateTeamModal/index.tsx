import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createTeam } from "@/api/team";
import { Button, Modal } from "@/components/Core";
import { useOrganisationStore } from "@/stores/organisationStore";
import { ROUTE_TEAM } from "@/utils/constants";

interface CreateTeamModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateTeamModal = ({ isOpen, setIsOpen }: CreateTeamModalProps) => {
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
      <div className="flex-auto px-6 py-4">
        <div className="py-1">Team Name</div>
        <input
          className="bg-light-hover dark:bg-dark-hover hover:border-dark-border-color dark:hover:border-dark-border-color mb-4 w-full rounded-md border border-transparent p-4 focus:border-black focus:outline-none md:w-96 dark:focus:border-white"
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
