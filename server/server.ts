import { Server } from 'socket.io';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './communication';

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();

io.on('connection', (socket) => {
  socket.join('some room')
  console.log('join some room')
});

io.listen(3000);
console.log('listening on port 3000');
