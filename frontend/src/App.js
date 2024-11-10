import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import SideNav from "./components/SideNav";
import Friends from "./pages/Friends";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        {user && <SideNav />}
        {!user && <Navbar />}
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
            <Route path="/friends" element={<Friends />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
