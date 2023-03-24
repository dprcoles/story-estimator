import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateSessionRequest {
  @IsString()
  name: string;

  @IsNumber()
  @Type(() => Number)
  teamId: number;
}
