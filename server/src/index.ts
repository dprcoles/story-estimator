import "dotenv/config";
import Fastify from "fastify";
import short from "short-uuid";
import { Server } from "socket.io";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import {
  ICreatePlayerBody,
  IPlayerByIdParams,
  ISessionByIdParams,
  IUpdatePlayerBody,
  IUpdatePlayerParams,
  Player,
  PlayerInfo,
  players,
  PlayerType,
  Room,
  SessionDetails,
  ShowType,
  stories,
} from "./types";

const fastify = Fastify();
const prisma = new PrismaClient({ log: ["info"] });

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

  const result = await prisma.players.create({
    data: {
      defaultType: defaultType,
      emoji: emoji,
      name: name,
    },
  });

  reply.send(result);
});

fastify.get<{ Params: IPlayerByIdParams }>(
  "/player/:id",
  async (req, reply) => {
    const { id } = req.params;

    const player = await prisma.players.findFirst({ where: { id: id } });

    reply.send(player);
  }
);

fastify.patch<{ Body: IUpdatePlayerBody; Params: IUpdatePlayerParams }>(
  "/player/:id",
  async (req, reply) => {
    const { name, defaultType, emoji } = req.body;
    const { id } = req.params;

    const result = await prisma.players.update({
      data: {
        defaultType: defaultType,
        emoji: emoji,
        name: name,
      },
      where: { id: id },
    });

    reply.send(result);
  }
);

fastify.get<{ Params: ISessionByIdParams }>(
  "/session/:id",
  async (req, reply) => {
    const { id } = req.params;

    try {
      const session = await prisma.sessions.findFirst({ where: { id: id } });
      const players = await prisma.players.findMany({
        where: { id: { in: session?.playerIds } },
      });
      const stories = await prisma.stories.findMany({
        where: { id: { in: session?.storyIds } },
      });

      const mappedPlayers: PlayerInfo[] = players.map((x: players) => ({
        emoji: x.emoji,
        id: x.id,
        name: x.name,
        type: x.defaultType as PlayerType,
      }));

      const data: SessionDetails = {
        id: id,
        players: mappedPlayers,
        stories: stories.map((x: stories) => ({
          description: x.description,
          endSeconds: x.endSeconds,
          estimate: x.estimate,
          id: x.id,
          sessionId: x.sessionId,
          spectators: mappedPlayers.filter(p => x.spectatorIds.includes(p.id)),
          startSeconds: x.startSeconds,
          totalTimeSpent: x.totalTimeSpent,
          voters: mappedPlayers.filter(p => x.voterIds.includes(p.id)),
          votes: x.votes.map(v => ({
            playerId: v.playerId,
            vote: v.vote ?? undefined,
          })),
        })),
      };

      reply.send(data);
    } catch {
      reply.statusCode = 400;
      reply.send("[InvalidSessionId]");
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

let players: Player[] = [];
let rooms: Room[] = [];

const updateRoom = (roomId: any) => {
  io.to(roomId).emit("update", {
    players: players.filter(p => p.roomId === roomId),
    room: rooms.find(r => r.id === roomId),
  });
};

const resetGame = (roomId: any) => {
  const roomPlayers = [...players].filter(p => p.roomId === roomId);
  roomPlayers.forEach(p => (p.vote = undefined));

  io.to(roomId).emit("reset");
  io.to(roomId).emit("update", {
    players: roomPlayers,
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

const updateActiveStory = (roomId: any, nextActiveId: string | null) => {
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
  let roomId = socket.handshake.query["roomId"] as string;
  const playerId = socket.handshake.query["playerId"] as string;
  let session = null;

  if (roomId) {
    try {
      session = await prisma.sessions.findUnique({
        where: { id: roomId },
      });
    } catch (err) {
      console.error("[InvalidRoomId]: ", err);
    }
  }

  if (!session) {
    session = await prisma.sessions.create({
      data: { playerIds: [], storyIds: [] },
    });
    roomId = session.id;
  }

  if (playerId && !session.playerIds.includes(playerId)) {
    await prisma.sessions.update({
      data: { playerIds: { push: playerId } },
      where: { id: session.id },
    });
  }

  socket.emit("room", roomId);

  if (!rooms.find(r => r.id === roomId)) {
    rooms.push({
      id: roomId,
      settings: {
        countdown: true,
        fastMode: false,
      },
      stories: [],
      active: true,
    });
  }

  socket.join(roomId);

  if (!players.map(x => x.id).includes(playerId)) {
    const playerInfo = await prisma.players.findFirst({
      where: { id: playerId },
    });
    if (playerInfo) {
      players.push({
        id: playerId,
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
    const player = [...players].find(p => p.id === data.id);
    if (player) {
      const playerIndex = players.findIndex(x => x.id === data.id);
      players[playerIndex] = {
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
    }
    updateRoom(roomId);
  });

  socket.on("vote", vote => {
    const player = [...players].find(p => p.id === playerId);
    if (player) {
      const playerIndex = players.findIndex(x => x.id === playerId);
      players[playerIndex] = { ...player, vote };
      io.to(roomId || "").emit("vote");
    }

    const votersInRoom = [...players].filter(
      p => p.roomId === roomId && p.type === PlayerType.Voter
    );
    if (votersInRoom.every(p => p.vote)) {
      io.to(roomId || "").emit("show");
    }
    updateRoom(roomId);
  });

  socket.on("show", (type: ShowType) => {
    io.to(roomId || "").emit("show", type);
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

      const voters = players.filter(p => p.type === PlayerType.Voter);
      const spectators = players.filter(p => p.type === PlayerType.Spectator);

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

    await prisma.stories.createMany({
      data: stories.map(story => ({
        description: story.description,
        startSeconds: story.startSeconds,
        endSeconds: story.endSeconds,
        estimate: story.estimate,
        voterIds: story.voterIds,
        spectatorIds: story.spectatorIds,
        votes: story.votes,
        totalTimeSpent: story.totalTimeSpent,
        sessionId: roomId,
      })),
    });

    const storyRecords = await prisma.stories.findMany({
      where: { sessionId: roomId },
    });

    await prisma.sessions.update({
      data: { storyIds: { push: storyRecords.map((s: stories) => s.id) } },
      where: { id: roomId },
    });

    rooms[roomIndex].active = false;

    updateRoom(roomId);
  });

  socket.on("addStory", story => {
    if (roomId) {
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      const storyId = short().generate();

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

  socket.on("setActiveStory", storyId => {
    if (roomId) {
      updateActiveStory(roomId, storyId);
    }
  });

  socket.on("pong", () => {
    players.find(p => p.id === playerId);
  });

  socket.on("disconnect", () => {
    players = [...players].filter(player => player.id !== playerId);
    updateRoom(roomId);
  });
});

