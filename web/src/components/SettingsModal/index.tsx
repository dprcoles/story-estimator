import { Settings } from "@/types/room";
import {
  COUNTDOWN_DESCRIPTION,
  FAST_MODE_DESCRIPTION,
} from "@/utils/constants";
import React, { useEffect, useState } from "react";
import ToggleButton from "../ToggleButton";

interface SettingsModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  setIsOpen,
  settings,
  setSettings,
}) => {
  const [localSettings, setLocalSettings] = useState<Settings>();

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSetValue = (val: any, property: string) => {
    setLocalSettings({ ...localSettings, [property]: val } as Settings);
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
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-dark-secondary outline-none focus:outline-none">
                <div className="flex items-start justify-between px-8 py-6 border-b border-solid border-light-secondary dark:border-dark-primary rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Update room settings
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="bg-transparent text-black dark:text-white opacity-10 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
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
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-light-primary dark:border-dark-primary rounded-b">
                  <button
                    className="bg-light-main active:bg-light-main dark:bg-dark-main dark:active:bg-dark-main text-white dark:text-black px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 disabled:opacity-25"
                    type="button"
                    onClick={handleSave}
                  >
                    Save
                  </button>
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

export default SettingsModal;

