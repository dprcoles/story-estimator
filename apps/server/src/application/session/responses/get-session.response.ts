import { Player } from "src/domain/models/player.model";
import { SessionTeam, StoryDetails } from "src/domain/models/session.model";

export class GetSessionResponse {
  id: number;
  name: string;
  players: Player[];
  stories: StoryDetails[];
  team: SessionTeam;
}
