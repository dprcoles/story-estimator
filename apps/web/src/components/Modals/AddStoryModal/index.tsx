import { useState } from "react";

import { TabsContent, TabsList, TabsTrigger } from "@/components/Core";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Tabs,
} from "@/components/Core";
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

const AddStoryModal = ({ isOpen, setIsOpen }: AddStoryModalProps) => {
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
  ];

  if (Boolean(integrations?.jira)) {
    tabs.push({
      id: AddStoryTab.Jira,
      label: "Jira",
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Stories</DialogTitle>
          <DialogDescription>Add stories to estimate in this session.</DialogDescription>
        </DialogHeader>
        {tabs.length > 1 ? (
          <Tabs
            defaultValue={AddStoryTab.Manual}
            value={tab}
            onValueChange={(tab) => setTab(tab)}
            className="w-full"
          >
            <TabsList className="w-full">
              {tabs.map((tab) => (
                <TabsTrigger className="w-full" key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={AddStoryTab.Manual}>
              <div className="h-72 overflow-y-scroll py-4">
                <ManualImportTab stories={stories} setStories={setStories} />
              </div>
            </TabsContent>
            <TabsContent value={AddStoryTab.Jira}>
              <div className="h-72 overflow-y-scroll py-4">
                <JiraImportTab
                  integrationId={integrations?.jira ?? undefined}
                  setStories={setStories}
                  isOpen={tab === AddStoryTab.Jira}
                />
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="h-72 overflow-y-scroll py-4">
            <ManualImportTab stories={stories} setStories={setStories} />
          </div>
        )}
        <DialogFooter>
          <div className="ml-auto">
            {stories.length > 0 && (
              <Button
                onClick={() => handleAddStories(stories)}
                disabled={stories.length === 0}
                variant="default"
              >
                Add {stories.length} Stor{stories.length === 1 ? "y" : "ies"}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStoryModal;
