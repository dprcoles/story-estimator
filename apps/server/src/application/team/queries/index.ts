import { GetTeamByAliasHandler } from "./get-team-by-alias.query";
import { GetTeamByIdHandler } from "./get-team-by-id.query";

export const TeamQueryHandlers = [GetTeamByAliasHandler, GetTeamByIdHandler];
