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
