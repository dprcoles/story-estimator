export enum PlayerType {
  Voter = "voter",
  Spectator = "spectator",
}

export type Player = {
  id: string;
  name: string;
  type: PlayerType;
  roomId: string | string[];
  vote: string | undefined;
};

