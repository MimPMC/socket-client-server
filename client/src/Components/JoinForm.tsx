import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

function JoinForm() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const { joinRoom } = useSocket();

 const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinRoom(room, name);
    navigate("/homepage")
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="Name"
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        name="Room"
        placeholder="Room"
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button type="submit">Join</button>
    </form>
  );
}

export default JoinForm;
