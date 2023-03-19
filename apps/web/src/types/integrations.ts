export interface IntegrationIds {
  jira: number | null;
}

export type JqlQuery = {
  id: number;
  name: string;
  query: string;
};

export interface JiraIntegration {
  id: number;
  domain: string;
  configuredById: number;
  jqlQueries: JqlQuery[];
}

export enum IntegrationView {
  List = "list",
  Config = "config",
}
