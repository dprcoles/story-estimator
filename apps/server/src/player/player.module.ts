import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { PlayerController } from "./player.controller";
import { PlayerService } from "./player.service";

@Module({
  imports: [PrismaModule],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
