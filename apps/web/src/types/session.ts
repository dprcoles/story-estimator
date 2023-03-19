import { PlayerInfo } from "./player";
import { StoryDetails } from "./story";

export interface SessionDetails {
  id: number;
  name: string;
  teamId: number;
  players: PlayerInfo[];
  stories: StoryDetails[];
}
