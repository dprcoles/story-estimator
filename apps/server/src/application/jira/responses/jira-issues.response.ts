import { IssueType, Priority, Status } from "src/domain/models/jira-issue.model";

export class JiraIssueResponse {
  key: string;
  type: IssueType;
  priority: Priority;
  status: Status;
  summary: string;
}

export class GetJiraIssuesResponse {
  issues: JiraIssueResponse[] = [];
}
