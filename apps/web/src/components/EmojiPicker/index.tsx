import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React from "react";

import { useThemeStore } from "@/stores/themeStore";

type EmojiPickerTheme = "auto" | "light" | "dark" | undefined;
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
  const { theme } = useThemeStore();

  const handleOnSelect = (emoji: any) => {
    onSelect(emoji.native);
  };

  return (
    <>
      {isOpen ? (
        <div
          className="emoji-picker__backdrop"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="emoji-picker__content"
          >
            <Picker
              data={data}
              theme={theme as EmojiPickerTheme}
              title="Pick your emoji..."
              emoji="point_up"
              onEmojiSelect={handleOnSelect}
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
