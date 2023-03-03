import { Controller, Get, Param } from "@nestjs/common";
import { TeamDetails } from "src/types/team";
import { TeamService } from "../services/team.service";

@Controller("team")
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get(":alias")
  async get(@Param("alias") alias: string): Promise<TeamDetails> {
    return await this.teamService.getAsync(alias);
  }
}
