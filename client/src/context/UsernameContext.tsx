import { createContext, useContext, useState } from "react";

interface UsernameContextValues {
  username: string;
  setUsername: (username: string) => void;
}

const UsernameContext = createContext<UsernameContextValues>(null as any);
export const useUsername = () => useContext(UsernameContext);

export function UsernameProvider({ children }: React.PropsWithChildren<{}>) {
  const [username, setUsername] = useState("");

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
}
