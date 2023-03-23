import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Button, Modal, Select, Switch } from "ui";
import {
  ADMIN_DESCRIPTION,
  COUNTDOWN_DESCRIPTION,
  FAST_MODE_DESCRIPTION,
} from "@/utils/constants";
import { RoomSettings } from "@/types/room";
import { PlayerInfo } from "@/types/player";
import { useRoomStore } from "@/stores/roomStore";

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
  const admin = useRoomStore((state) => state.admin);
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
    <Modal
      heading={<div className="text-lg font-medium">Room Settings</div>}
      open={isOpen}
      handleClose={() => setIsOpen(false)}
      showClose
      footer={
        <Button onClick={handleSave} style="primary">
          Save
        </Button>
      }
      size="md"
    >
      <div className="px-8 py-6">
        <Switch
          id="enableCountdown"
          label="Enable Countdown?"
          checked={localSettings?.countdown}
          setChecked={(checked) => handleSetValue(checked, "countdown")}
          description={COUNTDOWN_DESCRIPTION}
        />
        <Switch
          id="toggleFastMode"
          label="Toggle Fast Mode"
          checked={localSettings?.fastMode}
          setChecked={(checked) => handleSetValue(checked, "fastMode")}
          description={FAST_MODE_DESCRIPTION}
        />
        <Select
          label="Room Admin"
          onChange={(val) => handleSetValue(parseInt(val, 10), "admin")}
          option={players.map((p) => ({
            label: `${p.emoji} ${p.name}`,
            value: p.id.toString(),
          }))}
          value={(players.find((p) => p.id === admin)?.id || 0).toString()}
          description={ADMIN_DESCRIPTION}
        />
      </div>
    </Modal>
  );
};

export default RoomSettingsModal;
