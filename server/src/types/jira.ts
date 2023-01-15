type IssueType = {
  iconUrl?: string;
  name?: string;
};

type Priority = {
  iconUrl?: string;
  name?: string;
};

type StatusCategory = {
  name?: string;
};

type Status = {
  statusCategory: StatusCategory;
};

export type JiraIssueFields = {
  issuetype: IssueType;
  priority: Priority;
  status: Status;
  summary: string;
};

export interface JiraIssue {
  key: string;
  fields: JiraIssueFields;
}

export interface FriendlyJiraIssue {
  key: string;
  type: IssueType;
  priority: Priority;
  status: Status;
  summary: string;
}

