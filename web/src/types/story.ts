export type Story = {
  id: string;
  roomId: string;
  description: string;
  startSeconds: number;
  endSeconds: number | undefined;
  vote: string | undefined;
};

