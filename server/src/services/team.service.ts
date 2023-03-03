import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import getTeamQuery from "src/queries/getTeamQuery";
import { TeamDetails } from "src/types/team";

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async getAsync(alias: string): Promise<TeamDetails | null> {
    return await getTeamQuery(this.prisma, { alias });
  }
}
