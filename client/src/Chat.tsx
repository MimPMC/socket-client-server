import { Avatar, Badge, Button, Card, Image, Input, Text } from "@mantine/core";
import { FormEvent, useState } from "react";
import "./App.css";
import clip from "./assets/clip.png";

function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessages([...messages, newMessage]);
    setNewMessage("");
  }

  return (
    <div
      className="App"
      style={{
        height: "85vh",
        backgroundColor: "orange",
        width: "70%",
        margin: "0",
        padding: "0",
        paddingLeft: "15px",
        paddingTop: "15px",
        position: "fixed",
        right: "3%",
        marginTop: "-5.3rem",
      }}
    >
      <Image
        src={clip}
        alt="clip image"
        style={{
          width: "3rem",
          height: "3rem",
          top: "9.5%",
          display: "flex",
          right: "38%",
          position: "fixed",
        }}
      />
      <div className="chat-header">
        <Avatar src="" size="xl" radius="md" alt="Avatar" />
        <div className="chat-header-info">
          <Text weight={500} size="md" style={{ marginLeft: "20px" }}>
            Lucas
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
              width:'70%'
            }}
            key={index}
            className={
              index % 2 === 0 ? "chat-message-left" : "chat-message-right"
            }
          >
            <Text>{message}</Text>
          </Card>
        ))}
      </div>
      <form
        className="chat-form"
        onSubmit={handleSubmit}
        style={{ bottom: "7.5%", position: "fixed", width: "67%" }}
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
