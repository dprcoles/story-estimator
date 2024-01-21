import React from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Core";
import { Story } from "@/types/story";

interface DeleteStoryModalProps {
  story: Story;
  onDelete: (id: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DeleteStoryModal = ({ story, onDelete, isOpen, setIsOpen }: DeleteStoryModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Story</DialogTitle>
        </DialogHeader>
        <div className="my-4">
          Are you sure you want to delete story{" "}
          <span className="font-bold">{story.description}</span>?
        </div>
        <DialogFooter>
          <div className="ml-auto flex gap-2">
            <Button onClick={() => setIsOpen(false)} variant="ghost">
              Cancel
            </Button>
            <Button onClick={() => onDelete(story.id)} variant="destructive">
              Delete story
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteStoryModal;
