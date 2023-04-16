export type Organisation = {
  id: number;
  name: string;
  alias: string;
  teams: OrganisationTeam[];
};

export type OrganisationTeam = {
  id: number;
  name: string;
  alias: string;
};
