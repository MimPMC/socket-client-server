export interface ServerToClientEvents {
    message: (message:string)=> void;
    rooms: (room: string[]) => void;
    
  }
  
export  interface ClientToServerEvents {
    message: (room: string, message:string) => void;
    join:(room: string, name: string, ack: () => void)=> void;
    leave:(room: string)=> void;
  }
  
export  interface InterServerEvents {
    ping: () => void;
  }
  
 export interface SocketData {
    name: string;
    age: number;
  }

  export interface Message {
    name: string;
    message: string;
  }