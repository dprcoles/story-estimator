import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaModule } from "src/prisma/prisma.module";
import { JiraController } from "./jira.controller";
import { JiraRepository } from "./jira.repository";
import { JiraService } from "./jira.service";
import { JiraQueryHandlers } from "./queries/handlers";

@Module({
  imports: [PrismaModule, CqrsModule],
  controllers: [JiraController],
  providers: [JiraService, JiraRepository, ...JiraQueryHandlers],
  exports: [JiraService],
})
export class JiraModule {}
