export class JiraIssueDto {
  key: string;
  type: {
    iconUrl?: string;
    name?: string;
  };
  priority: {
    iconUrl?: string;
    name?: string;
  };
  status: {
    statusCategory: {
      name?: string;
    };
  };
  summary: string;
}
