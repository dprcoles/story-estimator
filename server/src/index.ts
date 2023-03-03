import "dotenv/config";
import Fastify from "fastify";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import {
  GetIssuesByJqlQuery,
  GetJiraIntegrationByIdQuery,
  getPlayerQuery,
  getSessionQuery,
  getTeamQuery,
} from "./queries";
import {
  createPlayerCommand,
  createSessionCommand,
  updatePlayerCommand,
} from "./commands";
import {
  ICreatePlayerBody,
  ICreateSessionBody,
  IJiraIntegrationByIdParams,
  IJqlQueryByIdQuery,
  IPlayerByIdParams,
  ISessionByIdParams,
  ITeamByAliasParams,
  IUpdatePlayerBody,
  IUpdatePlayerParams,
  Player,
  Room,
} from "./types";
import { handleOnConnection, registerHandlers } from "./handlers";

const fastify = Fastify();
const prisma = new PrismaClient({ log: ["info"] });

let roomPlayers: Player[] = [];
let rooms: Room[] = [];

fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PATCH"],
});

const io = new Server(fastify.server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  },
});

setInterval(() => {
  io.emit("ping");
}, 10000);

fastify.get("/ping", async (_request: any, reply: any) => {
  reply.send("pong 🏓");
});

fastify.post<{ Body: ICreatePlayerBody }>("/player", async (req, reply) => {
  const { name, defaultType, emoji } = req.body;

  const result = await createPlayerCommand(prisma, {
    name,
    defaultType,
    emoji,
  });

  reply.send(result);
});

fastify.get<{ Params: IPlayerByIdParams }>(
  "/player/:id",
  { schema: { params: { properties: { id: { type: "number" } } } } },
  async (req, reply) => {
    const { id } = req.params;

    try {
      const player = await getPlayerQuery(prisma, { id });

      reply.send(player);
    } catch {
      reply.statusCode = 400;
      reply.send({ message: "[InvalidPlayerId]" });
    }
  }
);

fastify.patch<{ Body: IUpdatePlayerBody; Params: IUpdatePlayerParams }>(
  "/player/:id",
  { schema: { params: { properties: { id: { type: "number" } } } } },
  async (req, reply) => {
    const { name, defaultType, emoji } = req.body;
    const { id } = req.params;

    const result = await updatePlayerCommand(prisma, {
      id,
      name,
      defaultType,
      emoji,
    });

    reply.send(result);
  }
);

fastify.get<{ Params: ISessionByIdParams }>(
  "/session/:id",
  { schema: { params: { properties: { id: { type: "number" } } } } },
  async (req, reply) => {
    const { id } = req.params;

    try {
      const data = await getSessionQuery(prisma, { id });

      reply.send(data);
    } catch {
      reply.statusCode = 400;
      reply.send({ message: "[InvalidSessionId]" });
    }
  }
);

fastify.post<{ Body: ICreateSessionBody }>(
  "/session",
  { schema: { body: { properties: { teamId: { type: "number" } } } } },
  async (req, reply) => {
    const { teamId, name } = req.body;

    const session = await createSessionCommand(prisma, { name, teamId });

    reply.send({ id: session.id });
  }
);

fastify.get<{ Params: ITeamByAliasParams }>(
  "/team/:alias",
  { schema: { params: { properties: { alias: { type: "string" } } } } },
  async (req, reply) => {
    const { alias } = req.params;

    try {
      const data = await getTeamQuery(prisma, { alias });

      reply.send(data);
    } catch {
      reply.statusCode = 400;
      reply.send({ message: "[InvalidTeamId]" });
    }
  }
);

fastify.get<{ Params: IJiraIntegrationByIdParams }>(
  "/jira-integration/:id",
  { schema: { params: { properties: { id: { type: "number" } } } } },
  async (req, reply) => {
    const { id } = req.params;

    try {
      const data = await GetJiraIntegrationByIdQuery(prisma, { id });

      const safeData = {
        id: data.id,
        configuredById: data.configuredById,
        domain: data.domain,
        jqlQueries: data.jql_queries,
      };

      reply.send(safeData);
    } catch {
      reply.statusCode = 400;
      reply.send({ message: "[InvalidJiraIntegrationId]" });
    }
  }
);

fastify.get<{ Querystring: IJqlQueryByIdQuery }>(
  "/jql",
  {
    schema: {
      querystring: {
        properties: {
          integrationId: { type: "number" },
          queryId: { type: "number" },
        },
      },
    },
  },
  async (req, reply) => {
    const { integrationId, queryId } = req.query;

    try {
      const settings = await GetJiraIntegrationByIdQuery(prisma, {
        id: integrationId,
      });

      const { apiToken, domain, email } = settings;

      const query = settings.jql_queries.find((q: any) => q.id === queryId);

      if (!query) return;

      const data = await GetIssuesByJqlQuery({
        apiToken,
        email,
        domain,
        query: query.query,
      });

      reply.send(data);
    } catch {
      reply.statusCode = 400;
      reply.send({ message: "[InvalidQueryId]" });
    }
  }
);

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

fastify.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server listening at ${address}`);
});

const handleSocketConnection = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  let roomId = parseInt(socket.handshake.query["roomId"] as string, 10);
  const playerId = parseInt(socket.handshake.query["playerId"] as string, 10);
  let session = null;

  const handlerParams = {
    io,
    socket,
    prisma,
    roomId,
    playerId,
    rooms,
    roomPlayers,
    session,
  };

  await handleOnConnection(handlerParams).then(() =>
    registerHandlers(handlerParams)
  );
};

io.on("connection", handleSocketConnection);

