import { JiraIssue } from "../interfaces/jira-issue.interface";
import { Version3Client } from "jira.js";
import { Query } from "src/interfaces/query.interface";

export class GetJqlIssuesQuery implements Query {
  public jqlQuery: string;

  constructor(private jiraClient: Version3Client) {}

  async executeAsync(): Promise<JiraIssue[]> {
    const response = await this.jiraClient.issueSearch.searchForIssuesUsingJql({
      jql: this.jqlQuery,
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
