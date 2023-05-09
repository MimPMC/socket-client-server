import { Button, TextInput, createStyles } from '@mantine/core';
import { useState } from 'react';
import { TbCat, TbHome2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useName } from '../context/NameContext';
import { useSocket } from '../context/SocketContext';

export const useStyles = createStyles((theme) => ({
  input: {
    transition: "all 0.3s ease",

    [theme.fn.smallerThan('sm')]: {
      width:"16rem"
    },
  },
  form: {
    display: "flex",
    justifyContent:"center",
    alignItems: "center",
    flexDirection: "column",
    gap: ".8rem"
  },
  button1: {
    background: "#54FFF5",
    color: "black",
    fontSize: "1.3rem",
    transition: "all 0.3s ease",
    cursor: "pointer",

    "&:hover": {
      background: "#5de0d8",
    },

    "&:active": {
      transform: "scale(0.95)",
    },

    [theme.fn.smallerThan('sm')]: {
      width: "16rem",
    },
  },
  }));




function JoinForm() {
  const { classes } = useStyles();
  const [room, setRoom] = useState('');
  const { joinRoom } = useSocket();


  const navigate = useNavigate();

  const { name, setName } = useName();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinRoom(room, name);
    navigate("/homepage");
  };


  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextInput
        icon={<TbCat size="1.4rem" />}
        w={"20rem"} 
        radius="lg"
        name="Name"
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={classes.input}
      />
      <TextInput
        icon={<TbHome2 size="1.4rem" />}
        w={"20rem"} 
        radius="lg"
        name="Room"
        placeholder="Room"
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className={classes.input}
      />
      <Button type="submit" radius="xl" size="md" w={"20rem"} className={classes.button1}>
      Start Chatting!
      </Button>
    </form>
  );
}

export default JoinForm;
