import { Server } from 'socket.io';

const io = new Server();

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.listen(3000);
console.log('listening on port 3000');
