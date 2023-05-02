import { PropsWithChildren, createContext } from "react";
import { Socket, io } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../../server/communication.ts";


interface ContextValues {
  socket: Socket;
}
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

const SocketContext = createContext<ContextValues>(null as any);

export function SocketProvider({ children }: PropsWithChildren) {
  return <SocketContext.Provider value={{ socket }}></SocketContext.Provider>;
}
