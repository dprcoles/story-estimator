import { DEFAULT_TEAM_ID } from "constants/app.constants";
import { create } from "zustand";

import { TeamDetails } from "@/types/team";

type TeamStore = {
  team: TeamDetails;
  setTeam: (team: TeamDetails) => void;
};

export const useTeamStore = create<TeamStore>(
  (set, get): TeamStore => ({
    team: {
      id: DEFAULT_TEAM_ID,
      name: "Default Team",
      sessions: [],
      jiraIntegrationId: null,
    },
    setTeam: (team: TeamDetails) => set((state) => ({ ...state, team })),
  }),
);
