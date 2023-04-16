import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { OrganisationRepository } from "src/infrastructure/repositories/organisation.repository";
import { OrganisationDto } from "../dtos/organisation.dto";

export class GetOrganisationByAliasQuery {
  constructor(public readonly alias: string) {}
}

@QueryHandler(GetOrganisationByAliasQuery)
export class GetOrganisationByAliasHandler
  implements IQueryHandler<GetOrganisationByAliasQuery, OrganisationDto>
{
  constructor(private repository: OrganisationRepository) {}

  async execute(query: GetOrganisationByAliasQuery) {
    const response = await this.repository.getByAliasAsync(query.alias);

    const data: OrganisationDto = {
      id: response.id,
      alias: response.alias,
      name: response.name,
      teams: response.teams,
    };

    return data;
  }
}
