import { Injectable } from "@nestjs/common";
import { PlayerType } from "src/domain/enums/player.enums";
import { Player } from "src/domain/models/player.model";
import { SessionDto } from "src/application/session/dtos/session.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SessionRepository {
  constructor(private prisma: PrismaService) {}

  async createAsync(name: string, teamId: number) {
    const session = await this.prisma.sessions.create({
      data: {
        name: name,
        playerIds: [],
        teamId: teamId,
        active: true,
      },
    });

    return session;
  }

  async getByIdAsync(id: number) {
    const session = await this.prisma.sessions.findFirstOrThrow({
      where: { id: id },
      include: {
        stories: {
          include: {
            votes: { include: { player: true } },
            spectators: { include: { player: true } },
          },
        },
        team: true,
      },
    });

    const players = await this.prisma.players.findMany({
      where: { id: { in: session?.playerIds } },
    });

    const mappedPlayers: Player[] = players.map((x) => ({
      emoji: x.emoji,
      id: x.id,
      name: x.name,
      defaultType: x.defaultType as PlayerType,
    }));

    const data: SessionDto = {
      id: session.id,
      name: session.name,
      players: mappedPlayers,
      stories: session.stories.map((x) => ({
        description: x.description,
        endSeconds: x.endSeconds,
        estimate: x.estimate,
        id: x.id,
        sessionId: x.sessionId,
        spectators: x.spectators
          .map((s) => s.player)
          .map((p) => ({ ...p, defaultType: p.defaultType as PlayerType })),
        startSeconds: x.startSeconds,
        totalTimeSpent: x.totalTimeSpent,
        voters: x.votes
          .map((v) => v.player)
          .map((p) => ({ ...p, defaultType: p.defaultType as PlayerType })),
        votes: x.votes,
      })),
      team: session.team,
    };

    return data;
  }

  async addPlayerAsync(id: number, playerId: number) {
    return await this.prisma.sessions.update({
      data: { playerIds: { push: playerId } },
      where: { id: id },
    });
  }

  async completeAsync(id: number) {
    const session = await this.prisma.sessions.update({
      data: { active: false },
      where: { id: id },
    });

    return session;
  }
}
