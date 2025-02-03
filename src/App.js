import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"; // <-- Import du Footer

function App() {
  return (
    <Router>
      <>
        <Header />
        <main className="p-6">
          {/* Contenu principal de l'application */}
        </main>
        <Footer /> {/* <-- Ajout du Footer ici */}
      </>
    </Router>
  );
}

export default App;