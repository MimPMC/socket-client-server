import { Box } from "@mantine/core";
import Chat from "../Chat";
import { HeaderSimple } from "../Components/Header";

export function HomePage() {
  return (
    <div>
      <HeaderSimple></HeaderSimple>

      <Box w={"100%"} h={"85vh"} bg={"#FEC48F"}>
        <Chat></Chat>
      </Box>
    </div>
  );
}
