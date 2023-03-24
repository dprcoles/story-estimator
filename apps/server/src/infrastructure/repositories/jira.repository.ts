import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class JiraRepository {
  constructor(private prisma: PrismaService) {}

  async getJiraIntegrationAsync(id: number) {
    return await this.prisma.jiraIntegrations.findFirst({
      where: { id },
      include: { jql_queries: true },
    });
  }
}
