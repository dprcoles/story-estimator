import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { JiraIntegration } from "src/jira/interfaces/jira-integration.interface";
import { JiraRepository } from "src/jira/jira.repository";
import { GetJiraIntegrationQuery } from "../get-jira-integration.query";

@QueryHandler(GetJiraIntegrationQuery)
export class GetJiraIntegrationHandler
  implements IQueryHandler<GetJiraIntegrationQuery>
{
  constructor(private repository: JiraRepository) {}

  async execute(query: GetJiraIntegrationQuery) {
    const data = await this.repository.getJiraIntegrationAsync(query.id);

    const safeData: JiraIntegration = {
      id: data.id,
      configuredById: data.configuredById,
      domain: data.domain,
      jqlQueries: data.jql_queries,
    };

    return safeData;
  }
}
