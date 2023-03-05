type TeamSession = {
  id: number;
  name: string;
  playerCount: number;
  storyCount: number;
  active: boolean;
};

export interface Team {
  id: number;
  alias: string;
  name: string;
  sessions: TeamSession[];
  jiraIntegrationId: number | null;
}
