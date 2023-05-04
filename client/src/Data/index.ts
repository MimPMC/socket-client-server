import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers:any = [];

const addNewUser = (username: string, socketId:any) => {
  !onlineUsers.some((user:any) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId:any) => {
  onlineUsers = onlineUsers.filter((user:any) => user.socketId !== socketId);
};

const getUser = (username:string) => {
  return onlineUsers.find((user:any) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

  socket.on("sendText", ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getText", {
      senderName,
      text,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(5000);
