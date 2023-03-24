import { Vote } from "../../interfaces/story.interface";

export type CreateStoryRequest = {
  description: string;
  startSeconds: number;
  endSeconds: number;
  estimate: string;
  totalTimeSpent: number;
  sessionId: number;
  votes: Vote[];
  spectatorIds: number[];
};
