import { Outlet } from "react-router-dom";
import "./App.css";
import { HeaderSimple } from "./components/Header";

function App() {
  return (
    <>
      <Outlet></Outlet>
      <div>
        <HeaderSimple />
      </div>
    </>
  );
}

export default App;
