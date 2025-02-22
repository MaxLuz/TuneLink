import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import SideNav from "./components/SideNav";
import Friends from "./pages/Friends";
import Inbox_Page from "./pages/Inbox";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        {user && <SideNav />}
        {!user && <Navbar />}
        {user && (
          <div className="pages">
            <Routes>
              <Route
                path="/dashboard"
                element={<Home />} // add redirect  user ? <Home /> : <Navigate to="/login" />
              />

              <Route
                path="/friends"
                element={user ? <Friends /> : <Navigate to="/dashboard" />}
              />
              <Route path="/inbox" element={<Inbox_Page />} />
            </Routes>
          </div>
        )}
        {!user && (
          <div className="not-logged-in">
            <Routes>
              <Route path="/" element={<LandingPage />} />
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
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
