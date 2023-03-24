import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SessionRepository } from "src/session/session.repository";
import { CreateSessionCommand } from "../create-session.command";

@CommandHandler(CreateSessionCommand)
export class CreateSessionHandler
  implements ICommandHandler<CreateSessionCommand>
{
  constructor(private repository: SessionRepository) {}

  async execute(command: CreateSessionCommand) {
    return await this.repository.createAsync(command.name, command.teamId);
  }
}
