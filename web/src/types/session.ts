import { PlayerInfo } from "./player";
import { StoryDetails } from "./story";

export interface SessionDetails {
  id: string;
  players: PlayerInfo[];
  stories: StoryDetails[];
}

