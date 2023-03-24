import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { StoryRepository } from "src/story/story.repository";
import { CreateStoryCommand } from "../create-story.command";

@CommandHandler(CreateStoryCommand)
export class CreateStoryHandler implements ICommandHandler<CreateStoryCommand> {
  constructor(private repository: StoryRepository) {}

  async execute(command: CreateStoryCommand) {
    return await this.repository.createAsync(command);
  }
}
