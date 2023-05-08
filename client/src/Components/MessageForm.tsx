import { Button, createStyles } from '@mantine/core';
import { useState } from 'react';
import { useSocket } from '../context/SocketContext';



function MessageForm() {

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
  const [message, setMessage] = useState('');
  const { sendMessage } = useSocket();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
    console.log("hello hello");
  };

  return (
    <form onSubmit={handleSubmit} className= {classes.form}>
      <input
        name="message"
        placeholder="Write a message..."
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={classes.input}
      />
      <Button className= {classes.button1} type="submit" >Send</Button>
    </form>
  );
}

export default MessageForm;
