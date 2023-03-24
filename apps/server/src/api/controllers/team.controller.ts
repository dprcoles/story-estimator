import { Controller, Get, Param } from "@nestjs/common";
import { TeamMap } from "src/application/team/mappings/team.mapping";
import { GetTeamResponse } from "src/application/team/responses/get-team.response";
import { TeamService } from "src/application/team/team.service";

@Controller("team")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get(":alias")
  async get(@Param("alias") alias: string): Promise<GetTeamResponse> {
    const result = await this.teamService.getAsync(alias);

    return TeamMap.toResponse(result);
  }
}
