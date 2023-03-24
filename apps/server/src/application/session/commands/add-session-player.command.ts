import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SessionRepository } from "src/infrastructure/repositories/session.repository";

export class AddSessionPlayerCommand {
  constructor(public readonly id: number, public readonly playerId: number) {}
}

@CommandHandler(AddSessionPlayerCommand)
export class AddSessionPlayerHandler
  implements ICommandHandler<AddSessionPlayerCommand, number>
{
  constructor(private repository: SessionRepository) {}

  async execute(command: AddSessionPlayerCommand) {
    const result = await this.repository.addPlayerAsync(
      command.id,
      command.playerId,
    );

    return result.id;
  }
}
