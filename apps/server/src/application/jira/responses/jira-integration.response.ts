import { JqlQuery } from "src/domain/models/jira-integration.model";

export class GetJiraIntegrationResponse {
  id: number;
  configuredById: number;
  domain: string;
  jqlQueries: JqlQuery[];
}
