import { PlayerInfo } from "./player";
import { StoryDetails } from "./story";

export interface ISessionByIdParams {
  id: string;
}

export interface ICreateSessionBody {
  teamId: string;
  name: string;
}

export interface SessionDetails {
  id: string;
  name: string;
  players: PlayerInfo[];
  stories: StoryDetails[];
}

