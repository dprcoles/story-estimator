import { Stories } from "@prisma/client";
import { Command } from "src/interfaces/command.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { Vote } from "../interfaces/story.interface";

export class CreateStoryCommand implements Command {
  public description: string;
  public startSeconds: number;
  public endSeconds: number;
  public estimate: string;
  public totalTimeSpent: number;
  public sessionId: number;
  public votes: Vote[];
  public spectatorIds: number[];

  constructor(private prisma: PrismaService) {}

  async executeAsync(): Promise<Stories> {
    const result = this.prisma.stories.create({
      data: {
        description: this.description,
        startSeconds: this.startSeconds,
        endSeconds: this.endSeconds,
        estimate: this.estimate,
        totalTimeSpent: this.totalTimeSpent,
        sessionId: this.sessionId,
        votes: {
          create: this.votes.map((v) => ({
            playerId: v.playerId,
            vote: v.vote || "",
          })),
        },
        spectators: {
          create: this.spectatorIds.map((s) => ({
            playerId: s,
          })),
        },
      },
    });

    return result;
  }
}
