import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { SessionMap } from "src/application/session/mappings/session.mappings";
import { CreateSessionRequest } from "src/application/session/requests/create-session.request";
import { CreateSessionResponse } from "src/application/session/responses/create-session.response";
import { GetSessionResponse } from "src/application/session/responses/get-session.response";
import { SessionService } from "src/application/session/session.service";

@Controller("session")
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create(
    @Body() data: CreateSessionRequest,
  ): Promise<CreateSessionResponse> {
    console.log(data);
    const result = await this.sessionService.createAsync({
      name: data.name,
      teamId: data.teamId,
    });

    return {
      id: result,
    };
  }

  @Get(":id")
  async get(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<GetSessionResponse> {
    const data = await this.sessionService.getAsync(id);

    return SessionMap.toResponse(data);
  }
}
