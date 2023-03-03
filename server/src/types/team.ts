export interface ITeamByAliasParams {
  alias: string;
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
  alias: string;
  name: string;
  sessions: TeamSession[];
  jiraIntegrationId: number | null;
}
