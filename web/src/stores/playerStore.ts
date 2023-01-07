import { PlayerInfo, PlayerType } from "@/types/player";
import create from "zustand";

type PlayerStore = {
  player: PlayerInfo;
  setPlayer: (player: PlayerInfo) => void;
};

export const usePlayerStore = create<PlayerStore>(
  (set, get): PlayerStore => ({
    player: { id: "", emoji: "", name: "", type: PlayerType.Voter },
    setPlayer: (player: PlayerInfo) => set(state => ({ ...state, player })),
  })
);

