import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaModule } from "src/prisma/prisma.module";
import { TeamQueryHandlers } from "./queries/handlers";
import { TeamController } from "./team.controller";
import { TeamRepository } from "./team.repository";
import { TeamService } from "./team.service";

@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [TeamController],
  providers: [TeamService, TeamRepository, ...TeamQueryHandlers],
  exports: [TeamService],
})
export class TeamModule {}
