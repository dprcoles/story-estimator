export type Story = {
  id: string;
  roomId: string;
  description: string;
  active: boolean;
  startSeconds: number | undefined;
  endSeconds: number | undefined;
  totalTimeSpent: number | undefined;
  vote: string | undefined;
};

