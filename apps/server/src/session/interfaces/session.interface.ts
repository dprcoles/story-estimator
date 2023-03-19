import { Player } from "src/player/interfaces/player.interface";

export interface Session {
  id: number;
  name: string;
  teamId: number;
  players: Player[];
  stories: StoryDetails[];
}

type Vote = {
  playerId: number;
  vote?: string;
};

type StoryDetails = {
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