export class JiraIssue {
  key: string;
  type: IssueType;
  priority: Priority;
  status: Status;
  summary: string;
}

export type IssueType = {
  iconUrl?: string;
  name?: string;
};

export type Priority = {
  iconUrl?: string;
  name?: string;
};

export type StatusCategory = {
  name?: string;
};

export type Status = {
  statusCategory: StatusCategory;
};
