import { JiraIntegrations, JqlQueries } from "@prisma/client";
import { Query } from "src/interfaces/query.interface";
import { PrismaService } from "src/prisma/prisma.service";

export class GetJiraIntegrationQuery implements Query {
  public id: number;

  constructor(private prisma: PrismaService) {}

  async executeAsync(): Promise<
    JiraIntegrations & { jql_queries: JqlQueries[] }
  > {
    return await this.prisma.jiraIntegrations.findFirstOrThrow({
      where: { id: this.id },
      include: { jql_queries: true },
    });
  }
}
