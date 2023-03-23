import React, { useEffect, useState } from "react";
import { Button, Modal } from "ui";
import { MdOutlineEdit } from "react-icons/md";
import EmojiPicker from "@/components/EmojiPicker";
import { PlayerInfo, PlayerType } from "@/types/player";
import { createPlayer, updatePlayer } from "@/api/player";

import "./index.css";

interface PlayerModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  player: PlayerInfo;
  setPlayer: (player: PlayerInfo) => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({
  isOpen,
  setIsOpen,
  player,
  setPlayer,
}) => {
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
            style="primary"
          >
            Save
          </Button>
        }
      >
        <div className="pt-4">
          <button
            className="mx-auto user-modal__emoji-button rounded-full w-16 h-16 flex justify-center items-center bg-light-hover dark:bg-dark-hover hover:bg-opacity-25"
            onClick={() => setIsEmojiPickerOpen(true)}
          >
            <span className="emoji text-3xl font-bold">{emojiValue}</span>
            <span className="opacity-0 edit-icon absolute">
              <MdOutlineEdit size={25} />
            </span>
          </button>
        </div>
        <div className="flex py-4 px-6 items-center">
          <input
            className="mx-auto p-4 border bg-light-hover dark:bg-dark-hover border-transparent hover:border-dark-border-color dark:hover:border-dark-border-color focus:border-black dark:focus:border-white focus:outline-none w-full md:w-96 rounded-md"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="flex justify-center pb-4 mx-auto">
          <div className="flex space-x-2 bg-light-hover dark:bg-dark-hover rounded-full p-1">
            <button
              className={`text-sm font-medium px-4 py-2 rounded-full border ease-linear transition-all duration-150 ${
                typeValue === PlayerType.Voter
                  ? "border-light-border-color dark:border-dark-border-color bg-light-buttons dark:bg-dark-buttons"
                  : "border-transparent hover:bg-light-buttons dark:hover:bg-dark-buttons"
              }`}
              disabled={typeValue === PlayerType.Voter}
              onClick={() => setTypeValue(PlayerType.Voter)}
            >
              Voter
            </button>
            <button
              className={`text-sm font-medium px-4 py-2 rounded-full border ease-linear transition-all duration-150 ${
                typeValue === PlayerType.Spectator
                  ? "border-light-border-color dark:border-dark-border-color bg-light-buttons dark:bg-dark-buttons"
                  : "border-transparent hover:bg-light-buttons dark:hover:bg-dark-buttons"
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
