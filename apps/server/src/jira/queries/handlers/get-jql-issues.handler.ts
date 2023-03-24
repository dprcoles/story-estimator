import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Version3Client } from "jira.js";
import { JiraIssue } from "src/jira/interfaces/jira-issue.interface";
import { JiraRepository } from "src/jira/jira.repository";
import { GetJqlIssuesQuery } from "../get-jql-issues.query";

@QueryHandler(GetJqlIssuesQuery)
export class GetJqlIssuesHandler implements IQueryHandler<GetJqlIssuesQuery> {
  constructor(private repository: JiraRepository) {}

  async execute(query: GetJqlIssuesQuery) {
    const integration = await this.repository.getJiraIntegrationAsync(
      query.integrationId,
    );

    const jqlQuery = integration.jql_queries.find(
      (q: any) => q.id === query.queryId,
    );

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

    const response = await jiraClient.issueSearch.searchForIssuesUsingJql({
      jql: jqlQuery.query,
    });

    const data: JiraIssue[] | undefined = response.issues?.map((i) => ({
      key: i.key,
      type: {
        iconUrl: i.fields.issuetype?.iconUrl,
        name: i.fields.issueType?.name,
      },
      priority: {
        iconUrl: i.fields.priority.iconUrl,
        name: i.fields.priority.name,
      },
      status: {
        statusCategory: {
          name: i.fields.status.statusCategory?.name,
        },
      },
      summary: i.fields.summary,
    }));

    return data;
  }
}
