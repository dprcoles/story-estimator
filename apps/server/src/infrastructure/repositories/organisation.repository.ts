import { Injectable } from "@nestjs/common";
import { OrganisationDto } from "src/application/organisation/dtos/organisation.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class OrganisationRepository {
  constructor(private prisma: PrismaService) {}

  async getByIdAsync(id: number) {
    const organisation = await this.prisma.organisations.findFirstOrThrow({
      where: { id: id },
      include: { teams: true },
    });

    const data: OrganisationDto = {
      id: organisation.id,
      name: organisation.name,
      alias: organisation.alias,
      teams: organisation.teams,
    };

    return data;
  }

  async getByAliasAsync(alias: string) {
    const organisation = await this.prisma.organisations.findFirstOrThrow({
      where: { alias: alias },
      include: { teams: true },
    });

    const data: OrganisationDto = {
      id: organisation.id,
      name: organisation.name,
      alias: organisation.alias,
      teams: organisation.teams,
    };

    return data;
  }
}
