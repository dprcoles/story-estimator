import { Injectable } from "@nestjs/common";
import { GetTeamQuery } from "src/team/queries/get-team.query";
import { PrismaService } from "../prisma/prisma.service";
import { Team } from "./interfaces/team.interface";
import { GetTeamByIdQuery } from "./queries/get-team-by-id.query";

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async getAsync(alias: string): Promise<Team> {
    const query = new GetTeamQuery(this.prisma);
    query.alias = alias;

    return await query.executeAsync();
  }

  async getByIdAsync(id: number) {
    const query = new GetTeamByIdQuery(this.prisma);
    query.id = id;

    return await query.executeAsync();
  }
}
