import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Catalogue from "./pages/Catalogue";
import Favoris from "./pages/Favoris";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import ChatbotButton from "./components/ChatbotButton";

function ScrollToTop() {
  const location = useLocation(); // ✅ Récupération de l'URL

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Remonte en haut à chaque changement de page
  }, [location.pathname]);

  return null; // ✅ Ce composant ne rend rien, il gère juste l'effet
}

function App() {
  return (
    <Router>
      <>
        <ScrollToTop /> {/* ✅ Ajout du composant ici */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/catalogue/:category" element={<Catalogue />} />
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/produit/:id" element={<ProductPage />} />
          <Route path="/panier" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
        </Routes>
        <ChatbotButton /> {/* 🔥 Ajout du bouton chatbot */}
        <Footer />
      </>
    </Router>
  );
}

export default App;
