import "dotenv/config";
import Fastify from "fastify";
import short from "short-uuid";
import { Server } from "socket.io";
import fastifyCors from "fastify-cors";
import { Player, PlayerType, Room, ShowType } from "./types";

const fastify = Fastify();

const getTimeInSeconds = () => Math.floor(Date.now() / 1000);

fastify.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST"],
});

const io = new Server(fastify.server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

setInterval(() => {
  io.emit("ping");
  log();
}, 10000);

fastify.get("/ping", async (_request: any, reply: any) => {
  reply.send("pong 🏓");
});

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

const log = () => {
  const rooms = [...players].map(e => e.roomId);
  if (rooms) {
    rooms
      .filter((val, i, arr) => arr.indexOf(val) === i)
      .map(room => {
        const playerCount = [...players].filter(p => p.roomId === room).length;
        console.log(`🃏 Room: ${room} | Players: ${playerCount}`);
      });
  }
};

io.on("connection", socket => {
  console.log("🔌 A User Has Connected: ", socket.id);
  const roomId = socket.handshake.query["roomId"] || short.generate();

  socket.emit("room", roomId);

  if (!rooms.find(r => r.id === roomId)) {
    rooms.push({
      id: roomId as string,
      settings: {
        countdown: true,
        fastMode: false,
      },
      stories: [
        {
          id: short.generate(),
          roomId: roomId as string,
          description: "Story #1",
          active: true,
          vote: undefined,
          startSeconds: getTimeInSeconds(),
          endSeconds: undefined,
          totalTimeSpent: undefined,
        },
      ],
    });
  }

  socket.join(roomId);
  players.push({
    id: socket.id,
    name: "",
    type: PlayerType.Voter,
    emoji: "🤔",
    roomId: roomId,
    vote: undefined,
  });

  socket.on("name", name => {
    const player = [...players].find(p => p.id === socket.id);
    if (player) {
      const playerIndex = players.findIndex(x => x.id === socket.id);
      players[playerIndex] = { ...player, name };
    }
    updateRoom(roomId);
  });

  socket.on("type", type => {
    const player = [...players].find(p => p.id === socket.id);
    if (player) {
      const playerIndex = players.findIndex(x => x.id === socket.id);
      players[playerIndex] = { ...player, type, vote: undefined };
    }
    updateRoom(roomId);
  });

  socket.on("emoji", emoji => {
    const player = [...players].find(p => p.id === socket.id);
    if (player) {
      const playerIndex = players.findIndex(x => x.id === socket.id);
      players[playerIndex] = { ...player, emoji };
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
    const player = [...players].find(p => p.id === socket.id);
    if (player) {
      const playerIndex = players.findIndex(x => x.id === socket.id);
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

      rooms[roomIndex].stories[storyIndex].vote = finalVote;

      if (rooms[roomIndex].stories.filter(s => !s.vote).length === 0) {
        const nextRoomId = short.generate();
        rooms[roomIndex].stories = [
          ...rooms[roomIndex].stories,
          {
            id: nextRoomId,
            roomId: roomId as string,
            description: `Story #${rooms[roomIndex].stories.length + 1}`,
            active: true,
            vote: undefined,
            startSeconds: getTimeInSeconds(),
            endSeconds: undefined,
            totalTimeSpent: undefined,
          },
        ];
        updateActiveStory(roomId, nextRoomId);
        return;
      }

      if (
        rooms[roomIndex].stories.length > storyIndex + 1 &&
        !rooms[roomIndex].stories[storyIndex + 1].vote
      ) {
        updateActiveStory(roomId, rooms[roomIndex].stories[storyIndex + 1].id);
      } else {
        const nextIndex = rooms[roomIndex].stories.findIndex(s => !s.vote);
        updateActiveStory(roomId, rooms[roomIndex].stories[nextIndex].id);
      }
    }
  });

  socket.on("addStory", story => {
    if (roomId) {
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      rooms[roomIndex].stories.push({
        ...story,
        id: short.generate(),
        roomId: roomId as string,
        active: false,
        vote: undefined,
        startSeconds: undefined,
        endSeconds: undefined,
        totalTimeSpent: undefined,
      });
    }
    updateRoom(roomId);
  });

  socket.on("editStory", story => {
    if (roomId) {
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      const storyIndex = rooms[roomIndex].stories.findIndex(
        s => s.id === story.id
      );
      rooms[roomIndex].stories[storyIndex] = story;
    }
    updateRoom(roomId);
  });

  socket.on("setActiveStory", storyId => {
    if (roomId) {
      updateActiveStory(roomId, storyId);
    }
  });

  socket.on("pong", () => {
    players.find(p => p.id === socket.id);
  });

  socket.on("disconnect", () => {
    players = [...players].filter(player => player.id !== socket.id);
    updateRoom(roomId);
  });
});

