import { Module } from "@nestjs/common";
import { PlayerGatewayModule } from "src/socket/player/player.module";
import { RoomGatewayModule } from "src/socket/room/room.module";
import { TeamGatewayModule } from "src/socket/team/team.module";
import { ApiModule } from "./api/api.module";

@Module({
  imports: [
    ApiModule,
    PlayerGatewayModule,
    RoomGatewayModule,
    TeamGatewayModule,
  ],
  providers: [],
})
export class AppModule {}
