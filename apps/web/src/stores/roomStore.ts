import { create } from "zustand";

import {
  CountdownStatus,
  CountdownTimer,
  CountdownType,
} from "@/types/countdown";
import { Player } from "@/types/player";
import { Room } from "@/types/room";
import { Story } from "@/types/story";
import { DEFAULT_TEAM_ID } from "@/utils/constants";

import { usePlayerStore } from "./playerStore";

const DEFAULT_ROOM: Room = {
  id: 0,
  name: "",
  active: false,
  integrations: {},
  settings: {
    admin: 0,
    countdown: true,
    fastMode: false,
  },
  stories: [],
  teamId: DEFAULT_TEAM_ID,
};

export type Countdown = {
  timer: number;
  type: CountdownType;
  status: CountdownStatus;
};

type RoomStore = {
  room: Room;
  setRoom: (room: Room) => void;
  setStories: (stories: Story[]) => void;
  players: Player[];
  setPlayers: (players: Player[]) => void;
  showVotes: boolean;
  setShowVotes: (showVotes: boolean) => void;
  countdown: Countdown;
  setCountdown: (countdown: Countdown) => void;
  admin: number;
  isAdmin: boolean;
};

export const useRoomStore = create<RoomStore>(
  (set): RoomStore => ({
    room: DEFAULT_ROOM,
    setRoom: (room: Room) =>
      set((state) => ({
        ...state,
        room,
        admin: room.settings.admin,
        isAdmin: room.settings.admin === usePlayerStore.getState().player.id,
      })),
    setStories: (stories: Story[]) =>
      set((state) => ({
        ...state,
        room: { ...state.room, stories: stories },
      })),
    players: [],
    setPlayers: (players: Player[]) => set((state) => ({ ...state, players })),
    showVotes: false,
    setShowVotes: (showVotes: boolean) =>
      set((state) => ({ ...state, showVotes })),
    countdown: {
      timer: CountdownTimer.Standard,
      status: CountdownStatus.STOPPED,
      type: CountdownType.Standard,
    },
    setCountdown: (countdown: Countdown) =>
      set((state) => ({ ...state, countdown })),
    admin: 0,
    isAdmin: false,
  }),
);
