import React, { useState } from "react";
import { Story } from "@/types/story";
import { DEFAULT_STORY } from "@/utils/constants";

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
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-dark-secondary outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-light-secondary dark:border-dark-secondary rounded-t">
                  <h3 className="text-3xl font-semibold">Add Story</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <input
                    className="p-4 border-2 bg-light-primary border-light-secondary focus:border-light-main dark:bg-dark-primary dark:border-dark-secondary dark:focus:border-dark-main focus:outline-none w-full md:w-96 rounded-md"
                    value={story.description}
                    onChange={e =>
                      handleSetStory(e.target.value, "description")
                    }
                    onKeyDown={e => e.key === "Enter" && handleSave(story)}
                  />
                </div>
                <div className="flex items-center justify-between p-6 border-t border-solid border-light-primary dark:border-dark-primary rounded-b">
                  {story.description.length > 0 ? (
                    <button
                      className="bg-light-main active:bg-light-main dark:bg-dark-main dark:active:bg-dark-main text-white dark:text-black px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:opacity-25"
                      type="button"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  ) : null}
                  <button
                    className="bg-light-main active:bg-light-main dark:bg-dark-main dark:active:bg-dark-main text-white dark:text-black px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:opacity-25"
                    type="button"
                    onClick={() => handleSave(story)}
                    disabled={
                      story.description.replace(/^\s+|\s+$|\s+(?=\s)/g, "")
                        .length === 0
                    }
                  >
                    Save
                  </button>
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

