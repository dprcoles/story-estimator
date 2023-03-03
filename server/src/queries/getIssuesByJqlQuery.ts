import { FriendlyJiraIssue } from "src/types/jira";
import { Version3Client } from "jira.js";

interface GetIssuesByJqlQueryParams {
  apiToken: string;
  email: string;
  domain: string;
  query: string;
}

export default async (params: GetIssuesByJqlQueryParams) => {
  const { apiToken, email, domain, query } = params;

  const jiraClient = new Version3Client({
    host: `https://${domain}.atlassian.net`,
    authentication: {
      basic: {
        username: email,
        password: apiToken,
      },
    },
  });

  const response = await jiraClient.issueSearch.searchForIssuesUsingJql({
    jql: query,
  });

  const data: FriendlyJiraIssue[] | undefined = response.issues?.map((i) => ({
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
};
