export interface ITeamByIdParams {
  id: string;
}

export interface TeamSession {
  id: string;
  name: string;
  playerCount: number;
  storyCount: number;
  active: boolean;
}

export interface TeamDetails {
  id: string;
  name: string;
  sessions: TeamSession[];
}

