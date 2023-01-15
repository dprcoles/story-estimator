export interface IntegrationIds {
  jira: string | null;
}

export type JqlQuery = {
  id: string;
  name: string;
  query: string;
};

export interface JiraIntegration {
  id: string;
  domain: string;
  configuredById: string;
  jqlQueries: JqlQuery[];
}

export enum IntegrationView {
  List = "list",
  Config = "config",
}

