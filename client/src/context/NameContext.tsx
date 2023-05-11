import { createContext, PropsWithChildren, useContext, useState } from "react";

interface NameContextValue {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const NameContext = createContext<NameContextValue>({
  name: "",
  setName: () => {},
});

export const useName = () => useContext(NameContext);

export const NameProvider = ({ children }: PropsWithChildren<{}>) => {
  const [name, setName] = useState("");

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};
