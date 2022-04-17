import "dotenv/config";
import Fastify from "fastify";
import short from "short-uuid";
import { Server } from "socket.io";

const fastify = Fastify();

const io = new Server(fastify.server, {
  cors: {
    origin: process.env.ORIGIN || "http://localhost:3000",
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

let players: any[] = [];

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
  players.push({ id: socket.id, name: "", roomId: roomId });

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

  socket.on("vote", vote => {
    const player = [...players].find(p => p.id === socket.id);
    if (player) {
      players = [
        ...players.filter(p => p.id !== socket.id),
        { ...player, vote },
      ];
    }

    const playersInRoom = [...players].filter(p => p.roomId === roomId);
    if (playersInRoom.every(p => p.vote)) {
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

