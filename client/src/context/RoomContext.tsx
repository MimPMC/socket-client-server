import { createContext, useContext, useState } from "react";

interface RoomContextValues {
  rooms: string[]
  setRooms: React.Dispatch<React.SetStateAction<string[]>>
}


export const RoomContext = createContext<RoomContextValues>(null as any);

export const useRoomname = () => useContext(RoomContext);

export function RoomProvider({ children }: React.PropsWithChildren) {
    const [rooms, setRooms] = useState<string[]>([]);

  return (
    <RoomContext.Provider value={{ rooms, setRooms }}>
      {children}
    </RoomContext.Provider>
  );
}
