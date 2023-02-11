import "dotenv/config";
import Fastify from "fastify";
import { Server } from "socket.io";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import retry from "async-retry";
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
  PlayerType,
  Room,
  RoomIntegrations,
  ShowType,
} from "./types";

const fastify = Fastify();
const prisma = new PrismaClient({ log: ["info"] });

let roomPlayers: Player[] = [];
let rooms: Room[] = [];

const generateStoryId = (roomId: number) => {
  return Math.floor(Math.random() * 1000000) + roomId;
};

const getTimeInSeconds = () => Math.floor(Date.now() / 1000);

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
      const data = await getTeamQuery(prisma, { alias, rooms });

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

fastify.listen(process.env.PORT || 4000, "0.0.0.0", (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server listening at ${address}`);
});

const updateRoom = (roomId: number) => {
  io.to(roomId.toString()).emit("update", {
    players: roomPlayers.filter(p => p.roomId === roomId),
    room: rooms.find(r => r.id === roomId),
  });
};

const resetGame = (roomId: number) => {
  const playersInRoom = [...roomPlayers].filter(p => p.roomId === roomId);
  playersInRoom.forEach(p => (p.vote = undefined));

  io.to(roomId.toString()).emit("reset");
  io.to(roomId.toString()).emit("update", {
    players: playersInRoom,
    room: rooms.find(r => r.id === roomId),
  });
};

const getTotalTimeSpent = (
  current: number | undefined,
  start: number | undefined,
  end: number | undefined
) => {
  if (typeof start === "undefined" || typeof end === "undefined") return 0;
  return (
    (typeof current === "undefined" ? 0 : current) +
    Math.floor(end - start) * 1000
  );
};

const updateActiveStory = (roomId: number, nextActiveId: number | null) => {
  const roomIndex = rooms.findIndex(r => r.id === roomId);
  const activeStoryIndex = rooms[roomIndex].stories.findIndex(s => s.active);

  if (activeStoryIndex !== -1) {
    rooms[roomIndex].stories[activeStoryIndex].active = false;
    rooms[roomIndex].stories[activeStoryIndex].endSeconds = getTimeInSeconds();
    rooms[roomIndex].stories[activeStoryIndex].totalTimeSpent =
      getTotalTimeSpent(
        rooms[roomIndex].stories[activeStoryIndex].totalTimeSpent,
        rooms[roomIndex].stories[activeStoryIndex].startSeconds,
        getTimeInSeconds()
      );
  }

  if (nextActiveId) {
    const nextStoryIndex = rooms[roomIndex].stories.findIndex(
      s => s.id === nextActiveId
    );

    rooms[roomIndex].stories[nextStoryIndex].active = true;
    rooms[roomIndex].stories[nextStoryIndex].startSeconds = getTimeInSeconds();
    rooms[roomIndex].stories[nextStoryIndex].endSeconds = undefined;
  }

  resetGame(roomId);
};

io.on("connection", async socket => {
  let roomId = parseInt(socket.handshake.query["roomId"] as string, 10);
  const playerId = parseInt(socket.handshake.query["playerId"] as string, 10);
  let session = null;

  if (roomId) {
    session = await retry(
      async () => {
        return await prisma.sessions.findFirstOrThrow({
          where: { id: roomId },
        });
      },
      {
        retries: 5,
      }
    );
  }

  if (!session) {
    socket.emit("connectionError");
    return;
  }

  if (playerId && !session.playerIds.includes(playerId)) {
    await prisma.sessions.update({
      data: { playerIds: { push: playerId } },
      where: { id: session.id },
    });
  }

  if (!rooms.find(r => r.id === roomId)) {
    let integrations: RoomIntegrations | null = null;
    if (session.teamId) {
      const teamData = await prisma.teams.findFirst({
        where: { id: session.teamId },
        include: { integrations_jira: true },
      });

      integrations = {
        jira: teamData?.integrations_jira?.id,
      };
    }

    rooms.push({
      id: roomId,
      name: session.name,
      settings: {
        countdown: true,
        fastMode: false,
      },
      stories: [],
      active: true,
      teamId: session.teamId,
      integrations,
    });
  }

  socket.join(roomId.toString());

  if (!roomPlayers.map(x => x.id).includes(playerId)) {
    const playerInfo = await prisma.players.findFirst({
      where: { id: playerId },
    });
    if (playerInfo) {
      roomPlayers.push({
        id: playerId,
        admin: roomPlayers.length === 0,
        name: playerInfo.name,
        type: playerInfo.defaultType as PlayerType,
        emoji: playerInfo.emoji,
        roomId: roomId,
        vote: undefined,
      });
    }
  }
  updateRoom(roomId);

  socket.on("updatePlayer", data => {
    const player = [...roomPlayers].find(p => p.id === data.id);
    if (player) {
      const playerIndex = roomPlayers.findIndex(x => x.id === data.id);
      roomPlayers[playerIndex] = {
        ...player,
        ...data,
        vote: data.type !== player.type ? undefined : player.vote,
      };
    }
    updateRoom(roomId);
  });

  socket.on("settings", settings => {
    if (roomId) {
      const roomIndex = rooms.findIndex(r => r.id == roomId);
      rooms[roomIndex].settings = settings;

      const currentRoomAdminIndex = roomPlayers.findIndex(
        rp => rp.roomId === roomId && rp.admin
      );
      const playerToUpdateIndex = roomPlayers.findIndex(
        rp => rp.id === settings.admin
      );

      if (currentRoomAdminIndex > -1) {
        roomPlayers[currentRoomAdminIndex].admin = false;
      }

      if (playerToUpdateIndex > -1) {
        roomPlayers[playerToUpdateIndex].admin = true;
      }
    }
    updateRoom(roomId);
  });

  socket.on("vote", vote => {
    const player = [...roomPlayers].find(p => p.id === playerId);
    if (player) {
      const playerIndex = roomPlayers.findIndex(x => x.id === playerId);
      roomPlayers[playerIndex] = { ...player, vote };
      io.to(roomId.toString() || "").emit("vote");
    }

    const votersInRoom = [...roomPlayers].filter(
      p => p.roomId === roomId && p.type === PlayerType.Voter
    );
    if (votersInRoom.every(p => p.vote)) {
      io.to(roomId.toString() || "").emit("show");
    }
    updateRoom(roomId);
  });

  socket.on("show", (type: ShowType) => {
    io.to(roomId.toString() || "").emit("show", type);
  });

  socket.on("reset", () => {
    resetGame(roomId);
  });

  socket.on("complete", ({ finalVote, storyId }) => {
    if (roomId) {
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      const storyIndex = rooms[roomIndex].stories.findIndex(
        s => s.id === storyId
      );

      const voters = roomPlayers.filter(p => p.type === PlayerType.Voter);
      const spectators = roomPlayers.filter(
        p => p.type === PlayerType.Spectator
      );

      rooms[roomIndex].stories[storyIndex].voterIds = voters?.map(v => v.id);
      rooms[roomIndex].stories[storyIndex].spectatorIds = spectators?.map(
        s => s.id
      );
      rooms[roomIndex].stories[storyIndex].votes = voters?.map(v => ({
        playerId: v.id,
        vote: v.vote,
      }));
      rooms[roomIndex].stories[storyIndex].estimate = finalVote;

      updateActiveStory(roomId, null);

      if (!rooms[roomIndex].stories.find(s => !s.estimate)) return;

      if (
        rooms[roomIndex].stories.length > storyIndex + 1 &&
        !rooms[roomIndex].stories[storyIndex + 1].estimate
      ) {
        updateActiveStory(roomId, rooms[roomIndex].stories[storyIndex + 1].id);
        return;
      }

      const nextIndex = rooms[roomIndex].stories.findIndex(s => !s.estimate);
      updateActiveStory(roomId, rooms[roomIndex].stories[nextIndex].id);
    }
  });

  socket.on("completeSession", async () => {
    const roomIndex = rooms.findIndex(r => r.id === roomId);
    const stories = rooms[roomIndex].stories;

    stories.forEach(async s => {
      await prisma.stories.create({
        data: {
          description: s.description,
          startSeconds: s.startSeconds,
          endSeconds: s.endSeconds,
          estimate: s.estimate,
          totalTimeSpent: s.totalTimeSpent,
          sessionId: roomId,
          votes: {
            create: s.votes.map(v => ({
              playerId: v.playerId,
              vote: v.vote || "",
            })),
          },
          spectators: {
            create: s.spectatorIds.map(s => ({
              playerId: s,
            })),
          },
        },
      });
    });

    rooms[roomIndex].active = false;

    updateRoom(roomId);
  });

  socket.on("addStory", story => {
    if (roomId) {
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      const storyId = generateStoryId(roomId);

      rooms[roomIndex].stories.push({
        id: storyId,
        description: story.description,
        roomId: roomId,
        active: false,
        estimate: undefined,
        startSeconds: undefined,
        endSeconds: undefined,
        totalTimeSpent: undefined,
        spectatorIds: [],
        voterIds: [],
        votes: [],
      });

      if (!rooms[roomIndex].stories.find(s => s.active)) {
        updateActiveStory(roomId, storyId);
        return;
      }
    }
    updateRoom(roomId);
  });

  socket.on("editStory", story => {
    if (roomId) {
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      const storyIndex = rooms[roomIndex].stories.findIndex(
        s => s.id === story.id
      );
      rooms[roomIndex].stories[storyIndex].description = story.description;
    }
    updateRoom(roomId);
  });

  socket.on("importStories", stories => {
    if (roomId) {
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      let firstAddedStoryId = 0;

      stories.forEach((story: string) => {
        const storyId = generateStoryId(roomId);

        if (!firstAddedStoryId) {
          firstAddedStoryId = storyId;
        }

        rooms[roomIndex].stories.push({
          id: storyId,
          description: story,
          roomId: roomId,
          active: false,
          estimate: undefined,
          startSeconds: undefined,
          endSeconds: undefined,
          totalTimeSpent: undefined,
          spectatorIds: [],
          voterIds: [],
          votes: [],
        });
      });

      if (!rooms[roomIndex].stories.find(s => s.active)) {
        updateActiveStory(roomId, firstAddedStoryId);
        return;
      }
    }
  });

  socket.on("setActiveStory", storyId => {
    if (roomId) {
      updateActiveStory(roomId, storyId);
    }
  });

  socket.on("pong", () => {
    roomPlayers.find(p => p.id === playerId);
  });

  socket.on("disconnect", () => {
    roomPlayers = [...roomPlayers].filter(player => player.id !== playerId);
    updateRoom(roomId);
  });
});

