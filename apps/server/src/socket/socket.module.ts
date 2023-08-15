import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { SocketStore } from "./socket.store";

@Module({
  imports: [InfrastructureModule],
  providers: [SocketStore],
  exports: [SocketStore],
})
export class SocketModule {}
