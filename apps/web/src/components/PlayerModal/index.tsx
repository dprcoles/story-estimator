import "./index.css";

import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

import { createPlayer, updatePlayer } from "@/api/player";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from "@/components/Core";
import EmojiPicker from "@/components/EmojiPicker";
import { PlayerInfo, PlayerType } from "@/types/player";

interface PlayerFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  player: PlayerInfo;
  setPlayer: (player: PlayerInfo) => void;
}

const PlayerModal = ({ isOpen, setIsOpen, player, setPlayer }: PlayerFormProps) => {
  const [nameValue, setNameValue] = useState<string>(player.name);
  const [emojiValue, setEmojiValue] = useState<string>(player.emoji);
  const [typeValue, setTypeValue] = useState<PlayerType>(player.defaultType);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);

  const { name, emoji, defaultType: type } = player;

  useEffect(() => {
    setNameValue(name);
    setEmojiValue(emoji.length === 0 ? "😎" : emoji);
    setTypeValue(type);
  }, [name, emoji, type]);

  const handleSetEmoji = (e: string) => {
    setEmojiValue(e);
    setIsEmojiPickerOpen(false);
  };

  const handleUpdatePlayerInfo = async (name: string, emoji: string, playerType: PlayerType) => {
    if (player.id) {
      await updatePlayer(player.id, {
        defaultType: playerType,
        emoji,
        name,
      });
      setPlayer({ id: player.id, emoji, name, defaultType: playerType });
      return;
    }

    const newPlayer = await createPlayer({
      defaultType: playerType,
      emoji,
      name,
    });
    setPlayer({ id: newPlayer.id, emoji, name, defaultType: playerType });
  };

  const handleSave = async () => {
    await handleUpdatePlayerInfo(nameValue, emojiValue, typeValue);
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(isOpen) => (!player.id ? null : setIsOpen(isOpen))}
        modal
      >
        <DialogContent hasCoveredBackdrop>
          <DialogHeader>
            <DialogTitle>Player Settings</DialogTitle>
            <DialogDescription>
              Customize your name, emoji and default role for sessions.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4">
            <EmojiPicker
              isOpen={isEmojiPickerOpen}
              setIsOpen={setIsEmojiPickerOpen}
              onSelect={handleSetEmoji}
            />
            <button
              className="user-modal__emoji-button hocus:bg-opacity-25 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-200 dark:bg-zinc-800"
              onClick={() => setIsEmojiPickerOpen(true)}
            >
              <span className="emoji text-3xl font-bold">{emojiValue}</span>
              <span className="edit-icon absolute opacity-0">
                <MdOutlineEdit size={25} />
              </span>
            </button>
          </div>
          <div className="flex items-center py-4">
            <Input
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="mx-auto flex justify-center pb-4">
            <div className="flex space-x-2 rounded-full bg-neutral-200 p-1 dark:bg-zinc-800">
              <button
                className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-150 ease-linear ${
                  typeValue === PlayerType.Voter
                    ? "border-blue-400 bg-neutral-100 dark:border-pink-500 dark:bg-zinc-900"
                    : "hocus:bg-neutral-100 dark:hocus:bg-zinc-900 border-transparent"
                }`}
                disabled={typeValue === PlayerType.Voter}
                onClick={() => setTypeValue(PlayerType.Voter)}
              >
                Voter
              </button>
              <button
                className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-150 ease-linear ${
                  typeValue === PlayerType.Spectator
                    ? "border-blue-400 bg-neutral-100 dark:border-pink-500 dark:bg-zinc-900"
                    : "hocus:bg-neutral-100 dark:hocus:bg-zinc-900 border-transparent"
                }`}
                disabled={typeValue === PlayerType.Spectator}
                onClick={() => setTypeValue(PlayerType.Spectator)}
              >
                Spectator
              </button>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => handleSave()}
              disabled={nameValue.replace(/^\s+|\s+$|\s+(?=\s)/g, "").length === 0}
              variant="default"
              fullWidth
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlayerModal;
