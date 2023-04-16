import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { OrganisationRepository } from "src/infrastructure/repositories/organisation.repository";
import { OrganisationDto } from "../dtos/organisation.dto";

export class GetOrganisationByIdQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetOrganisationByIdQuery)
export class GetOrganisationByIdHandler
  implements IQueryHandler<GetOrganisationByIdQuery>
{
  constructor(private repository: OrganisationRepository) {}

  async execute(query: GetOrganisationByIdQuery) {
    const response = await this.repository.getByIdAsync(query.id);

    const data: OrganisationDto = {
      id: response.id,
      alias: response.alias,
      name: response.name,
      teams: response.teams,
    };

    return data;
  }
}
