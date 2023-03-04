import { Query } from "src/interfaces/query.interface";
import { PlayerType } from "src/player/enums/player-type.enum";
import { Player } from "src/player/interfaces/player.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { Session } from "../interfaces/session.interface";

export class GetSessionQuery implements Query {
  public id: number;

  constructor(private prisma: PrismaService) {}

  async executeAsync(): Promise<Session> {
    const session = await this.prisma.sessions.findFirstOrThrow({
      where: { id: this.id },
      include: {
        stories: {
          include: {
            votes: { include: { player: true } },
            spectators: { include: { player: true } },
          },
        },
      },
    });

    const players = await this.prisma.players.findMany({
      where: { id: { in: session?.playerIds } },
    });

    const mappedPlayers: Player[] = players.map((x) => ({
      emoji: x.emoji,
      id: x.id,
      name: x.name,
      type: x.defaultType as PlayerType,
    }));

    const data: Session = {
      id: session.id,
      name: session.name,
      teamId: session.teamId,
      players: mappedPlayers,
      stories: session.stories.map((x) => ({
        description: x.description,
        endSeconds: x.endSeconds,
        estimate: x.estimate,
        id: x.id,
        sessionId: x.sessionId,
        spectators: x.spectators
          .map((s) => s.player)
          .map((p) => ({ ...p, type: p.defaultType as PlayerType })),
        startSeconds: x.startSeconds,
        totalTimeSpent: x.totalTimeSpent,
        voters: x.votes
          .map((v) => v.player)
          .map((p) => ({ ...p, type: p.defaultType as PlayerType })),
        votes: x.votes,
      })),
    };

    return data;
  }
}
