import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StoryRepository } from "src/infrastructure/repositories/story.repository";
import { Vote } from "../../../domain/models/story.model";

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

@CommandHandler(CreateStoryCommand)
export class CreateStoryHandler implements ICommandHandler<CreateStoryCommand, void> {
  constructor(private repository: StoryRepository) {}

  async execute(command: CreateStoryCommand) {
    await this.repository.createAsync(command);
  }
}
