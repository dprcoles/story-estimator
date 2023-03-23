import { create } from "zustand";
import { TeamDetails } from "@/types/team";

type TeamStore = {
  team: TeamDetails;
  setTeam: (team: TeamDetails) => void;
};

export const useTeamStore = create<TeamStore>(
  (set, get): TeamStore => ({
    team: {
      id: parseInt(import.meta.env.VITE_DEFAULT_TEAM_ID, 10),
      name: "Default Team",
      sessions: [],
      jiraIntegrationId: null,
    },
    setTeam: (team: TeamDetails) => set((state) => ({ ...state, team })),
  }),
);
