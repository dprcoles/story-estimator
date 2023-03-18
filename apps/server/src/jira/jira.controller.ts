import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { JiraService } from "src/jira/jira.service";
import { JiraIntegration } from "./interfaces/jira-integration.interface";
import { JiraIssue } from "./interfaces/jira-issue.interface";

@Controller("jira")
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Get("integration/:id")
  async getIntegrationById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<JiraIntegration> {
    return await this.jiraService.getIntegrationByIdAsync(id);
  }

  @Get("query")
  async getIssuesByQuery(
    @Query("integrationId", ParseIntPipe) integrationId: number,
    @Query("queryId", ParseIntPipe) queryId: number,
  ): Promise<JiraIssue[]> {
    return await this.jiraService.getIssuesByQueryAsync(integrationId, queryId);
  }
}
