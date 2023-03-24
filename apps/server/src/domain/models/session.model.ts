import { Player } from "src/domain/models/player.model";

export class Session {
  id: number;
  name: string;
  players: Player[];
  stories: StoryDetails[];
  team: SessionTeam;
}

type Vote = {
  playerId: number;
  vote?: string;
};

export type StoryDetails = {
  id: number;
  description: string;
  startSeconds: number | null;
  endSeconds: number | null;
  estimate: string | null;
  voters: Player[];
  spectators: Player[];
  votes: Vote[];
  totalTimeSpent: number | null;
  sessionId: number;
};

export type SessionTeam = {
  id: number;
  name: string;
  alias: string;
  organisationId: number;
};
