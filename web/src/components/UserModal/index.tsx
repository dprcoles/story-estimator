import { PlayerType } from "@/types/player";
import React, { useEffect, useState } from "react";
import EmojiPicker from "../EmojiPicker";
import { IoMdClose } from "react-icons/io";
import Button, { ButtonStyle } from "../Button";
import { MdOutlineEdit } from "react-icons/md";

import "./index.css";

interface UserModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  name: string;
  emoji: string;
  type: PlayerType;
  updateUser: (name: string, emoji: string, type: PlayerType) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  setIsOpen,
  name,
  emoji,
  type,
  updateUser,
}) => {
  const [nameValue, setNameValue] = useState<string>(name);
  const [emojiValue, setEmojiValue] = useState<string>(
    emoji ?? type === PlayerType.Spectator ? "👀" : "🤔"
  );
  const [typeValue, setTypeValue] = useState<PlayerType>(type);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(name.length === 0);
    setNameValue(name);
    setEmojiValue(emoji);
    setTypeValue(type);
  }, [name, emoji, type, setIsOpen]);

  const handleSetEmoji = (e: string) => {
    setEmojiValue(e);
    setIsEmojiPickerOpen(false);
  };

  const handleSave = () => {
    updateUser(nameValue, emojiValue, typeValue);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <>
          <EmojiPicker
            isOpen={isEmojiPickerOpen}
            setIsOpen={setIsEmojiPickerOpen}
            onSelect={handleSetEmoji}
          />
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-dark-panels outline-none focus:outline-none">
                <div className="flex items-baseline justify-between p-5 border-b border-solid border-dark-buttons rounded-t">
                  <div className="text-lg font-medium">User Settings</div>
                  {name.length > 0 ? (
                    <button
                      onClick={() => setIsOpen(false)}
                      className="ml-auto rounded-full hover:bg-dark-hover w-10 h-10 flex items-center justify-center"
                    >
                      <span className="text-dark-text text-2xl">
                        <IoMdClose />
                      </span>
                    </button>
                  ) : null}
                </div>
                <div className="mx-auto pt-4">
                  <button
                    className="user-modal__emoji-button rounded-full w-16 h-16 flex justify-center items-center bg-dark-hover hover:bg-opacity-25"
                    onClick={() => setIsEmojiPickerOpen(true)}
                  >
                    <span className="emoji text-3xl font-bold">
                      {emojiValue}
                    </span>
                    <span className="opacity-0 edit-icon absolute">
                      <MdOutlineEdit size={25} />
                    </span>
                  </button>
                </div>
                <div className="py-4 px-6 flex-auto">
                  <input
                    className="p-4 border bg-dark-hover border-transparent hover:border-dark-border-color focus:border-white focus:outline-none w-full md:w-96 rounded-md"
                    value={nameValue}
                    onChange={e => setNameValue(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="pb-4 mx-auto">
                  <div className="flex space-x-2 bg-dark-hover rounded-full p-1">
                    <button
                      className={`text-sm font-medium px-4 py-2 rounded-full border ease-linear transition-all duration-150 ${
                        typeValue === PlayerType.Voter
                          ? "border-dark-border-color bg-dark-buttons"
                          : "border-transparent hover:bg-dark-buttons"
                      }`}
                      disabled={typeValue === PlayerType.Voter}
                      onClick={() => setTypeValue(PlayerType.Voter)}
                    >
                      Voter
                    </button>
                    <button
                      className={`text-sm font-medium px-4 py-2 rounded-full border ease-linear transition-all duration-150 ${
                        typeValue === PlayerType.Spectator
                          ? "border-dark-border-color bg-dark-buttons"
                          : "border-transparent hover:bg-dark-buttons"
                      }`}
                      disabled={typeValue === PlayerType.Spectator}
                      onClick={() => setTypeValue(PlayerType.Spectator)}
                    >
                      Spectator
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-dark-buttons rounded-b">
                  <Button
                    onClick={() => handleSave()}
                    disabled={
                      nameValue.replace(/^\s+|\s+$|\s+(?=\s)/g, "").length === 0
                    }
                    style={ButtonStyle.Primary}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-dark-background"></div>
        </>
      ) : null}
    </>
  );
};

export default UserModal;

