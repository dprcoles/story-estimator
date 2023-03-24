import { AddSessionPlayerHandler } from "./add-session-player.handler";
import { CompleteSessionHandler } from "./complete-session.handler";
import { CreateSessionHandler } from "./create-session.handler";

export const SessionCommandHandlers = [
  CreateSessionHandler,
  AddSessionPlayerHandler,
  CompleteSessionHandler,
];
