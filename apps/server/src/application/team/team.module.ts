import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { TeamQueryHandlers } from "./queries";
import { TeamService } from "./team.service";
import { TeamCommandHandlers } from "./commands";

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [TeamService, ...TeamQueryHandlers, ...TeamCommandHandlers],
  exports: [TeamService],
})
export class TeamModule {}
