import { Injectable } from "@nestjs/common";
import { Version3Client } from "jira.js";
import { GetJiraIntegrationQuery } from "src/jira/queries/get-jira-integration.query";
import { GetJqlIssuesQuery } from "src/jira/queries/get-jql-issues.query";
import { PrismaService } from "../prisma/prisma.service";
import { JiraIssue } from "./interfaces/jira-issue.interface";
import { JiraIntegration } from "./interfaces/jira-integration.interface";

@Injectable()
export class JiraService {
  constructor(private prisma: PrismaService) {}

  async getIntegrationByIdAsync(id: number): Promise<JiraIntegration> {
    const query = new GetJiraIntegrationQuery(this.prisma);
    query.id = id;

    const data = await query.executeAsync();

    const safeData: JiraIntegration = {
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
  ): Promise<JiraIssue[] | null> {
    const integrationQuery = new GetJiraIntegrationQuery(this.prisma);
    integrationQuery.id = integrationId;

    const integration = await integrationQuery.executeAsync();
    const jqlQuery = integration.jql_queries.find((q: any) => q.id === queryId);

    if (!jqlQuery) return null;

    const jiraClient = new Version3Client({
      host: `https://${integration.domain}.atlassian.net`,
      authentication: {
        basic: {
          username: integration.email,
          password: integration.apiToken,
        },
      },
    });

    const issuesQuery = new GetJqlIssuesQuery(jiraClient);
    issuesQuery.jqlQuery = jqlQuery.query;

    return await issuesQuery.executeAsync();
  }
}
