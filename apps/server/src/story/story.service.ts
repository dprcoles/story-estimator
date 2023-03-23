import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateStoryCommand } from "./commands/create-story.command";
import { CreateStoryDto } from "./dtos/create-story.dto";

@Injectable()
export class StoryService {
  constructor(private prisma: PrismaService) {}

  async createAsync(data: CreateStoryDto) {
    const command = new CreateStoryCommand(this.prisma);
    command.description = data.description;
    command.endSeconds = data.endSeconds;
    command.estimate = data.estimate;
    command.sessionId = data.sessionId;
    command.spectatorIds = data.spectatorIds;
    command.startSeconds = data.startSeconds;
    command.totalTimeSpent = data.totalTimeSpent;
    command.votes = data.votes;

    return await command.executeAsync();
  }
}
