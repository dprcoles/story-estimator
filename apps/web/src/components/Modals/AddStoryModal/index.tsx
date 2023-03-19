import React, { useState } from "react";
import { Button, Modal, Tabs } from "ui";
import ManualImportTab from "./ManualImportTab";
import JiraImportTab from "./JiraImportTab";
import { AddStoryTab, Story } from "@/types/story";

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
    <Modal
      open={isOpen}
      handleClose={() => setIsOpen(false)}
      showClose
      heading={<div className="text-lg font-medium">Add Stories</div>}
      size="lg"
      footer={
        <div className="ml-auto">
          <Button
            onClick={() => handleSave(stories)}
            disabled={stories.length === 0}
            style="primary"
          >
            Add {stories.length} Stories
          </Button>
        </div>
      }
    >
      {Boolean(jiraIntegrationId) && (
        <div className="grid m-2 grid-cols-2">
          <Tabs tabs={tabs} activeTab={tab} setActiveTab={setTab} fullWidth />
        </div>
      )}
      <div className="p-4 h-72 overflow-y-scroll">
        <div className={tab !== AddStoryTab.Manual ? "hidden" : ""}>
          <ManualImportTab stories={stories} setStories={setStories} />
        </div>
        <div className={tab !== AddStoryTab.Jira ? "hidden" : ""}>
          <JiraImportTab
            integrationId={jiraIntegrationId!}
            setStories={setStories}
            isOpen={tab === AddStoryTab.Jira}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddStoryModal;
