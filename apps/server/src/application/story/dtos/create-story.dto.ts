export class CreateStoryDto {
  description: string;
  startSeconds: number;
  endSeconds: number;
  estimate: string;
  totalTimeSpent: number;
  sessionId: number;
  votes: {
    playerId: number;
    vote?: string;
  }[];
  spectatorIds: number[];
}
