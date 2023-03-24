import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateStoryCommand } from "./commands/create-story.command";

@Injectable()
export class StoryService {
  constructor(private commandBus: CommandBus) {}

  async createAsync(data: CreateStoryCommand) {
    const command = new CreateStoryCommand(
      data.description,
      data.startSeconds,
      data.endSeconds,
      data.estimate,
      data.totalTimeSpent,
      data.sessionId,
      data.votes,
      data.spectatorIds,
    );

    await this.commandBus.execute(command);
  }
}
