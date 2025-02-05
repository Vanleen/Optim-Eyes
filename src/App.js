import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Catalogue from "./pages/Catalogue";
import Favoris from "./pages/Favoris";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./pages/CheckoutPage"; // ✅ Import de la page




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
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/produit/:id" element={<ProductPage />} />
          <Route path="/panier" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
