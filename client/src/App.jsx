import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} /> {/* 👈 Catch-all route */}
      </Routes>
    </Router>
  );
}

export default App;
