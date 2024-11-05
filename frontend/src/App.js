import Navbar from './Components/Navbar';
import About from "./Components/About";
import Login from "./Components/login";
import Profile from "./Components/Profile";
import Neural from "./Components/Neural";
import Dream from "./Components/Dream";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [login, setLogin] = useState(false);
  const [mode, setMode] = useState("light");
  const [username, setUsername] = useState("");

  const userid = (name) => {
    setUsername(name);
  };

  const handleLogin = () => {
    setLogin(true);
  };

  const toggle = () => {
    setMode(mode === "light" ? "dark" : "light");
  }

  const handleLogout = () => {
    setLogin(false);
    document.body.style.backgroundColor = "white";
    setUsername("");
  };

  return (
    <>
      <BrowserRouter>
        {login && <Navbar handleLogout={handleLogout} toggle={toggle} mode={mode} />}
        <Routes>
          {login ?
            <>
              <Route exact path='/' element={<About mode={mode} />} />
              <Route exact path='/Creativity' element={<Neural user={username} mode={mode} />} />
              <Route exact path='/Dreaming' element={<Dream user={username} mode={mode} />} />
              <Route exact path='/Profile' element={<Profile user={username} loggedout={handleLogout} mode={mode} />} />
            </>
            :
            <Route exact path='*' element={<Login handleLogin={handleLogin} userid={userid} />} />
          }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
