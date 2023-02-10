export interface ITeamByIdParams {
  id: number;
}

export interface TeamSession {
  id: number;
  name: string;
  playerCount: number;
  storyCount: number;
  active: boolean;
}

export interface TeamDetails {
  id: number;
  name: string;
  sessions: TeamSession[];
  jiraIntegrationId: number | null;
}

