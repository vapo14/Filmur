import * as React from "react";
import axiosInstance from "../api/axiosInstance";
import Cookies from "js-cookie";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  React.useEffect(() => {
    if (Cookies.get("filmur_s")) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }, [authed]);

  return {
    authed,
    login(credentials) {
      return new Promise(async (res) => {
        const data = await axiosInstance.post("/user/login", credentials);
        if (data.status === 200) {
          setAuthed(true);
        } else {
          // handle message
          setAuthed(false);
        }
        res(data.data);
      });
    },
    logout() {
      return new Promise(async (res) => {
        const data = await axiosInstance.delete("/user/logout");
        if (data.status === 200) {
          setAuthed(false);
        }
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
