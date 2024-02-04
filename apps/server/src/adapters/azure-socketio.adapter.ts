import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server } from "socket.io";
import { useAzureSocketIO } from "@azure/web-pubsub-socket.io";

export class AzureSocketIoAdapter extends IoAdapter {
  server: Server;

  async createAzureSocketIOServer(port: number, options?: any): Promise<any> {
    const io = new Server(this.httpServer && port === 0 ? this.httpServer : port, options);

    const server = await useAzureSocketIO(io, {
      hub: process.env.HUB_NAME || "story_estimator_hub",
      connectionString: process.env.HUB_CONNECTION_STRING,
    });

    this.server = server;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createIOServer(port: number, options?: any): any {
    return this.server;
  }
}
