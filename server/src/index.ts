import "dotenv/config";
import Fastify from "fastify";
import short from "short-uuid";
import { Server } from "socket.io";
import fastifyCors from "fastify-cors";
import { Player, PlayerType } from "./types";

const fastify = Fastify();

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

const updateRoom = (roomId: any) => {
  io.to(roomId).emit(
    "update",
    players.filter(p => p.roomId === roomId)
  );
};

const resetGame = (roomId: any) => {
  const roomPlayers = [...players].filter(p => p.roomId === roomId);
  roomPlayers.forEach(p => (p.vote = undefined));

  io.to(roomId).emit("reset");
  io.to(roomId).emit("update", roomPlayers);
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
      players = [
        ...players.filter(p => p.id !== socket.id),
        { ...player, name },
      ];
    }
    updateRoom(roomId);
  });

  socket.on("type", type => {
    const player = [...players].find(p => p.id === socket.id);
    if (player) {
      players = [
        ...players.filter(p => p.id !== socket.id),
        { ...player, type, vote: undefined },
      ];
    }
    updateRoom(roomId);
  });

  socket.on("emoji", emoji => {
    const player = [...players].find(p => p.id === socket.id);
    if (player) {
      players = [
        ...players.filter(p => p.id !== socket.id),
        { ...player, emoji },
      ];
    }
    updateRoom(roomId);
  });

  socket.on("vote", vote => {
    const player = [...players].find(p => p.id === socket.id);
    if (player) {
      players = [
        ...players.filter(p => p.id !== socket.id),
        { ...player, vote },
      ];
    }

    const votersInRoom = [...players].filter(
      p => p.roomId === roomId && p.type === PlayerType.Voter
    );
    if (votersInRoom.every(p => p.vote)) {
      io.to(roomId || "").emit("show");
    }
    updateRoom(roomId);
  });

  socket.on("show", () => {
    io.to(roomId || "").emit("show");
  });

  socket.on("reset", () => {
    resetGame(roomId);
  });

  socket.on("pong", () => {
    players.find(p => p.id === socket.id);
  });

  socket.on("disconnect", () => {
    players = [...players].filter(player => player.id !== socket.id);
    updateRoom(roomId);
  });
});

