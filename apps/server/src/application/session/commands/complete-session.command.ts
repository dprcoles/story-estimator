import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SessionRepository } from "src/infrastructure/repositories/session.repository";

export class CompleteSessionCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(CompleteSessionCommand)
export class CompleteSessionHandler
  implements ICommandHandler<CompleteSessionCommand, number>
{
  constructor(private repository: SessionRepository) {}

  async execute(command: CompleteSessionCommand) {
    const result = await this.repository.completeAsync(command.id);

    return result.id;
  }
}
