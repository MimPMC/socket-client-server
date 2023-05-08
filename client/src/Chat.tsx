import { Box, Text, Title, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import "./App.css";
import MessageForm from "./Components/MessageForm";
import { useSocket } from "./context/SocketContext";

function Chat() {
  const useStyles = createStyles((theme) => ({
    chatBox: {
      minHeight: "calc(100vh - 70px)", // Use minHeight instead of height
      backgroundColor: "#FEC48F",
      width: isDesktop ? "calc(100% - 40vh)" : "100%",
      margin: "0",
      padding: "1.7rem",
      marginTop: "70px",
      position: "absolute",
      right: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent:" space-between",
      overflowY: "auto", // Add overflow-y property
      
    },

    logo: {
      width:"5%"
    },
    chatlist: {
      listStyle: 'none',
      padding: '0'
    },
    name: {
      fontFamily: "'Gaegu', cursive",
    },
    li: {
      display:"flex",
      padding: ".3rem",
      paddingLeft:".8rem",
      marginBottom: ".8rem",
      background: "white",
      borderRadius: "1rem"
    },
  }));

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { classes } = useStyles();
  const { room, messages } = useSocket();
  return (
    <Box className={classes.chatBox}>
      {/*<Image src={clip} alt="clip image" className={classes.logo} />*/}
      <div className="chat-header">
        <div className="chat-header-info">
          <Text weight={500} size="md" style={{ marginLeft: "0" }}  className={classes.name}>
            You are in room: {room}
          </Text>
          <Text weight={500} size="md" style={{ marginLeft: "0" }}  className={classes.name}>
            Cats in the chat: cat1, cat2, cat3
          </Text>
        </div>
        <ul className={classes.chatlist}>
        {messages.map((message, i) => (
          <li key={i} className={classes.li}>
            <Title order={4} className={classes.name}>{`${message.name}: `}</Title>

            <Text className={classes.name}>{" "+ message.message}</Text>
          </li>
        ))}
      </ul>
      </div>
      
      <MessageForm />
    </Box>
  );
}

export default Chat;
