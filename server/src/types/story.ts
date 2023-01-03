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

