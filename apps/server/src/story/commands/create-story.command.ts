import { Vote } from "../interfaces/story.interface";

export class CreateStoryCommand {
  constructor(
    public readonly description: string,
    public readonly startSeconds: number,
    public readonly endSeconds: number,
    public readonly estimate: string,
    public readonly totalTimeSpent: number,
    public readonly sessionId: number,
    public readonly votes: Vote[],
    public readonly spectatorIds: number[],
  ) {}
}
