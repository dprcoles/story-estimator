import "emoji-mart/css/emoji-mart.css";
import React from "react";
import { EmojiData, Picker } from "emoji-mart";

interface EmojiPickerProps {
  onSelect: (e: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onSelect,
  isOpen,
  setIsOpen,
}) => {
  const handleOnSelect = (e: EmojiData) => {
    // @ts-ignore
    const sym = e.unified.split("-");
    const codesArray: string[] = [];

    sym.forEach((el: string) => codesArray.push("0x" + el));
    // @ts-ignore
    const emoji = String.fromCodePoint(...codesArray);
    onSelect(emoji);
  };

  return (
    <>
      {isOpen ? (
        <div
          className="emoji-picker__backdrop"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="emoji-picker__content"
          >
            <Picker
              theme="dark"
              title="Pick your emoji..."
              emoji="point_up"
              onSelect={handleOnSelect}
              autoFocus
            />
          </div>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};

export default EmojiPicker;

