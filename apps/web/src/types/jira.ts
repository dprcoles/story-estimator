type IssueType = {
  iconUrl: string;
  name: string;
};

type Priority = {
  iconUrl: string;
  name: string;
};

type StatusCategory = {
  name: string;
};

type Status = {
  statusCategory: StatusCategory;
};

export interface JiraIssue {
  key: string;
  type: IssueType;
  priority: Priority;
  status: Status;
  summary: string;
}
