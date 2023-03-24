import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateStoryCommand } from "./commands/create-story.command";
import { CreateStoryRequest } from "./models/requests/create-story.request";

@Injectable()
export class StoryService {
  constructor(private commandBus: CommandBus) {}

  async createAsync(data: CreateStoryRequest) {
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

    return await this.commandBus.execute(command);
  }
}
