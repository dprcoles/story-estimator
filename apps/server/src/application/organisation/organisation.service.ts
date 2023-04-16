import { Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { Organisation } from "src/domain/models/organisation.model";
import { GetOrganisationByAliasQuery } from "./queries/get-organisation-by-alias.query";
import { OrganisationMap } from "./mappings/organisation.mapping";
import { GetOrganisationByIdQuery } from "./queries/get-organisation-by-id.query";
import { OrganisationDto } from "./dtos/organisation.dto";

@Injectable()
export class OrganisationService {
  constructor(private queryBus: QueryBus) {}

  async getAsync(alias: string): Promise<Organisation> {
    const query = new GetOrganisationByAliasQuery(alias);

    const response = await this.queryBus.execute<
      GetOrganisationByAliasQuery,
      OrganisationDto
    >(query);

    return OrganisationMap.toDomain(response);
  }

  async getByIdAsync(id: number): Promise<Organisation> {
    const query = new GetOrganisationByIdQuery(id);

    const response = await this.queryBus.execute<
      GetOrganisationByIdQuery,
      OrganisationDto
    >(query);

    return OrganisationMap.toDomain(response);
  }
}
