import { AddSessionPlayerHandler } from "./add-session-player.command";
import { CompleteSessionHandler } from "./complete-session.command";
import { CreateSessionHandler } from "./create-session.command";

export const SessionCommandHandlers = [
  CreateSessionHandler,
  AddSessionPlayerHandler,
  CompleteSessionHandler,
];
