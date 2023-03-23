import { PlayerInfo } from "./player";
import { StoryDetails } from "./story";
import { Team } from "./team";

export interface SessionDetails {
  id: number;
  name: string;
  players: PlayerInfo[];
  stories: StoryDetails[];
  team: Team;
}
