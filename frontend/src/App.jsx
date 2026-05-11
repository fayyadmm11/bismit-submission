import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Tambahkan route lain di sini nanti jika diperlukan */}
      </Routes>
    </Router>
  );
}

export default App;
