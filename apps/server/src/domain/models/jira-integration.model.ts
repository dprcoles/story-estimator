export interface JiraIntegration {
  id: number;
  configuredById: number;
  domain: string;
  jqlQueries: JqlQuery[];
}

export type JqlQuery = {
  id: number;
  integrationId: number;
  name: string;
  query: string;
  createdAt: Date;
  updatedAt: Date | null;
};
