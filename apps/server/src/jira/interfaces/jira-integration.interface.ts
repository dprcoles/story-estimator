import { JqlQueries } from "@prisma/client";

export interface JiraIntegration {
  id: number;
  configuredById: number;
  domain: string;
  jqlQueries: JqlQueries[];
}
