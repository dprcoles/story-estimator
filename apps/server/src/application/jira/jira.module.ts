import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { JiraService } from "./jira.service";
import { JiraQueryHandlers } from "./queries";

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [JiraService, ...JiraQueryHandlers],
  exports: [JiraService],
})
export class JiraModule {}
