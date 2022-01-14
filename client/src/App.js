import { Routes, Route } from "react-router-dom";
import "./css/main.css";
import Home from "./components/Home";
import SavedReviews from "./components/SavedReviews";
import LogIn from "./components/LogIn";
import RequireAuth from "./components/RequireAuth";
import RequireNotAuth from "./components/RequireNotAuth";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <RequireNotAuth>
              <LogIn />
            </RequireNotAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/saved"
          element={
            <RequireAuth>
              <SavedReviews />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
