import { PlayerInfo } from "./player";
import { StoryDetails } from "./story";

export interface ISessionByIdParams {
  id: string;
}

export interface SessionDetails {
  id: string;
  players: PlayerInfo[];
  stories: StoryDetails[];
}

