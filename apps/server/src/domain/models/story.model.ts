export class Story {
  id: number;
  order?: number;
  roomId: number;
  description: string;
  active: boolean;
  startSeconds: number | undefined;
  endSeconds: number | undefined;
  estimate: string | undefined;
  totalTimeSpent: number | undefined;
  sessionId?: number;
  spectatorIds: number[];
  voterIds: number[];
  votes: Vote[];
}

export type Vote = {
  playerId: number;
  vote?: string;
};
