export type Story = {
  id: string;
  roomId: string;
  description: string;
  active: boolean;
  startSeconds: number | undefined;
  endSeconds: number | undefined;
  vote: string | undefined;
  totalTimeSpent: number | undefined;
};

