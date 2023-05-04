import { Server } from 'socket.io';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './communication';


const rooms: string[]= []

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();

io.on('connection', (socket) => {
  console.log("user connected" + socket.id)

  //JOIN ROOM
  socket.on("joinRoom", (data) => {
    socket.join(data);
    rooms.push(data)
    socket.emit("listOfRooms", rooms)

    
  })
});

io.listen(3000);
console.log('listening on port 3000');
