import { Box, createStyles, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { Alert, Button, Col, Grid } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";
import { MessageForm } from "./Components/MessageForm";
import { useSocket } from "./context/SocketContext";

function Chat() {
  const useStyles = createStyles(() => ({
    chatBox: {
      minHeight: "calc(100vh - 70px)",
      backgroundColor: "#FEC48F",
      width: isDesktop ? "calc(100% - 25rem)" : "100%",
      margin: "0",
      padding: "1.7rem",
      marginTop: "70px",
      position: "absolute",
      right: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: " space-between",
      overflowY: "auto",
    },

    logo: {
      width: "5%",
    },
    chatlist: {
      listStyle: "none",
      padding: "0",
    },
    name: {
      fontFamily: "'Gaegu', cursive",
    },
    li: {
      display: "flex",
      padding: ".3rem",
      paddingLeft: ".8rem",
      marginBottom: ".8rem",
      background: "white",
      borderRadius: "1rem",
    },
  }));

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { classes } = useStyles();
  const { room, messages } = useSocket();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();
  const { typingUsers } = useSocket();
  const { removeRoom, roomList } = useSocket();

  const currentRoom = roomList.find((r) => r.name === room) || { name: "" };
  const currentRoomIndex = currentRoom
    ? roomList.findIndex((room) => room.name === currentRoom.name)
    : -1;

  console.log("currentRoomIndex:", currentRoomIndex);
  console.log("currentRoom:", currentRoom);

  return (
    <Box className={classes.chatBox}>
      <div className="chat-header">
        <div className="chat-header-info">
          <Text
            weight={500}
            size="md"
            style={{ marginLeft: "0" }}
            className={classes.name}
          >
            You are in room: {room}
            {currentRoom != null ? (
              <Button
                key={`remove-${currentRoom.name}`}
                style={{
                  float: "right",
                  height: "2rem",
                  width: "5rem",
                  backgroundColor: "#54FFF5",
                  color: "black",
                  position: "relative",
                  borderRadius: "1rem",
                }}
                onClick={() => removeRoom(currentRoom.name, name)}
              >
                leave
              </Button>
            ) : null}
          </Text>
        </div>

        <div>
          {typingUsers.length > 0 && (
            <p>
              {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"}{" "}
              typing...
            </p>
          )}
        </div>
        {showAlert && (
          <Grid gutter="md">
            <Col>
              <Alert
                color="red"
                title="Error"
                onClose={() => setShowAlert(false)}
              >
                You have to choose a username to chat!
                <Button
                  color="red"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setShowAlert(false);
                    navigate("/");
                  }}
                >
                  Choose a username
                </Button>
              </Alert>
            </Col>
          </Grid>
        )}

        <ul className={classes.chatlist}>
          {messages.map((message, i) => (
            <li key={i} className={classes.li}>
              <Title
                order={4}
                className={classes.name}
              >{`${message.name}: `}</Title>
              <Text className={classes.name}>{" " + message.message}</Text>
            </li>
          ))}
        </ul>
      </div>
      <MessageForm showAlert={setShowAlert} />
    </Box>
  );
}

export default Chat;
