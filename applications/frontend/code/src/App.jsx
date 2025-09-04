import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import LostFound from "./pages/LostFound";
import EditReport from "./pages/EditReport";
import Layout from "./Layout";
import Threads from "./pages/Threads";
import CreateThreads from "./pages/CreateThreads";
import EditThreads from "./pages/EditThreads";
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
          <Route path="/reports" element={<LostFound />} />
          <Route path="/edit-report/:id" element={<EditReport />} />
          <Route path="/threads" element={<Threads />} />
          <Route path="/thread/:id" element={<Thread />} />
          <Route path="/create-thread" element={<CreateThreads />} />
          <Route path="/edit-thread/:id" element={<EditThreads />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/report" element={<Report />} />
          <Route path="/report/:id" element={<Animal />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
