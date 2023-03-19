import { Injectable } from "@nestjs/common";
import { GetTeamQuery } from "src/team/queries/get-team.query";
import { PrismaService } from "../prisma/prisma.service";
import { Team } from "./interfaces/team.interface";

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async getAsync(alias: string): Promise<Team> {
    const query = new GetTeamQuery(this.prisma);
    query.alias = alias;

    return await query.executeAsync();
  }
}
