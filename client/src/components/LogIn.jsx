import { React, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function LogIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    let credentials = {
      username: Username,
      password: Password,
    };
    await login(credentials);
    navigate(state?.path || "/home");
  };

  return (
    <div>
      <h1>Login page</h1>
      <form>
        <input
          type="text"
          name="Username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={(e) => handleLogin(e)}>
          Log In
        </button>
      </form>
    </div>
  );
}
