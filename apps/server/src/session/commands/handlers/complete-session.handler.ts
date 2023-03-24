import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SessionRepository } from "src/session/session.repository";
import { CompleteSessionCommand } from "../complete-session.command";

@CommandHandler(CompleteSessionCommand)
export class CompleteSessionHandler
  implements ICommandHandler<CompleteSessionCommand>
{
  constructor(private repository: SessionRepository) {}

  async execute(command: CompleteSessionCommand) {
    return await this.repository.completeAsync(command.id);
  }
}
