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
  Definitions = "definitions",
  Integrations = "integrations",
}

