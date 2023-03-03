import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { Sessions } from "@prisma/client";
import { SessionService } from "src/services/session.service";
import { SessionDetails } from "src/types/session";

@Controller("session")
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create(
    @Body() data: { name: string; teamId: number },
  ): Promise<Sessions> {
    return await this.sessionService.createAsync(data);
  }

  @Get(":id")
  async get(@Param("id", ParseIntPipe) id: number): Promise<SessionDetails> {
    return await this.sessionService.getAsync(id);
  }
}
