import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <>
        <Header />
        <main className="p-6">
          {/* Contenu principal de l'application */}
        </main>
      </>
    </Router>
  );
}

export default App;
