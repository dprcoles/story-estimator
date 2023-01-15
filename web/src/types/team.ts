export interface TeamSession {
  id: string;
  name: string;
  active: boolean;
  playerCount: number;
  storyCount: number;
}

export interface TeamDetails {
  id: string;
  name: string;
  sessions: TeamSession[];
  jiraIntegrationId: string | null;
}

export enum TeamPageTab {
  Sessions = "session",
  Definitions = "definitions",
  Integrations = "integrations",
}

