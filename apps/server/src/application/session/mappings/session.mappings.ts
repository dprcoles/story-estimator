import { Mapper } from "src/application/common/mapper";
import { PlayerType } from "src/domain/enums/player.enums";
import { Session } from "src/domain/models/session.model";
import { SessionDto } from "../dtos/session.dto";
import { GetSessionResponse } from "../responses/get-session.response";

export class SessionMap implements Mapper<Session> {
  public static toDomain(dto: SessionDto): Session {
    return {
      id: dto.id,
      name: dto.name,
      players: dto.players.map((x) => ({
        emoji: x.emoji,
        id: x.id,
        name: x.name,
        defaultType: x.defaultType as PlayerType,
      })),
      stories: dto.stories.map((x) => ({
        description: x.description,
        endSeconds: x.endSeconds,
        estimate: x.estimate,
        id: x.id,
        sessionId: x.sessionId,
        spectators: x.spectators.map((p) => ({
          ...p,
          defaultType: p.defaultType as PlayerType,
        })),
        totalTimeSpent: x.totalTimeSpent,
        voters: x.voters.map((p) => ({
          ...p,
          defaultType: p.defaultType as PlayerType,
        })),
        votes: x.votes.map((v) => ({
          playerId: v.playerId,
          vote: v.vote,
        })),
        startSeconds: x.startSeconds,
      })),
      team: { ...dto.team },
    };
  }

  public static toDto(domain: Session): SessionDto {
    return {
      id: domain.id,
      name: domain.name,
      players: domain.players.map((x) => ({
        emoji: x.emoji,
        id: x.id,
        name: x.name,
        defaultType: x.defaultType,
      })),
      stories: domain.stories.map((x) => ({
        description: x.description,
        endSeconds: x.endSeconds,
        estimate: x.estimate,
        id: x.id,
        sessionId: x.sessionId,
        spectators: x.spectators.map((p) => ({
          ...p,
          defaultType: p.defaultType,
        })),
        totalTimeSpent: x.totalTimeSpent,
        voters: x.voters.map((p) => ({
          ...p,
          defaultType: p.defaultType,
        })),
        votes: x.votes.map((v) => ({
          playerId: v.playerId,
          vote: v.vote,
        })),
        startSeconds: x.startSeconds,
      })),
      team: { ...domain.team },
    };
  }

  public static toResponse(domain: Session): GetSessionResponse {
    return {
      id: domain.id,
      name: domain.name,
      players: domain.players,
      stories: domain.stories,
      team: domain.team,
    };
  }
}
