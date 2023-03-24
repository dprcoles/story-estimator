import { Type } from "class-transformer";
import { IsInt } from "class-validator";

export class GetJiraIssuesRequest {
  @IsInt()
  @Type(() => Number)
  integrationId: number;

  @IsInt()
  @Type(() => Number)
  queryId: number;
}
