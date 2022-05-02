export enum PlayerType {
  Voter = "voter",
  Spectator = "spectator",
}

export interface Player {
  id: string;
  name: string;
  vote: string;
  roomId: string;
  type: PlayerType;
  emoji: string;
}
