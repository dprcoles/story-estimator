import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { JiraRepository } from "src/infrastructure/repositories/jira.repository";
import { JiraIntegrationDto } from "../dtos/jira-integration.dto";

export class GetJiraIntegrationQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetJiraIntegrationQuery)
export class GetJiraIntegrationHandler
  implements IQueryHandler<GetJiraIntegrationQuery, JiraIntegrationDto>
{
  constructor(private repository: JiraRepository) {}

  async execute(query: GetJiraIntegrationQuery) {
    const response = await this.repository.getJiraIntegrationAsync(query.id);

    const data: JiraIntegrationDto = {
      id: response.id,
      configuredById: response.configuredById,
      domain: response.domain,
      jqlQueries: response.jql_queries,
    };

    return data;
  }
}
