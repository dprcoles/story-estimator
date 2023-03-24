import { Injectable } from "@nestjs/common";
import { GetJiraIntegrationQuery } from "src/jira/queries/get-jira-integration.query";
import { GetJqlIssuesQuery } from "src/jira/queries/get-jql-issues.query";
import { QueryBus } from "@nestjs/cqrs";
import { JiraIssue } from "./interfaces/jira-issue.interface";
import { JiraIntegration } from "./interfaces/jira-integration.interface";

@Injectable()
export class JiraService {
  constructor(private queryBus: QueryBus) {}

  async getIntegrationByIdAsync(id: number): Promise<JiraIntegration> {
    const query = new GetJiraIntegrationQuery(id);

    return await this.queryBus.execute(query);
  }

  async getIssuesByQueryAsync(
    integrationId: number,
    queryId: number,
  ): Promise<JiraIssue[] | null> {
    const query = new GetJqlIssuesQuery(integrationId, queryId);

    return await this.queryBus.execute(query);
  }
}
