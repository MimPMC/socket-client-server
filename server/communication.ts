export interface ServerToClientEvents {
    message: (message:string)=> void;
    createRoom: (data: string) => void;
    listOfRooms: (rooms: string[]) => string[];
  }
  
export  interface ClientToServerEvents {
    message: (message:string)=> void;
    join:(room:string)=> void;
    leave:(room:string)=> void;
    createRoom: (data: string) => void;
  }
  
export  interface InterServerEvents {
    ping: () => void;
  }
  
 export interface SocketData {
    name: string;
    age: number;
  }