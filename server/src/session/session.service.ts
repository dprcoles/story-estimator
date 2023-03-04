import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Sessions } from "@prisma/client";
import { GetSessionQuery } from "src/session/queries/get-session.query";
import { CreateSessionCommand } from "src/session/commands/create-session.command";
import { Session } from "./interfaces/session.interface";
import { CreateSessionDto } from "./dto/create-session.dto";

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async createAsync(data: CreateSessionDto): Promise<Sessions> {
    const command = new CreateSessionCommand(this.prisma);
    command.name = data.name;
    command.teamId = data.teamId;

    return await command.executeAsync();
  }

  async getAsync(id: number): Promise<Session> {
    const query = new GetSessionQuery(this.prisma);
    query.id = id;

    return await query.executeAsync();
  }
}
