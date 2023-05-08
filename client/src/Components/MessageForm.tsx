import { Button, Input } from "@mantine/core";
import { ChangeEvent, FormEvent, useState } from "react";
import { useName } from "../context/NameContext";
import { useSocket } from "../context/SocketContext";

interface MessageFormProps {
  showAlert: (show: boolean) => void;
}

const MessageForm = ({ showAlert }: MessageFormProps) => {
  const { sendMessage } = useSocket();
  const { name } = useName();
  const [newMessage, setNewMessage] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name) {
      showAlert(true);
    } else {
      sendMessage(newMessage);
      setNewMessage("");
    }
  }

  return (
    <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)} style={{ position: "fixed", bottom: "6%", width: "68%" }}>
      <Input
        value={newMessage}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setNewMessage(event.target.value)}
        placeholder="Type your message..."
        rightSection={
          <Button type="submit" style={{ background: "transparent", border: "none" }}>
            Send
          </Button>
        }
      />
    </form>
  );
};

export default MessageForm;
