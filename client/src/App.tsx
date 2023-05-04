import { Outlet } from "react-router-dom";
import "./App.css";
import Message from "./pages/Message";

function App() {
  return (
    <>
      <Outlet></Outlet>
      <Message></Message>
    </>
  );
}

export default App;
