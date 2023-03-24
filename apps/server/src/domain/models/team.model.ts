export class Team {
  id: number;
  alias: string;
  name: string;
  sessions: TeamSession[];
  jiraIntegrationId: number | null;
}

export type TeamSession = {
  id: number;
  name: string;
  playerCount: number;
  storyCount: number;
  active: boolean;
};
