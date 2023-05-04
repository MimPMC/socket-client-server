
import { useState } from "react";
import Card from "../Components/Card";
import { NavbarSimple } from "../Components/Sidebar";
import { posts } from "../Data/data";


const App = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket] = useState(null);



  return (
    <div className="container">
      {user ? (
        <>
          < NavbarSimple/>
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user}/>
          ))}
          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <h2>Lama App</h2>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
