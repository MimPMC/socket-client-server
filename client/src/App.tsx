import { Outlet } from "react-router-dom";
import "./App.css";
import { HeaderSimple } from "./components/Header";

function App() {
  return (
    <>
        <HeaderSimple />
      <Outlet></Outlet>
    </>
  );
}

export default App;
