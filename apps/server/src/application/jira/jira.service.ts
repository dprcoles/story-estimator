import { Injectable } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { JiraIssue } from "src/domain/models/jira-issue.model";
import { JiraIntegration } from "src/domain/models/jira-integration.model";
import { GetJiraIssuesQuery } from "./queries/get-jira-issues.query";
import { GetJiraIntegrationQuery } from "./queries/get-jira-integration.query";
import { JiraIssueMap } from "./mappings/jira-issue.mapping";
import { JiraIntegrationMap } from "./mappings/jira-integration.mapping";
import { JiraIntegrationDto } from "./dtos/jira-integration.dto";
import { JiraIssueDto } from "./dtos/jira-issue.dto";

@Injectable()
export class JiraService {
  constructor(private queryBus: QueryBus) {}

  async getIntegrationByIdAsync(id: number): Promise<JiraIntegration> {
    const query = new GetJiraIntegrationQuery(id);

    const result = await this.queryBus.execute<
      GetJiraIntegrationQuery,
      JiraIntegrationDto
    >(query);

    return JiraIntegrationMap.toDomain(result);
  }

  async getIssuesByQueryAsync(
    integrationId: number,
    queryId: number,
  ): Promise<JiraIssue[] | null> {
    const query = new GetJiraIssuesQuery(integrationId, queryId);

    const results = await this.queryBus.execute<
      GetJiraIssuesQuery,
      JiraIssueDto[]
    >(query);

    return results.map((x) => JiraIssueMap.toDomain(x));
  }
}
