import { Controller, Get, Param } from "@nestjs/common";
import { Team } from "./interfaces/team.interface";
import { TeamService } from "./team.service";

@Controller("team")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get(":alias")
  async get(@Param("alias") alias: string): Promise<Team> {
    return await this.teamService.getAsync(alias);
  }
}
