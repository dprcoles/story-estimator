import { create } from "zustand";

import { PlayerInfo, PlayerType } from "@/types/player";

type PlayerStore = {
  player: PlayerInfo;
  setPlayer: (player: PlayerInfo) => void;
  isPlayerModalOpen: boolean;
  setIsPlayerModalOpen: (isPlayerModalOpen: boolean) => void;
  vote: string;
  setVote: (vote: string) => void;
};

export const usePlayerStore = create<PlayerStore>(
  (set, get): PlayerStore => ({
    player: { id: 0, emoji: "", name: "", defaultType: PlayerType.Voter },
    setPlayer: (player: PlayerInfo) => set((state) => ({ ...state, player })),
    isPlayerModalOpen: false,
    setIsPlayerModalOpen: (isPlayerModalOpen: boolean) =>
      set((state) => ({ ...state, isPlayerModalOpen })),
    vote: "",
    setVote: (vote: string) => set((state) => ({ ...state, vote })),
  }),
);
