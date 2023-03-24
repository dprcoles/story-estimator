import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaModule } from "src/prisma/prisma.module";
import { StoryCommandHandlers } from "./commands/handlers";
import { StoryRepository } from "./story.repository";
import { StoryService } from "./story.service";

@Module({
  imports: [PrismaModule, CqrsModule],
  providers: [StoryService, StoryRepository, ...StoryCommandHandlers],
  exports: [StoryService],
})
export class StoryModule {}
