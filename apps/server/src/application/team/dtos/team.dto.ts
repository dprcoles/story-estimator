export class TeamDto {
  id: number;
  alias: string;
  name: string;
  sessions: {
    id: number;
    name: string;
    playerCount: number;
    storyCount: number;
    active: boolean;
  }[];
  jiraIntegrationId: number | null;
}
