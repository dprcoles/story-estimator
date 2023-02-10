import { PlayerInfo } from "./player";
import { StoryDetails } from "./story";

export interface ISessionByIdParams {
  id: number;
}

export interface ICreateSessionBody {
  teamId: number;
  name: string;
}

export interface SessionDetails {
  id: number;
  name: string;
  players: PlayerInfo[];
  stories: StoryDetails[];
}

