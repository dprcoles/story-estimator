import { IsArray, IsInt, IsString } from "class-validator";
import { Vote } from "../interfaces/story.interface";

export class CreateStoryDto {
  @IsString()
  readonly description: string;

  @IsInt()
  readonly startSeconds: number;

  @IsInt()
  readonly endSeconds: number;

  @IsString()
  readonly estimate: string;

  @IsInt()
  readonly totalTimeSpent: number;

  @IsInt()
  readonly sessionId: number;

  @IsArray()
  readonly votes: Vote[];

  @IsArray()
  readonly spectatorIds: number[];
}
