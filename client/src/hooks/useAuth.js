import * as React from "react";
import axiosInstance from "../api/axiosInstance";
import Cookies from "js-cookie";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  const [UserData, setUserData] = React.useState({ username: "", userId: "" });

  React.useEffect(() => {
    if (Cookies.get("filmur_s")) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }, [authed]);

  return {
    UserData,
    authed,
    login(credentials) {
      return new Promise(async (res) => {
        const data = await axiosInstance
          .post("/user/login", credentials)
          .catch((error) => {
            return { status: "FAILED" };
          });
        if (data.status === 200) {
          setUserData(data.data);
          setAuthed(true);
        } else {
          // handle message
          setAuthed(false);
        }
        res(data.status);
      });
    },
    logout() {
      return new Promise(async (res) => {
        const data = await axiosInstance.delete("/user/logout");
        if (data.status === 200) {
          setUserData({ username: "", userId: "" });
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
