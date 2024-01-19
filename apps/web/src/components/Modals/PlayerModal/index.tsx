import "./index.css";

import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

import { createPlayer, updatePlayer } from "@/api/player";
import { Button, Modal } from "@/components/Core";
import EmojiPicker from "@/components/EmojiPicker";
import { PlayerInfo, PlayerType } from "@/types/player";

interface PlayerModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  player: PlayerInfo;
  setPlayer: (player: PlayerInfo) => void;
}

const PlayerModal = ({
  isOpen,
  setIsOpen,
  player,
  setPlayer,
}: PlayerModalProps) => {
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

  const handleUpdatePlayerInfo = async (
    name: string,
    emoji: string,
    playerType: PlayerType,
  ) => {
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

  return (
    <div>
      <EmojiPicker
        isOpen={isEmojiPickerOpen}
        setIsOpen={setIsEmojiPickerOpen}
        onSelect={handleSetEmoji}
      />
      <Modal
        open={isOpen}
        handleClose={() => setIsOpen(false)}
        showClose={name.length > 0}
        size="sm"
        heading={<div className="text-lg font-medium">Player Settings</div>}
        footer={
          <Button
            onClick={() => handleSave()}
            disabled={
              nameValue.replace(/^\s+|\s+$|\s+(?=\s)/g, "").length === 0
            }
            color="primary"
          >
            Save
          </Button>
        }
      >
        <div className="pt-4">
          <button
            className="user-modal__emoji-button bg-light-hover dark:bg-dark-hover mx-auto flex h-16 w-16 items-center justify-center rounded-full hover:bg-opacity-25"
            onClick={() => setIsEmojiPickerOpen(true)}
          >
            <span className="emoji text-3xl font-bold">{emojiValue}</span>
            <span className="edit-icon absolute opacity-0">
              <MdOutlineEdit size={25} />
            </span>
          </button>
        </div>
        <div className="flex items-center px-6 py-4">
          <input
            className="bg-light-hover dark:bg-dark-hover hover:border-dark-border-color dark:hover:border-dark-border-color mx-auto w-full rounded-md border border-transparent p-4 focus:border-black focus:outline-none md:w-96 dark:focus:border-white"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="mx-auto flex justify-center pb-4">
          <div className="bg-light-hover dark:bg-dark-hover flex space-x-2 rounded-full p-1">
            <button
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150 ease-linear ${
                typeValue === PlayerType.Voter
                  ? "border-light-border-color dark:border-dark-border-color bg-light-buttons dark:bg-dark-buttons"
                  : "hover:bg-light-buttons dark:hover:bg-dark-buttons border-transparent"
              }`}
              disabled={typeValue === PlayerType.Voter}
              onClick={() => setTypeValue(PlayerType.Voter)}
            >
              Voter
            </button>
            <button
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150 ease-linear ${
                typeValue === PlayerType.Spectator
                  ? "border-light-border-color dark:border-dark-border-color bg-light-buttons dark:bg-dark-buttons"
                  : "hover:bg-light-buttons dark:hover:bg-dark-buttons border-transparent"
              }`}
              disabled={typeValue === PlayerType.Spectator}
              onClick={() => setTypeValue(PlayerType.Spectator)}
            >
              Spectator
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PlayerModal;
