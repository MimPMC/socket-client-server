import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import type {
  Message
} from "../../../server/communication";

interface ContextValues {
  joinRoom: (room: string, name: string) => void;
  sendMessage: (message: string) => void;
  userTyping: (isTyping: boolean) => void;
  typingUsers: string[];
  room?: string;
  messages: Message[];
  roomList: { name: string; users: string[] }[];
  getRoomList: () => void;
}

const socket = io();

const SocketContext = createContext<ContextValues>(null as any);
export const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<string>();
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [roomList, setRoomList] = useState<{ name: string; users: string[] }[]>([]);
  // ...

  const getRoomList = () => {
    socket.emit('rooms', (rooms: { name: string; users: string[] }[]) => {
      setRoomList(rooms);
      console.log(rooms);
      console.log(roomList);
    });
  };
  

  // Add two new functions to emit typing and stop_typing events
const userTyping = (isTyping: boolean) => {
  if (!room) throw Error("Can't send typing event without a room");
  socket.emit(isTyping ? 'typing' : 'stop_typing', room);
};
  

  const joinRoom = (newRoom: string, name: string) => {
    if (room) {
      socket.emit('leave', room);
    }
    socket.emit('join', newRoom, name, () => {
      setRoom(newRoom);
      setMessages([]);
    });
  };

  const sendMessage = (message: string) => {
    if (!room) throw Error("Can't send message without a room");
    socket.emit('message', room, message);
  }

  useEffect(()=> {
    getRoomList();
  }, [roomList])


  useEffect(() => {
    function connect() {
        console.log('connected to server')  
    }
    function disconnect() {
        console.log('disconnected from server')  
    }
    function leave(room: string) {
      setRoom(undefined);
    }
    function typing(name: string) {
      setTypingUsers((users) => [...users, name]);
    }
    function stop_typing(name: string) {
      setTypingUsers((users) => users.filter((user) => user !== name));
    }
    function message(name: string, message: string) {
        setMessages((messages) => [...messages, { name, message }]);
    }
    function rooms(rooms: { name: string; users: string[] }[]) {
      setRoomList(rooms);
    }
    

    socket.on('connect', connect);
    socket.on('disconnect', disconnect);
    socket.on('leave', leave)
    socket.on('typing', typing);
    socket.on('stop_typing', stop_typing);
    socket.on('message', message)
    socket.on('rooms', rooms);
    return()=> {
        socket.off('connect', connect)
        socket.off('disconnect', disconnect)
        socket.off('leave', leave);
        socket.off('typing', typing);
        socket.off('stop_typing', stop_typing);
        socket.off('message', message)
        socket.off('rooms', rooms);
    }
  }, []);

  return (
    <SocketContext.Provider value={{ joinRoom, sendMessage, userTyping, typingUsers, room, messages, roomList, getRoomList }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;

