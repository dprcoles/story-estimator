export class GetOrganisationResponse {
  id: number;
  alias: string;
  name: string;
  teams: {
    id: number;
    alias: string;
    name: string;
  }[];
}
