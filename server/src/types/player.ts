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

export interface ICreatePlayerBody {
  name: string;
  defaultType: PlayerType;
  emoji: string;
}

export interface IPlayerByIdParams {
  id: string;
}

export interface IUpdatePlayerBody extends ICreatePlayerBody {}

export interface IUpdatePlayerParams extends IPlayerByIdParams {}
