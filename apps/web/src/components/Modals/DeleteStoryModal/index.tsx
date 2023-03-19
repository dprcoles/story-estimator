import React from "react";
import { Button, Modal } from "ui";
import { Story } from "@/types/story";

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
    <Modal
      open={isOpen}
      handleClose={() => setIsOpen(false)}
      showClose
      size="sm"
      heading={<div className="text-lg font-medium">Delete Story</div>}
      footer={
        <div className="ml-auto">
          <Button onClick={() => onDelete(story.id)} style="danger">
            Delete story
          </Button>
        </div>
      }
    >
      <div className="p-8">
        Are you sure you want to delete story{" "}
        <span className="font-bold">{story.description}</span>?
      </div>
    </Modal>
  );
};

export default DeleteStoryModal;
