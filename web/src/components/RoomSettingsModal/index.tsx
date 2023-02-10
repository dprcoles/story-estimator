import { PlayerInfo } from "@/types/player";
import { RoomSettings } from "@/types/room";
import {
  ADMIN_DESCRIPTION,
  COUNTDOWN_DESCRIPTION,
  FAST_MODE_DESCRIPTION,
} from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button, { ButtonStyle } from "../Button";
import Select from "../Select";
import ToggleButton from "../ToggleButton";

interface RoomSettingsModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  settings: RoomSettings;
  setSettings: (settings: RoomSettings) => void;
  players: PlayerInfo[];
}

const RoomSettingsModal: React.FC<RoomSettingsModalProps> = ({
  isOpen,
  setIsOpen,
  settings,
  setSettings,
  players,
}) => {
  const [localSettings, setLocalSettings] = useState<RoomSettings>();

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSetValue = (val: any, property: string) => {
    setLocalSettings({ ...localSettings, [property]: val } as RoomSettings);
  };

  const handleSave = () => {
    if (localSettings) {
      setSettings(localSettings);
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-light-panels dark:bg-dark-panels outline-none focus:outline-none">
                <div className="flex items-baseline justify-between p-5 border-b border-solid border-light-buttons dark:border-dark-buttons rounded-t">
                  <div className="text-lg font-medium">Room Settings</div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-auto rounded-full hover:bg-light-hover dark:hover:bg-dark-hover w-10 h-10 flex items-center justify-center"
                  >
                    <span className="text-light-text dark:text-dark-text text-2xl">
                      <IoMdClose />
                    </span>
                  </button>
                </div>
                <div className="relative px-8 py-6 flex-auto">
                  <ToggleButton
                    id="enableCountdown"
                    label="Enable Countdown?"
                    checked={localSettings?.countdown}
                    setChecked={checked => handleSetValue(checked, "countdown")}
                    description={COUNTDOWN_DESCRIPTION}
                  />
                  <ToggleButton
                    id="toggleFastMode"
                    label="Toggle Fast Mode"
                    checked={localSettings?.fastMode}
                    setChecked={checked => handleSetValue(checked, "fastMode")}
                    description={FAST_MODE_DESCRIPTION}
                  />
                  <Select
                    label="Room Admin"
                    onChange={val => handleSetValue(parseInt(val, 10), "admin")}
                    option={players.map(p => ({
                      label: `${p.emoji} ${p.name}`,
                      value: p.id.toString(),
                    }))}
                    value={(players.find(p => p.admin)?.id || 0).toString()}
                    description={ADMIN_DESCRIPTION}
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-light-buttons dark:border-dark-buttons rounded-b">
                  <Button onClick={handleSave} style={ButtonStyle.Primary}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default RoomSettingsModal;

