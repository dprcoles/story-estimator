export enum PlayerType {
  Voter = "voter",
  Spectator = "spectator",
}

export type Player = {
  id: string;
  name: string;
  type: PlayerType;
  emoji: string;
  roomId: string | string[];
  vote: string | undefined;
};

