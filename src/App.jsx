// global css
import "./global.css";
// react bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// react router dom
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./components/Topbar";
import Home from "./pages/events";
import Register from "./pages/register";
import Login from "./pages/login";
import CreateEvent from "./pages/createEvent";
import SingleEvent from "./pages/singleEvent";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Topbar />
      <div className="custom_vh">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/register"
            exact
            element={<Register />}
          />
          <Route
            path="/login"
            exact
            element={user ? <Navigate to="/" /> : <Login />}
          />

          <Route path="/create-event" exact element={<CreateEvent />} />
          <Route path="/event/:id" exact element={<SingleEvent />} />
          {/* error routing */}
          <Route path="/*" exact element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
