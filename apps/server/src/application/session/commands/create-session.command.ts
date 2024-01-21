import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SessionRepository } from "src/infrastructure/repositories/session.repository";

export class CreateSessionCommand {
  constructor(
    public readonly name: string,
    public readonly teamId: number,
  ) {}
}

@CommandHandler(CreateSessionCommand)
export class CreateSessionHandler implements ICommandHandler<CreateSessionCommand, number> {
  constructor(private repository: SessionRepository) {}

  async execute(command: CreateSessionCommand) {
    const result = await this.repository.createAsync(command.name, command.teamId);

    return result.id;
  }
}
