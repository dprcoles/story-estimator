import React from "react";

import { Button, Modal } from "@/components/Core";

interface IncompleteStoryModalProps {
  onSubmit: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const IncompleteStoryModal: React.FC<IncompleteStoryModalProps> = ({
  onSubmit,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Modal
      open={isOpen}
      handleClose={() => setIsOpen(false)}
      showClose
      size="sm"
      heading={<div className="text-lg font-medium">Change Story</div>}
      footer={
        <div className="ml-auto">
          <Button
            onClick={() => setIsOpen(false)}
            color="default"
            className="mr-2"
          >
            Go Back
          </Button>
          <Button onClick={onSubmit} color="primary">
            Confirm
          </Button>
        </div>
      }
    >
      <div className="p-8">
        The current story has not been estimated yet. Are you sure you want to
        move on to the next story?
      </div>
    </Modal>
  );
};

export default IncompleteStoryModal;
