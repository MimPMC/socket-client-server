import { Image, Text } from "@mantine/core";
import "./App.css";
import clip from "./assets/clip.png";
import MessageForm from "./Components/MessageForm";
import { useSocket } from "./context/SocketContext";


function Chat() {
const { room, messages } = useSocket();  
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
        <div className="chat-header-info">
          <Text weight={500} size="md" style={{ marginLeft: "20px" }}>
            You are in room: {room}
          </Text>
        </div>
      </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
        {messages.map((message, i) => (
          <li key={i}>
            {message.name}: {message.message}
          </li>
        ))}
      </ul>
        <MessageForm />
    </div>
  );
}

export default Chat;
