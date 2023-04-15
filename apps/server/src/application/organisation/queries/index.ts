import { GetOrganisationByAliasHandler } from "./get-organisation-by-alias.query";
import { GetOrganisationByIdHandler } from "./get-organisation-by-id.query";

export const OrganisationQueryHandlers = [
  GetOrganisationByAliasHandler,
  GetOrganisationByIdHandler,
];
