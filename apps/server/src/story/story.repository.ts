import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateStoryDto } from "./models/dtos/create-story.dto";

@Injectable()
export class StoryRepository {
  constructor(private prisma: PrismaService) {}

  async createAsync(story: CreateStoryDto) {
    const result = this.prisma.stories.create({
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

    return result;
  }
}
