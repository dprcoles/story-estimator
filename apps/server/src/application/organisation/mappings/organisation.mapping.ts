import { Mapper } from "src/application/common/mapper";
import { Organisation } from "src/domain/models/organisation.model";
import { GetOrganisationResponse } from "../responses/get-organisation.response";
import { OrganisationDto } from "../dtos/organisation.dto";

export class OrganisationMap implements Mapper<Organisation> {
  public static toDomain(dto: OrganisationDto): Organisation {
    return {
      id: dto.id,
      alias: dto.alias,
      name: dto.name,
      teams: dto.teams,
    };
  }

  public static toResponse(domain: Organisation): GetOrganisationResponse {
    return {
      id: domain.id,
      alias: domain.alias,
      name: domain.name,
      teams: domain.teams,
    };
  }
}
