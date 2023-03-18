import React, { useState } from "react";
import { Button } from "ui";

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
    <>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-light-panels dark:bg-dark-panels outline-none focus:outline-none">
                <div className="flex items-baseline justify-between p-5 border-b border-solid border-light-buttons dark:border-dark-buttons rounded-t">
                  <div className="text-lg font-medium">Create Session</div>
                </div>
                <div className="py-4 px-6 flex-auto">
                  <input
                    className="p-4 border bg-light-hover dark:bg-dark-hover border-transparent hover:border-dark-border-color dark:hover:border-dark-border-color focus:border-black dark:focus:border-white focus:outline-none w-full md:w-96 rounded-md"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a name for your session"
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-light-buttons dark:border-dark-buttons rounded-b">
                  <Button
                    onClick={() => handleOnCreate()}
                    disabled={
                      name.replace(/^\s+|\s+$|\s+(?=\s)/g, "").length === 0
                    }
                    style="primary"
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default CreateSessionModal;
