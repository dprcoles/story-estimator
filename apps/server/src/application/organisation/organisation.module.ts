import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { OrganisationService } from "./organisation.service";
import { OrganisationQueryHandlers } from "./queries";

@Module({
  imports: [InfrastructureModule, CqrsModule],
  providers: [OrganisationService, ...OrganisationQueryHandlers],
  exports: [OrganisationService],
})
export class OrganisationModule {}
