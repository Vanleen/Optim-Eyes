import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
import Recommandations from "./pages/Recommandations";
import { getCurrentUser, logoutUser } from "./api/authApi"; // ✅ Import des fonctions d'auth
import AdminDashboard from "./pages/AdminDashboard";

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return null;
}

function App() {
  const [user, setUser] = useState(getCurrentUser()); // ✅ Stocke l'utilisateur connecté

  return (
    <Router>
      <>
        <ScrollToTop />
        <Header user={user} onLogout={() => {
          logoutUser();  // 🔴 Déconnexion et suppression du token
          setUser(null); // 🔄 Met à jour l'état du user après déconnexion
        }} />
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
          <Route path="/recommandations" element={<Recommandations />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />

        </Routes>
        <ChatbotButton />
        <Footer />
      </>
    </Router>
  );
}

export default App;
