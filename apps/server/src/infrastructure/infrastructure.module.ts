import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { JiraRepository } from "./repositories/jira.repository";
import { PlayerRepository } from "./repositories/player.repository";
import { SessionRepository } from "./repositories/session.repository";
import { StoryRepository } from "./repositories/story.repository";
import { TeamRepository } from "./repositories/team.repository";
import { OrganisationRepository } from "./repositories/organisation.repository";

@Module({
  providers: [
    PrismaService,
    JiraRepository,
    PlayerRepository,
    SessionRepository,
    StoryRepository,
    TeamRepository,
    OrganisationRepository,
  ],
  exports: [
    PrismaService,
    JiraRepository,
    PlayerRepository,
    SessionRepository,
    StoryRepository,
    TeamRepository,
    OrganisationRepository,
  ],
})
export class InfrastructureModule {}
