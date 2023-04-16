import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateTeamRequest {
  @IsNumber()
  @Type(() => Number)
  organisationId: number;

  @IsString()
  name: string;

  @IsString()
  alias: string;
}
