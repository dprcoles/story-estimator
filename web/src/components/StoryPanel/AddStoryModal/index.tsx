import React, { useState } from "react";
import { Story } from "@/types/story";
import { DEFAULT_STORY } from "@/utils/constants";
import { IoMdClose } from "react-icons/io";
import Button, { ButtonStyle } from "../../Button";

interface AddStoryModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSave: (story: Story) => void;
}

const AddStoryModal: React.FC<AddStoryModalProps> = ({
  isOpen,
  setIsOpen,
  handleSave,
}) => {
  const [story, setStory] = useState<Story>(DEFAULT_STORY);

  const handleSetStory = (value: any, property: string) => {
    setStory({ ...story, [property]: value });
  };

  return (
    <>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-dark-panels outline-none focus:outline-none">
                <div className="flex items-baseline justify-between p-5 border-b border-solid border-dark-buttons rounded-t">
                  <div className="text-lg font-medium">Add Story</div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-auto rounded-full hover:bg-dark-hover w-10 h-10 flex items-center justify-center"
                  >
                    <span className="text-dark-text text-2xl">
                      <IoMdClose />
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <input
                    className="p-4 border bg-dark-hover border-transparent hover:border-dark-border-color focus:border-white focus:outline-none w-full md:w-96 rounded-md"
                    value={story.description}
                    onChange={e =>
                      handleSetStory(e.target.value, "description")
                    }
                    onKeyDown={e => e.key === "Enter" && handleSave(story)}
                    placeholder="Enter story name"
                  />
                </div>
                <div className="flex p-6 border-t border-solid border-dark-buttons rounded-b">
                  <div className="ml-auto">
                    <Button
                      onClick={() => handleSave(story)}
                      disabled={
                        story.description.replace(/^\s+|\s+$|\s+(?=\s)/g, "")
                          .length === 0
                      }
                      style={ButtonStyle.Primary}
                    >
                      Add
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

export default AddStoryModal;

