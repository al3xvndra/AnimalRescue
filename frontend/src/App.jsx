import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import About from "./pages/About";
import LostFound from "./pages/LostFound";
import Layout from "./Layout";
import Threads from "./pages/Threads";
import Thread from "./pages/Thread";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Animal from "./pages/Animal";
import Report from "./pages/Report";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/lostfound" element={<LostFound />} />
          <Route path="/thread" element={<Threads />} />
          <Route path="/thread/:id" element={<Thread />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/animal" element={<Animal />} />
          <Route path="/report" element={<Report />} />
          <Route path="/report/:id" element={<Animal />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
