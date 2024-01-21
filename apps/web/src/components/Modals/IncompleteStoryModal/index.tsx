import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Core";

interface IncompleteStoryModalProps {
  onSubmit: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const IncompleteStoryModal = ({ onSubmit, isOpen, setIsOpen }: IncompleteStoryModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Incomplete Story</DialogTitle>
        </DialogHeader>
        <div className="p-8">
          The current story has not been estimated yet. Are you sure you want to move on to the next
          story?
        </div>
        <DialogFooter>
          <div className="ml-auto">
            <Button onClick={() => setIsOpen(false)} variant="outline" className="mr-2">
              Go Back
            </Button>
            <Button onClick={onSubmit} variant="default">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IncompleteStoryModal;
