import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Catalogue from "./pages/Catalogue";

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/catalogue/:category" element={<Catalogue />} /> {/* ✅ Vérifier cette ligne */}
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
