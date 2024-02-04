import { Injectable } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { TeamService } from "src/application/team/team.service";
import { SocketRoomPrefix } from "../enums/socket.enums";
import { TeamServerEvent } from "./enums/team-events.enum";

@Injectable()
export class TeamEventsHandler {
  constructor(private teamService: TeamService) {}

  public server: Server = null;

  async connectAsync(id: number, playerId: number, client: Socket) {
    await client.join(`${SocketRoomPrefix.Team}${id.toString()}`);
  }

  async updateAsync(id: number) {
    try {
      const data = await this.teamService.getByIdAsync(id);

      this.server.to(`${SocketRoomPrefix.Team}${id.toString()}`).emit(TeamServerEvent.Update, data);
    } catch (e) {
      console.error(`Unable to emit event to team ${id.toString()}`);
    }
  }
}
