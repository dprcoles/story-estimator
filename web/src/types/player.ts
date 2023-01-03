export enum PlayerType {
  Voter = "voter",
  Spectator = "spectator",
}

export interface PlayerInfo {
  id: string;
  emoji: string;
  name: string;
  type: PlayerType;
}

export interface Player extends PlayerInfo {
  vote: string;
  roomId: string;
}

