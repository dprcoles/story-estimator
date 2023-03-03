import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { JiraService } from "src/services/jira.service";
import { FriendlyIntegration } from "src/types/integrations";
import { FriendlyJiraIssue } from "src/types/jira";

@Controller("jira")
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Get("integration/:id")
  async getIntegrationById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<FriendlyIntegration> {
    return await this.jiraService.getIntegrationByIdAsync(id);
  }

  @Get("query")
  async getIssuesByQuery(
    @Query("integrationId", ParseIntPipe) integrationId: number,
    @Query("queryId", ParseIntPipe) queryId: number,
  ): Promise<FriendlyJiraIssue[]> {
    return await this.jiraService.getIssuesByQueryAsync(integrationId, queryId);
  }
}
