import { Server } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData
} from "./communication";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("message", (room, message) => {
    io.to(room).emit("message", socket.data.name!, message);
    console.log(room, socket.data.name, message);
  });

  socket.on("join", (room, name, ack) => {
    if (socket.data.room) {
      socket.leave(socket.data.room);
    }
    
    socket.join(room);

    socket.data.name = name;
    socket.data.room = room;

    ack();
    io.emit("rooms", getRooms());
  });

  socket.on("typing", (room) => {
    if (socket.data.name) {
      socket.to(room).emit("typing", socket.data.name);
    }
  });

  socket.on("stop_typing", (room) => {
    if (socket.data.name) {
      socket.to(room).emit("stop_typing", socket.data.name);
    }
  });

  socket.emit("rooms", getRooms());

  socket.on("leave", (room) => {
    socket.leave(room);
    io.emit("rooms", getRooms());
  });
  
  socket.on("disconnect", () => {
    io.emit("rooms", getRooms());
  })
});

export function getRooms() {
  const { rooms, sids } = io.sockets.adapter;
  const roomsFound: { name: string; users: string[] }[] = [];

  for (const [name, setOfSocketIds] of rooms) {
    if (!sids.has(name)) {
      const users = Array.from(setOfSocketIds)
        .map((socketId) => {
          const socket = io.sockets.sockets.get(socketId);
          return socket?.data.name;
        })
        .filter((name): name is string => Boolean(name));

      roomsFound.push({ name, users });
    }
  }

  return roomsFound;
}

export function rooms() {
  const roomsFound = getRooms();
  io.emit("rooms", roomsFound);
}

io.listen(3000);
console.log("listening on port 3000");
