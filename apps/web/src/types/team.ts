export interface Team {
  id: number;
  name: string;
  alias: string;
  organisationId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamSession {
  id: number;
  name: string;
  active: boolean;
  playerCount: number;
  storyCount: number;
}

export interface TeamDetails {
  id: number;
  name: string;
  sessions: TeamSession[];
  jiraIntegrationId: number | null;
}

export enum TeamPageTab {
  Sessions = "session",
  Integrations = "integrations",
}
