import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { TeamController } from "./team.controller";
import { TeamService } from "./team.service";

@Module({
  imports: [PrismaModule],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
