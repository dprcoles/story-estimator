import { create } from "zustand";

import { Organisation } from "@/types/organisation";
import { DEFAULT_ORGANISATION_ID } from "@/utils/constants";

type OrganisationStore = {
  organisation: Organisation;
  setOrganisation: (organisation: Organisation) => void;
};

export const useOrganisationStore = create<OrganisationStore>(
  (set): OrganisationStore => ({
    organisation: {
      id: DEFAULT_ORGANISATION_ID,
      name: "Default Organisation",
      alias: "default",
      teams: [],
    },
    setOrganisation: (organisation: Organisation) => set((state) => ({ ...state, organisation })),
  }),
);
