import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { JiraController } from "./jira.controller";
import { JiraService } from "./jira.service";

@Module({
  imports: [PrismaModule],
  controllers: [JiraController],
  providers: [JiraService],
  exports: [JiraService],
})
export class JiraModule {}
