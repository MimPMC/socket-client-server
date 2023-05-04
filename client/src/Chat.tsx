import { Alert, Avatar, Badge, Button, Card, Col, Grid, Image, Input, Text } from "@mantine/core";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import clip from "./assets/clip.png";
import { useUsername } from "./context/UsernameContext";

function Chat() {
  const { username } = useUsername();
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!username) {
      setShowAlert(true);
    } else {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  }
  

  return (
    <div
      className="App"
      style={{
        height: "85vh",
        backgroundColor: "orange",
        width: "60%",
        margin: "0",
        padding: "0",
        paddingLeft: "15px",
        paddingTop: "15px",
        position: "fixed",
        right: "3%",
        marginTop: "5rem",
      }}
    >
      <Image
        src={clip}
        alt="clip image"
        style={{
          width: "3rem",
          height: "3rem",
          top: "7.7%",
          display: "flex",
          right: "31%",
          position: "fixed",
        }}
      />
      <div className="chat-header">
        <Avatar src="" size="xl" radius="md" alt="Avatar" />
        <div className="chat-header-info">
          <Text weight={500} size="md" style={{ marginLeft: "20px" }}>
            {username}
          </Text>
          <Badge color="gray" variant="light" style={{ marginLeft: "8px" }}>
            Online
          </Badge>
        </div>
      </div>
      <div className="chat-body">
        {messages.map((message, index) => (
          <Card
            style={{
              borderRadius: "25px",
              marginRight: "2rem",
              marginTop: "1rem",
            }}
            key={index}
            className={
              index % 2 === 0 ? "chat-message-left" : "chat-message-right"
            }
          >
            <Text>{username}: {message}</Text>
          </Card>
        ))}
      </div>
{/* Add this right above the <form> element */}
{showAlert && (
  <Grid gutter="md">
    <Col>
      <Alert color="red" title="Error" onClose={() => setShowAlert(false)}>
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


      <form
        className="chat-form"
        onSubmit={handleSubmit}
        style={{ bottom: "6%", position: "fixed", width: "58%" }}
      >
        <Input
          className="chat-form-input"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="Type your message..."
          rightSection={
            <Button type="submit" className="chat-form-button">
              {" "}
              Send
            </Button>
          }
        />
      </form>
    </div>
  );
}

export default Chat;
