import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { FriendlyIntegration } from "src/types/integrations";
import getJiraIntegrationByIdQuery from "src/queries/getJiraIntegrationByIdQuery";
import getIssuesByJqlQuery from "src/queries/getIssuesByJqlQuery";
import { FriendlyJiraIssue } from "src/types/jira";

@Injectable()
export class JiraService {
  constructor(private prisma: PrismaService) {}

  async getIntegrationByIdAsync(
    id: number,
  ): Promise<FriendlyIntegration | null> {
    const data = await getJiraIntegrationByIdQuery(this.prisma, id);

    const safeData: FriendlyIntegration = {
      id: data.id,
      configuredById: data.configuredById,
      domain: data.domain,
      jqlQueries: data.jql_queries,
    };

    return safeData;
  }

  async getIssuesByQueryAsync(
    integrationId: number,
    queryId: number,
  ): Promise<FriendlyJiraIssue[] | null> {
    const settings = await getJiraIntegrationByIdQuery(
      this.prisma,
      integrationId,
    );

    const { apiToken, domain, email } = settings;

    const query = settings.jql_queries.find((q: any) => q.id === queryId);

    if (!query) return;

    return await getIssuesByJqlQuery({
      apiToken,
      email,
      domain,
      query: query.query,
    });
  }
}
