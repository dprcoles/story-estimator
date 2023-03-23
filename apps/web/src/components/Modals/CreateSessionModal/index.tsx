import React, { useState } from "react";
import { Button, Modal } from "ui";

interface CreateSessionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleCreateSession: (name: string) => void;
}

const CreateSessionModal: React.FC<CreateSessionModalProps> = ({
  isOpen,
  setIsOpen,
  handleCreateSession,
}) => {
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
      <div className="py-4 px-6 flex-auto">
        <input
          className="p-4 border bg-light-hover dark:bg-dark-hover border-transparent hover:border-dark-border-color dark:hover:border-dark-border-color focus:border-black dark:focus:border-white focus:outline-none w-full md:w-96 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name for your session"
        />
      </div>
    </Modal>
  );
};

export default CreateSessionModal;
