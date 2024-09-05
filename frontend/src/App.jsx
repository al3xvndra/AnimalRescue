import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import LostFound from "./pages/LostFound";
import "./App.scss";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/lostfound" element={<LostFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
