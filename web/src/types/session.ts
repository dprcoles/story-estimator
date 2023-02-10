import { PlayerInfo } from "./player";
import { StoryDetails } from "./story";

export interface SessionDetails {
  id: number;
  players: PlayerInfo[];
  stories: StoryDetails[];
}

