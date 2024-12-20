import logo from "./assets/GardenLightsController.png";
import { useState } from "react";
import "./App.scss";
import Switch from "./components/switch";
import users from "./services/users.service";
import Login from "./components/login";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Lógica de validación de usuario y contraseña
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    console.log(user);
    if (user) {
      setLoggedIn(true);
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="layout">
      <header>
        <img src={logo} alt="Logo Garden Lights Controller" />
      </header>
      <div className="App">
        {loggedIn ? (
          <Switch {...{ handleLogout }} />
        ) : (
          <Login
            {...{ handleLogin, setUsername, setPassword, username, password }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
