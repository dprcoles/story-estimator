import classNames from "classnames";
import React, { useState } from "react";

import { Button, Modal, Tabs } from "@/components/Core";
import { useRoomStore } from "@/stores/roomStore";
import { useSocketStore } from "@/stores/socketStore";
import { EmitEvent } from "@/types/server";
import { AddStoryTab, Story } from "@/types/story";

import JiraImportTab from "./JiraImportTab";
import ManualImportTab from "./ManualImportTab";

interface AddStoryModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddStoryModal: React.FC<AddStoryModalProps> = ({ isOpen, setIsOpen }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [tab, setTab] = useState<string>(AddStoryTab.Manual);
  const {
    room: { integrations },
  } = useRoomStore();
  const emit = useSocketStore((state) => state.emit);

  const handleAddStories = (stories: Story[]) => {
    emit(EmitEvent.ImportStories, {
      stories: stories.map((x) => x.description),
    });
    setStories([]);
    setIsOpen(false);
  };

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
            onClick={() => handleAddStories(stories)}
            disabled={stories.length === 0}
            color="primary"
          >
            Add {stories.length} Stories
          </Button>
        </div>
      }
    >
      <div
        className={classNames("grid m-2 grid-cols-2", {
          hidden: !Boolean(integrations?.jira),
        })}
      >
        <Tabs tabs={tabs} activeTab={tab} setActiveTab={setTab} fullWidth />
      </div>
      <div className="p-4 h-72 overflow-y-scroll">
        <div className={tab !== AddStoryTab.Manual ? "hidden" : ""}>
          <ManualImportTab stories={stories} setStories={setStories} />
        </div>
        {integrations?.jira && (
          <div className={tab !== AddStoryTab.Jira ? "hidden" : ""}>
            <JiraImportTab
              integrationId={integrations.jira}
              setStories={setStories}
              isOpen={tab === AddStoryTab.Jira}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddStoryModal;
