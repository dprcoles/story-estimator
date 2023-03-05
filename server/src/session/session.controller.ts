import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { Sessions } from "@prisma/client";
import { CreateSessionDto } from "src/session/dto/create-session.dto";
import { SessionService } from "src/session/session.service";
import { Session } from "./interfaces/session.interface";

@Controller("session")
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create(@Body() data: CreateSessionDto): Promise<Sessions> {
    return await this.sessionService.createAsync(data);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number): Promise<Session> {
    return await this.sessionService.getAsync(id);
  }
}
