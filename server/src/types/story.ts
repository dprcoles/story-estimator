import { PlayerInfo } from "./player";

export type Story = {
  id: number;
  roomId: number;
  description: string;
  active: boolean;
  startSeconds: number | undefined;
  endSeconds: number | undefined;
  estimate: string | undefined;
  totalTimeSpent: number | undefined;
  spectatorIds: number[];
  voterIds: number[];
  votes: Vote[];
};

type Vote = {
  playerId: number;
  vote?: string;
};

export interface StoryDetails {
  id: number;
  description: string;
  startSeconds: number | null;
  endSeconds: number | null;
  estimate: string | null;
  voters: PlayerInfo[];
  spectators: PlayerInfo[];
  votes: Vote[];
  totalTimeSpent: number | null;
  sessionId: number;
}
