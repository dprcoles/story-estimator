import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { StoryCommandHandlers } from "./commands";
import { StoryService } from "./story.service";

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [StoryService, ...StoryCommandHandlers],
  exports: [StoryService],
})
export class StoryModule {}
