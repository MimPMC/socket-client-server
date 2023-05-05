import { useState } from 'react';
import { useSocket } from '../context/SocketContext';

function MessageForm() {
  const [message, setMessage] = useState('');
  const { sendMessage } = useSocket();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
    console.log("hello hello");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="message"
        placeholder="Write a message..."
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" >Send</button>
    </form>
  );
}

export default MessageForm;
