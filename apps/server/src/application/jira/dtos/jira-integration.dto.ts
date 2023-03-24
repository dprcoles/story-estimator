export class JiraIntegrationDto {
  id: number;
  configuredById: number;
  domain: string;
  jqlQueries: {
    id: number;
    integrationId: number;
    name: string;
    query: string;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
}
