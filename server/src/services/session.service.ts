import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Sessions } from "@prisma/client";
import getSessionQuery from "src/queries/getSessionQuery";
import createSessionCommand, {
  CreateSessionRequest,
} from "src/commands/createSessionCommand";
import { SessionDetails } from "src/types/session";

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async createAsync(data: CreateSessionRequest): Promise<Sessions | null> {
    return await createSessionCommand(this.prisma, data);
  }

  async getAsync(id: number): Promise<SessionDetails | null> {
    return await getSessionQuery(this.prisma, id);
  }
}
