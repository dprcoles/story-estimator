import { TeamSession } from "src/domain/models/team.model";

export class GetTeamResponse {
  id: number;
  alias: string;
  name: string;
  sessions: TeamSession[];
  jiraIntegrationId: number | null;
}
