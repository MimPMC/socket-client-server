export interface ServerToClientEvents {
    message: (name: string, message: string) => void;
    rooms: (rooms: { name: string; users: string[] }[]) => void;
    typing: (name: string) => void;
    stop_typing: (name: string) => void;
  }
  
export  interface ClientToServerEvents {
    message: (room: string, message: string) => void;
    join:(room: string, name: string, ack: () => void) => void;
    leave:(room: string) => void;
    typing: (room: string) => void;
    stop_typing: (room: string) => void;
    
  }
  
export  interface InterServerEvents {
    ping: () => void;
  }
  
 export interface SocketData {
    name: string;
  }

  export interface Message {
    name: string;
    message: string;
  }