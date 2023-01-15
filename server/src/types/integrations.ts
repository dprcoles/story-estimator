import { jira_integrations } from "./prisma";

export interface IJiraIntegrationByIdParams {
  id: string;
}

export interface IJqlQueryByIdParams {
  id: string;
}

export interface IJqlQueryByIdQuery {
  integrationId: string;
  queryId: string;
}

type SafeJiraIntegrationType = Omit<jira_integrations, "apiToken">;

export type SafeJiraIntegration = SafeJiraIntegrationType;
