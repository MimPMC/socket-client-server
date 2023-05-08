import { Server } from 'socket.io';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './communication';

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('message', (room, message) => {
    io.to(room).emit('message', socket.data.name!, message);
    console.log(room, socket.data.name, message);
  });

  socket.on('join', (room, name, ack) => {
    socket.data.name = name;
    socket.join(room);
    ack();
    // When a user joins a room send an updated
    // list of rooms to everyone
    io.emit('rooms', getRooms());
  });

  // When a new user connects send the list of rooms
  socket.emit('rooms', getRooms());
  socket.on('getrooms', getRooms())
});

export function getRooms() {
  const { rooms } = io.sockets.adapter;
  const roomsFound: string[] = [];

  for (const [name, setOfSocketIds] of rooms) {
    // An actual real room that we created
    if (!setOfSocketIds.has(name)) {
      roomsFound.push(name);
    }
  }

  return roomsFound;
}

export function rooms() {
  const roomsFound = getRooms();
  io.emit('rooms', roomsFound);
}

io.listen(3000);
console.log('listening on port 3000');
