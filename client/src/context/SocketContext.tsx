import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import type {
  Message
} from "../../../server/communication";

interface ContextValues {
  joinRoom: (room: string, name: string) => void;
  sendMessage: (message: string) => void;
  room?: string;
  messages: Message[];
}

const socket = io();

const SocketContext = createContext<ContextValues>(null as any);
export const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<string>();

  const joinRoom = (room: string, name: string) => {
    socket.emit('join', room, name, () => {
      setRoom(room);
    });
  };

  const sendMessage = (message: string) => {
    if (!room) throw Error("Can't send message without a room");
    socket.emit('message', room, message);
  }

  useEffect(() => {
    function connect() {
        console.log('connected to server')  
    }
    function disconnect() {
        console.log('disconnected from server')  
    }
    function message(name: string, message: string) {
        setMessages((messages) => [...messages, { name, message }]);
    }
    function rooms(rooms: string[]) {
      console.log(rooms);
    }

    socket.on('connect', connect);
    socket.on('disconnect', disconnect);
    socket.on('message', message)
    socket.on('rooms', rooms);
    return()=> {
        socket.off('connect', connect)
        socket.off('disconnect', disconnect)
        socket.off('message', message)
        socket.off('rooms', rooms);
    }
  }, []);

  return (
    <SocketContext.Provider value={{ joinRoom, sendMessage, room, messages }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
