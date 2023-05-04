import { PropsWithChildren, createContext, useState, useContext, useEffect} from "react";
import { Socket, io } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../server/communication";

interface ContextValues {
  socket: Socket;
}

const SocketContext = createContext<ContextValues>(null as any);
export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: PropsWithChildren) {
  const [socket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>(
    io()
  );

  useEffect(() => {
    function connect() {
        console.log('connected to server')  
    }
    function disconnect() {
        console.log('disconnected from server')  
    }
    function message(message:string) {
        console.log(message)  
    }
    socket.on('connect', connect);
    socket.on('disconnect', disconnect);
    socket.on('message', message)
    return()=> {
        socket.off('connect', connect)
        socket.off('disconnect', disconnect)
        socket.off('message', message)
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
