export enum PlayerType {
  Voter = "voter",
  Spectator = "spectator",
}

export type Player = {
  id: number;
  name: string;
  type: PlayerType;
  emoji: string;
  admin: boolean;
  roomId: number | number[];
  vote: string | undefined;
};

export interface PlayerInfo {
  id: number;
  emoji: string;
  name: string;
  type: PlayerType;
}

export interface ICreatePlayerBody {
  name: string;
  defaultType: PlayerType;
  emoji: string;
}

export interface IPlayerByIdParams {
  id: number;
}

export interface IUpdatePlayerBody extends ICreatePlayerBody {}

export interface IUpdatePlayerParams extends IPlayerByIdParams {}

