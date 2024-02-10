import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";

import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@/components/Core";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/Core";
import { useRoomStore } from "@/stores/roomStore";
import { useSocketStore } from "@/stores/socketStore";
import { CountdownStatus } from "@/types/countdown";
import { PlayerType } from "@/types/player";
import { RoomSettings } from "@/types/room";
import { EmitEvent } from "@/types/server";
import { ADMIN_DESCRIPTION, COUNTDOWN_DESCRIPTION, FAST_MODE_DESCRIPTION } from "@/utils/constants";

const RoomSettingsSheet = () => {
  const {
    room: { settings },
    players,
    admin,
    countdown,
    showVotes,
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
    }
  };

  const currentAdmin = (players.find((p) => p.id === admin?.id)?.id || 0).toString();
  const spectators = players.filter((p) => p.defaultType === PlayerType.Spectator);
  const voters = players.filter((p) => p.defaultType === PlayerType.Voter);

  return (
    <>
      <Sheet>
        <SheetTrigger
          className="hocus:bg-neutral-200 dark:hocus:bg-zinc-800 rounded-md p-2 ring-offset-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-black dark:focus-visible:ring-pink-500"
          disabled={countdown.status === CountdownStatus.STARTED || showVotes}
        >
          <FiSettings className="m-0 text-xl text-black dark:text-white" />
        </SheetTrigger>
        <SheetContent className="bg-neutral-100 dark:bg-zinc-900">
          <SheetHeader>
            <SheetTitle>Room Settings</SheetTitle>
            <SheetDescription>Update the current settings of the room.</SheetDescription>
          </SheetHeader>
          <div className="py-6">
            <div className="flex gap-4">
              <Switch
                id="enableCountdown"
                checked={localSettings?.countdown}
                onCheckedChange={(checked) => handleSetValue(checked, "countdown")}
              />
              <label htmlFor="enableCountdown">Enable Countdown?</label>
            </div>
            <div className="mb-4 mt-2 text-sm">{COUNTDOWN_DESCRIPTION}</div>
            <div className="flex gap-4">
              <Switch
                id="toggleFastMode"
                checked={localSettings?.fastMode}
                onCheckedChange={(checked) => handleSetValue(checked, "fastMode")}
              />
              <label htmlFor="toggleFastMode">Toggle Fast Mode</label>
            </div>
            <div className="mb-4 mt-2 text-sm">{FAST_MODE_DESCRIPTION}</div>
            <label htmlFor="admin-select">Room Admin</label>
            <div className="my-2">{ADMIN_DESCRIPTION}</div>
            <Select
              onValueChange={(val) => handleSetValue(parseInt(val, 10), "admin")}
              value={currentAdmin}
              defaultValue={currentAdmin}
            >
              <SelectTrigger id="admin-select" className="w-[180px]">
                <SelectValue placeholder="Select a participant..." />
              </SelectTrigger>
              <SelectContent>
                {spectators.length > 0 && (
                  <SelectGroup>
                    <SelectLabel>Spectators</SelectLabel>
                    {spectators.map((p) => (
                      <SelectItem key={p.id} value={p.id.toString()}>
                        {p.emoji} {p.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )}
                <SelectGroup>
                  <SelectLabel>Voters</SelectLabel>
                  {voters.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.emoji} {p.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button disabled={!localSettings} onClick={handleSave} variant="default" fullWidth>
                Save
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default RoomSettingsSheet;
