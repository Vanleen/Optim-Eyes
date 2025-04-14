// frontend/src/App.js
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
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import ChatbotButton from "./components/ChatbotButton";
import Recommandations from "./pages/Recommandations";
import AdminDashboard from "./pages/AdminDashboard";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import DiagnosticPage from "./pages/DiagnosticPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/catalogue/:category" element={<Catalogue />} />
            <Route path="/favoris" element={<Favoris />} />
            <Route path="/product/:id" element={<ProductPage />} /> {/* ✅ Fix route */}
            <Route path="/panier" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<OrderConfirmation />} />
            <Route path="/recommandations" element={<Recommandations />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/diagnostic" element={<DiagnosticPage />} />
          </Routes>
          <ChatbotButton />
          <Footer />
        </>
      </Router>
    </AuthProvider>
  );
}

export default App;
