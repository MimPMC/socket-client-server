import MessageForm from '../Components/MessageForm';
import { useSocket } from '../context/SocketContext';

function ChatPage() {
  const { room, messages } = useSocket();
  return (
    <>
      <header>
        <h1>You are in room:::: {room}</h1>
      </header>
      <main>
        <ul>
          {messages.map((message, i) => (
            <li key={i}>
              {message.name}: {message.message}
            </li>
          ))}
        </ul>
        <MessageForm />
      </main>
    </>
  );
}

export default ChatPage;
