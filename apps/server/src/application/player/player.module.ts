import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { PlayerCommandHandlers } from "./commands";
import { PlayerService } from "./player.service";
import { PlayerQueryHandlers } from "./queries";

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [PlayerService, ...PlayerQueryHandlers, ...PlayerCommandHandlers],
  exports: [PlayerService],
})
export class PlayerModule {}
