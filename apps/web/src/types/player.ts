export enum PlayerType {
  Voter = "voter",
  Spectator = "spectator",
}

export interface PlayerInfo {
  id: number;
  emoji: string;
  name: string;
  defaultType: PlayerType;
}

export interface Player extends PlayerInfo {
  vote: string;
  roomId: number;
}
