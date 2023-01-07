import { PlayerInfo } from "./player";

export type Story = {
  id: string;
  roomId: string;
  description: string;
  active: boolean;
  startSeconds: number | undefined;
  endSeconds: number | undefined;
  estimate: string | undefined;
  totalTimeSpent: number | undefined;
  spectatorIds: string[];
  voterIds: string[];
  votes: Vote[];
};

type Vote = {
  playerId: string;
  vote?: string;
};

export interface StoryDetails {
  id: string;
  description: string;
  startSeconds: number | null;
  endSeconds: number | null;
  estimate: string | null;
  voters: PlayerInfo[];
  spectators: PlayerInfo[];
  votes: Vote[];
  totalTimeSpent: number | null;
  sessionId: string;
}

