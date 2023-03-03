import { JqlQueries } from "@prisma/client";

export interface IJiraIntegrationByIdParams {
  id: number;
}

export interface IJqlQueryByIdParams {
  id: number;
}

export interface IJqlQueryByIdQuery {
  integrationId: number;
  queryId: number;
}

export interface FriendlyIntegration {
  id: number;
  configuredById: number;
  domain: string;
  jqlQueries: JqlQueries[];
}
