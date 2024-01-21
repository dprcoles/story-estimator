import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { JiraService } from "src/application/jira/jira.service";
import { JiraIntegrationMap } from "src/application/jira/mappings/jira-integration.mapping";
import { JiraIssueMap } from "src/application/jira/mappings/jira-issue.mapping";
import { GetJiraIssuesRequest } from "src/application/jira/requests/get-jira-issues.request";
import { GetJiraIntegrationResponse } from "src/application/jira/responses/jira-integration.response";
import { GetJiraIssuesResponse } from "src/application/jira/responses/jira-issues.response";

@Controller("jira")
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Get("integration/:id")
  async getIntegrationById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<GetJiraIntegrationResponse> {
    const response = await this.jiraService.getIntegrationByIdAsync(id);

    return JiraIntegrationMap.toIntegrationResponse(response);
  }

  @Get("query")
  async getIssuesByQuery(@Query() request: GetJiraIssuesRequest): Promise<GetJiraIssuesResponse> {
    const response = await this.jiraService.getIssuesByQueryAsync(
      request.integrationId,
      request.queryId,
    );

    return JiraIssueMap.toIssuesResponse(response);
  }
}
