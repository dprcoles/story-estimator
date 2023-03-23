import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { StoryService } from "./story.service";

@Module({
  imports: [PrismaModule],
  providers: [StoryService],
  exports: [StoryService],
})
export class StoryModule {}
