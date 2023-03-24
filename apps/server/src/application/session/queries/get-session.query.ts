import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { SessionRepository } from "src/infrastructure/repositories/session.repository";
import { SessionDto } from "../dtos/session.dto";

export class GetSessionQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetSessionQuery)
export class GetSessionHandler
  implements IQueryHandler<GetSessionQuery, SessionDto>
{
  constructor(private repository: SessionRepository) {}

  async execute(query: GetSessionQuery) {
    return await this.repository.getByIdAsync(query.id);
  }
}
