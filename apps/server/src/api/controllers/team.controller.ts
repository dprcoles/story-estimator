import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TeamMap } from "src/application/team/mappings/team.mapping";
import { CreateTeamRequest } from "src/application/team/requests/create-team.request";
import { CreateTeamResponse } from "src/application/team/responses/create-team.response";
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

  @Post()
  async create(@Body() data: CreateTeamRequest): Promise<CreateTeamResponse> {
    const result = await this.teamService.createAsync({
      organisationId: data.organisationId,
      name: data.name,
      alias: data.alias,
    });

    return {
      id: result,
    };
  }
}
