import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TeamRepository } from "src/infrastructure/repositories/team.repository";

export class CreateTeamCommand {
  constructor(
    public readonly organisationId: number,
    public readonly name: string,
    public readonly alias: string,
  ) {}
}

@CommandHandler(CreateTeamCommand)
export class CreateTeamHandler
  implements ICommandHandler<CreateTeamCommand, number>
{
  constructor(private repository: TeamRepository) {}

  async execute(command: CreateTeamCommand) {
    const teamId = await this.repository.createAsync(
      command.organisationId,
      command.name,
      command.alias,
    );

    return teamId;
  }
}
