import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./context/Context";
import Topbar from "./components/Topbar";
import Home from "./components/Home";
import Single from "./components/Single";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ContributePage from "./Pages/ContributePage";
import About from "./components/About";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> {/* Added About route */}
        <Route
          path="/register"
          element={user ? <Home /> : <Register />}
        />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route
          path="/contribute"
          element={user ? <ContributePage /> : <Register />}
        />
        <Route
          path="/settings"
          element={user ? <Settings /> : <Register />}
        />
        <Route path="/recipe/:recipeId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
