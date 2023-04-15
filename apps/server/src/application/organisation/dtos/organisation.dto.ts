export class OrganisationDto {
  id: number;
  alias: string;
  name: string;
  teams: {
    id: number;
    alias: string;
    name: string;
  }[];
}
