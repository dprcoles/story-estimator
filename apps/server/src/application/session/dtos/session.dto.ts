export class SessionDto {
  id: number;
  name: string;
  players: {
    defaultType: string;
    id: number;
    emoji: string;
    name: string;
  }[];
  stories: {
    description: string;
    endSeconds: number | null;
    estimate: string | null;
    id: number;
    sessionId: number;
    spectators: {
      defaultType: string;
      id: number;
      emoji: string;
      name: string;
    }[];
    startSeconds: number | null;
    totalTimeSpent: number | null;
    voters: {
      defaultType: string;
      id: number;
      emoji: string;
      name: string;
    }[];
    votes: {
      playerId: number;
      vote: string;
    }[];
  }[];
  team: {
    id: number;
    name: string;
    alias: string;
    organisationId: number;
  };
}
