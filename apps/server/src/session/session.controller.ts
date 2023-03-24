import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { Sessions } from "@prisma/client";
import { SessionService } from "src/session/session.service";
import { Session } from "./interfaces/session.interface";
import { CreateSessionRequest } from "./models/requests/create-session.request";

@Controller("session")
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create(@Body() data: CreateSessionRequest): Promise<Sessions> {
    return await this.sessionService.createAsync(data);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number): Promise<Session> {
    return await this.sessionService.getAsync(id);
  }
}
