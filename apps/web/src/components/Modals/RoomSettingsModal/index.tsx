import React, { useEffect, useState } from "react";

import { Button, Modal, Select, Switch } from "@/components/Core";
import { useRoomStore } from "@/stores/roomStore";
import { useSocketStore } from "@/stores/socketStore";
import { RoomSettings } from "@/types/room";
import { EmitEvent } from "@/types/server";
import {
  ADMIN_DESCRIPTION,
  COUNTDOWN_DESCRIPTION,
  FAST_MODE_DESCRIPTION,
} from "@/utils/constants";

interface RoomSettingsModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const RoomSettingsModal: React.FC<RoomSettingsModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const {
    room: { settings },
    players,
    admin,
  } = useRoomStore();
  const emit = useSocketStore((state) => state.emit);

  const [localSettings, setLocalSettings] = useState<RoomSettings>();

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSetValue = (val: any, property: string) => {
    setLocalSettings({ ...localSettings, [property]: val } as RoomSettings);
  };

  const handleSave = () => {
    if (localSettings) {
      emit(EmitEvent.Settings, { settings: localSettings });
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
        <Button disabled={!localSettings} onClick={handleSave} color="primary">
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
