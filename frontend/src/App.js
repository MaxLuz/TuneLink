import "./App.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />} // add redirect  user ? <Home /> : <Navigate to="/login" />
            />
            <Route
              path="/login"
              element={<Login />} // add redirect !user ? <Login /> : <Navigate to="/" />
            />
            <Route
              path="/signup"
              element={<Signup />} // add redirect !user ? <Signup /> : <Navigate to="/" />
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
