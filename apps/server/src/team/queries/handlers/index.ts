import { GetTeamByAliasHandler } from "./get-team-by-alias.handler";
import { GetTeamByIdHandler } from "./get-team-by-id.handler";

export const TeamQueryHandlers = [GetTeamByAliasHandler, GetTeamByIdHandler];
