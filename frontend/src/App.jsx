import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import About from "./pages/About";
import LostFound from "./pages/LostFound";
import Layout from "./Layout";
import Thread from "./pages/Threads";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Animal from "./pages/Animal";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/lostfound" element={<LostFound />} />
          <Route path="/thread" element={<Thread />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/animal" element={<Animal />} />
          <Route path="/reports/:id" element={<Animal />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
