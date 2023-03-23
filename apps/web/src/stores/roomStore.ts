import { create } from "zustand";
import { Room } from "@/types/room";
import { usePlayerStore } from "./playerStore";

type RoomStore = {
  room: Room | null;
  setRoom: (room: Room) => void;
  admin: number;
  isAdmin: boolean;
};

export const useRoomStore = create<RoomStore>(
  (set, get): RoomStore => ({
    room: null,
    setRoom: (room: Room) =>
      set((state) => ({
        ...state,
        room,
        admin: room.settings.admin,
        isAdmin: room.settings.admin === usePlayerStore.getState().player.id,
      })),
    admin: 0,
    isAdmin: false,
  }),
);
