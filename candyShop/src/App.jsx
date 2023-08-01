import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/register/register";
import Login from "./components/login/login";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
