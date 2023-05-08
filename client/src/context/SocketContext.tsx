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
  roomList: string[];
  roomsFound: string[];
}

const SocketContext = createContext<ContextValues>(null as any);
export const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<string>();
  const [roomList, setRoomList] = useState<string[]>([]);
  const [roomsFound, setRoomsFound] = useState<string[]>([]);
  const socket = io();


  const getRoomList = () => {
    socket.emit('rooms', (rooms: string[]) => {
      setRoomList(rooms);
    });
  };
  
  const joinRoom = (room: string, name: string) => {
    socket.emit('join', room, name, () => {
      setRoom(room);
    });
  };

  const sendMessage = (message: string) => {
    if (!room) throw Error("Can't send message without a room");
    socket.emit('message', room, message);
  }

  useEffect(()=> {
    getRoomList();
  },);

  useEffect(() => {
    socket.emit('roomsFound', roomsFound);
    function connect() {
        console.log('connected to server')  
    }
    function disconnect() {
        console.log('disconnected from server')  
    }
    function message(name: string, message: string) {
        setMessages((messages) => [...messages, { name, message }]);
    }
    
    function handleRoomsFound(roomsFound: string[]) {
      console.log(roomsFound);
    }

    socket.on('rooms', (rooms: string[]) => {
      setRoomsFound(rooms);
    });

    socket.on('connect', connect);
    socket.on('disconnect', disconnect);
    socket.on('message', message);

    return ()=> {
        socket.off('roomsFound', handleRoomsFound);
        socket.off('connect', connect);
        socket.off('disconnect', disconnect);
        socket.off('message', message);
    }
  }, );

  return (
    <SocketContext.Provider value={{ joinRoom, sendMessage, room, messages, roomList, roomsFound }}>
  {children}
</SocketContext.Provider>

  );
}

export default SocketProvider;
