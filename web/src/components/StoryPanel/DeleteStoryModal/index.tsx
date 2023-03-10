import React from "react";
import { Story } from "@/types/story";
import { IoMdClose } from "react-icons/io";
import Button, { ButtonStyle } from "@/components/Button";

interface DeleteStoryModalProps {
  story: Story;
  onDelete: (id: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DeleteStoryModal: React.FC<DeleteStoryModalProps> = ({
  story,
  onDelete,
  isOpen,
  setIsOpen,
}) => {
  return (
    <>
      {isOpen ? (
        <>
          <div className="max-w-3xl max-h-screen mx-auto justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="my-6 min-w-full">
              <div className="min-h-full border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-light-panels dark:bg-dark-panels outline-none focus:outline-none">
                <div className="flex items-baseline justify-between p-5 border-b border-solid border-light-buttons dark:border-dark-buttons rounded-t">
                  <div className="text-lg font-medium">Delete Story</div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-auto rounded-full hover:bg-light-hover dark:hover:bg-dark-hover w-10 h-10 flex items-center justify-center"
                  >
                    <span className="text-light-text dark:text-dark-text text-2xl">
                      <IoMdClose />
                    </span>
                  </button>
                </div>
                <div className="p-8">
                  Are you sure you want to delete story{" "}
                  <span className="font-bold">{story.description}</span>?
                </div>
                <div className="flex p-6 border-t border-solid border-light-buttons dark:border-dark-buttons rounded-b">
                  <div className="ml-auto">
                    <Button
                      onClick={() => onDelete(story.id)}
                      style={ButtonStyle.Danger}
                    >
                      Delete story
                    </Button>
                  </div>
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

export default DeleteStoryModal;

