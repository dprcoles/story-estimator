import React, { useState } from "react";

import { Button, Modal } from "@/components/Core";

interface CreateSessionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleCreateSession: (name: string) => void;
}

const CreateSessionModal = ({
  isOpen,
  setIsOpen,
  handleCreateSession,
}: CreateSessionModalProps) => {
  const [name, setName] = useState<string>("");

  const handleOnCreate = async () => {
    handleCreateSession(name);
    setIsOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      handleClose={() => setIsOpen(false)}
      size="sm"
      heading={<div className="text-lg font-medium">Create Session</div>}
      footer={
        <Button
          onClick={() => handleOnCreate()}
          disabled={name.replace(/^\s+|\s+$|\s+(?=\s)/g, "").length === 0}
          color="primary"
        >
          Create
        </Button>
      }
    >
      <div className="flex-auto px-6 py-4">
        <input
          className="bg-light-hover dark:bg-dark-hover hover:border-dark-border-color dark:hover:border-dark-border-color w-full rounded-md border border-transparent p-4 focus:border-black focus:outline-none md:w-96 dark:focus:border-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name for your session"
        />
      </div>
    </Modal>
  );
};

export default CreateSessionModal;
