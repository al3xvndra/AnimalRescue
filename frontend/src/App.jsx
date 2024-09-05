import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import About from "./pages/About";
import LostFound from "./pages/LostFound";
import Layout from "./Layout";
import Thread from "./pages/Threads";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/lostfound" element={<LostFound />} />
          <Route path="/thread" element={<Thread />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
