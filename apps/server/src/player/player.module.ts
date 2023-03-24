import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaModule } from "src/prisma/prisma.module";
import { PlayerCommandHandlers } from "./commands/handlers";
import { PlayerController } from "./player.controller";
import { PlayerRepository } from "./player.repository";
import { PlayerService } from "./player.service";
import { PlayerQueryHandlers } from "./queries/handlers";

@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [PlayerController],
  providers: [
    PlayerService,
    PlayerRepository,
    ...PlayerQueryHandlers,
    ...PlayerCommandHandlers,
  ],
  exports: [PlayerService],
})
export class PlayerModule {}
