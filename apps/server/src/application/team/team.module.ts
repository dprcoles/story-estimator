import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { TeamQueryHandlers } from "./queries";
import { TeamService } from "./team.service";

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [TeamService, ...TeamQueryHandlers],
  exports: [TeamService],
})
export class TeamModule {}
