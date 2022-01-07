import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Topbar from "./components/topbar/Topbar";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />

        <Route exact path="/posts" element={<Homepage />} />

        <Route
          exact
          path="/register"
          element={user ? <Homepage /> : <Register />}
        />

        <Route exact path="/login" element={user ? <Homepage /> : <Login />} />

        <Route exact path="/post/:id" element={<Single />} />

        <Route exact path="/write" element={user ? <Write /> : <Login />} />

        <Route path="/settings" element={user ? <Settings /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
