import { useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from "@/components/Core";
import { usePlayerStore } from "@/stores/playerStore";

interface CreateSessionFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleCreateSession: (name: string) => void;
}

const CreateSessionModal = ({ isOpen, setIsOpen, handleCreateSession }: CreateSessionFormProps) => {
  const [name, setName] = useState<string>("");
  const { isPlayerModalOpen } = usePlayerStore((state) => state);

  const handleOnCreate = async () => {
    handleCreateSession(name);
    setIsOpen(false);
  };

  if (!isOpen || isPlayerModalOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)} modal>
      <DialogContent hasCoveredBackdrop>
        <DialogHeader>
          <DialogTitle>Create Session</DialogTitle>
        </DialogHeader>
        <div className="my-8 flex-auto">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name for your session"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => handleOnCreate()}
            disabled={name.replace(/^\s+|\s+$|\s+(?=\s)/g, "").length === 0}
            variant="default"
            fullWidth
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSessionModal;
