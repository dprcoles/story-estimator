import { Injectable } from "@nestjs/common";
import { CreateStoryDto } from "src/application/story/dtos/create-story.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StoryRepository {
  constructor(private prisma: PrismaService) {}

  async createAsync(story: CreateStoryDto) {
    await this.prisma.stories.create({
      data: {
        description: story.description,
        startSeconds: story.startSeconds,
        endSeconds: story.endSeconds,
        estimate: story.estimate,
        totalTimeSpent: story.totalTimeSpent,
        sessionId: story.sessionId,
        votes: {
          create: story.votes.map((v) => ({
            playerId: v.playerId,
            vote: v.vote || "",
          })),
        },
        spectators: {
          create: story.spectatorIds.map((s) => ({
            playerId: s,
          })),
        },
      },
    });
  }
}
