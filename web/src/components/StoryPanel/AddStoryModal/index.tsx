import React, { useState } from "react";
import { AddStoryTab, Story } from "@/types/story";
import { IoMdClose } from "react-icons/io";
import Button, { ButtonStyle } from "../../Button";
import ManualImportTab from "./ManualImportTab";
import JiraImportTab from "./JiraImportTab";
import { ReactComponent as JiraLogoSmall } from "@/assets/jira-logo-small.svg";

interface AddStoryModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSave: (stories: Story[]) => void;
  jiraIntegrationId?: number | null;
}

const AddStoryModal: React.FC<AddStoryModalProps> = ({
  isOpen,
  setIsOpen,
  handleSave,
  jiraIntegrationId,
}) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [tab, setTab] = useState<string>(AddStoryTab.Manual);

  const tabs = [
    {
      id: AddStoryTab.Manual,
      label: "Manual",
    },
    {
      id: AddStoryTab.Jira,
      label: "Jira",
    },
  ];

  return (
    <>
      {isOpen ? (
        <>
          <div className="max-w-5xl max-h-screen mx-auto justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="my-6 min-w-full">
              <div className="min-h-full border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-light-panels dark:bg-dark-panels outline-none focus:outline-none">
                <div className="flex items-baseline justify-between p-5 border-b border-solid border-light-buttons dark:border-dark-buttons rounded-t">
                  <div className="text-lg font-medium">Add Stories</div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-auto rounded-full hover:bg-light-hover dark:hover:bg-dark-hover w-10 h-10 flex items-center justify-center"
                  >
                    <span className="text-light-text dark:text-dark-text text-2xl">
                      <IoMdClose />
                    </span>
                  </button>
                </div>
                {Boolean(jiraIntegrationId) && (
                  <div className="grid m-2 grid-cols-2">
                    {tabs.map(x => (
                      <button
                        key={x.id}
                        className={`w-full rounded-md p-3 text-sm ${
                          x.id === tab
                            ? "bg-light-hover dark:bg-dark-hover"
                            : "bg-transparent"
                        }`}
                        onClick={() => setTab(x.id)}
                      >
                        {x.id === AddStoryTab.Jira ? (
                          <div className="flex items-center justify-center">
                            <JiraLogoSmall />
                            <div className="ml-2 font-medium">{x.label}</div>
                          </div>
                        ) : (
                          <span>{x.label}</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
                <div className="p-4 h-72 overflow-y-scroll">
                  <div className={tab !== AddStoryTab.Manual ? "hidden" : ""}>
                    <ManualImportTab
                      stories={stories}
                      setStories={setStories}
                    />
                  </div>
                  <div className={tab !== AddStoryTab.Jira ? "hidden" : ""}>
                    <JiraImportTab
                      integrationId={jiraIntegrationId!}
                      setStories={setStories}
                      isOpen={tab === AddStoryTab.Jira}
                    />
                  </div>
                </div>
                <div className="flex p-6 border-t border-solid border-light-buttons dark:border-dark-buttons rounded-b">
                  <div className="ml-auto">
                    <Button
                      onClick={() => handleSave(stories)}
                      disabled={stories.length === 0}
                      style={ButtonStyle.Primary}
                    >
                      Add {stories.length} Stories
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

