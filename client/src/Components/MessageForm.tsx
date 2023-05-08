
import { Button, createStyles, Input } from '@mantine/core';
import { ChangeEvent, FormEvent, useState } from "react";
import { useName } from "../context/NameContext";
import { useSocket } from '../context/SocketContext';


interface MessageFormProps {
  showAlert: (show: boolean) => void;
}

function MessageForm({ showAlert }: MessageFormProps) {

  const useStyles = createStyles((theme) => ({
    button1: {
      background: "#54FFF5",
      color: "black",
      fontSize: "1.3rem",
      transition: "all 0.3s ease",
      cursor: "pointer",
      borderRadius: "1rem",
  
      "&:hover": {
        background: "#4dd8cf",
      },
  
      "&:active": {
        transform: "scale(0.95)",
      },
    },
    input: {
      width: "100%",
      borderRadius: "1rem",
      padding:".3rem"
    },
    form: {
      display: "flex",
      gap:"1rem",
      height: "2rem",
      borderRadius: "1rem"
    }
  }));
  const {classes} = useStyles()
  const { name } = useName();
  const [newMessage, setNewMessage] = useState<string>("");
  const { sendMessage } = useSocket();

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
    <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)} className= {classes.form}>
      <Input
        value={newMessage}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setNewMessage(event.target.value)}
        placeholder="Type your message..."
        className={classes.input}
        rightSection={
          <Button className={classes.button1} type="submit" style={{ background: "transparent", border: "none" }}>
            Send
          </Button>
        }
      />
    </form>
  )
      }