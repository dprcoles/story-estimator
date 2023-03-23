import { Injectable } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { TeamService } from "src/team/team.service";
import { SocketRoomPrefix } from "../enums/socket.enums";
import { TeamServerEvent } from "./enums/team-events.enum";

@Injectable()
export class TeamEventsHandler {
  constructor(private teamService: TeamService) {}

  public server: Server = null;

  async connectAsync(id: number, playerId: number, client: Socket) {
    client.join(`${SocketRoomPrefix.Team}${id.toString()}`);
  }

  async updateAsync(id: number) {
    const data = await this.teamService.getByIdAsync(id);

    this.server
      .to(`${SocketRoomPrefix.Team}${id.toString()}`)
      .emit(TeamServerEvent.Update, data);
  }
}
