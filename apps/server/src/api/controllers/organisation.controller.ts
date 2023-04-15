import { Controller, Get, Param } from "@nestjs/common";
import { OrganisationMap } from "src/application/organisation/mappings/organisation.mapping";
import { OrganisationService } from "src/application/organisation/organisation.service";
import { GetOrganisationResponse } from "src/application/organisation/responses/get-organisation.response";

@Controller("organisation")
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Get(":alias")
  async get(@Param("alias") alias: string): Promise<GetOrganisationResponse> {
    const result = await this.organisationService.getAsync(alias);

    return OrganisationMap.toResponse(result);
  }
}
