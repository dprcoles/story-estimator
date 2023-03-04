import { IsInt, IsString } from "class-validator";

export class CreateSessionDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly teamId: number;
}
