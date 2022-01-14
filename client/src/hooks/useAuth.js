import * as React from "react";
import axiosInstance from "../api/axiosInstance";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(true);

  return {
    authed,
    login(credentials) {
      return new Promise(async (res) => {
        console.log("sending: ", credentials);
        const data = await axiosInstance.post("/user/login", credentials);
        if (data.status === 200) {
          setAuthed(true);
        } else {
          // handle message
          setAuthed(false);
        }
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
