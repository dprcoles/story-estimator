import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SessionRepository } from "src/session/session.repository";
import { GetSessionQuery } from "../get-session.query";

@QueryHandler(GetSessionQuery)
export class GetSessionHandler implements IQueryHandler<GetSessionQuery> {
  constructor(private repository: SessionRepository) {}

  async execute(query: GetSessionQuery) {
    return await this.repository.getByIdAsync(query.id);
  }
}
