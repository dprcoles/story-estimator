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
}

export enum TeamPageTab {
  Sessions = "session",
  Definitions = "definitions",
}
