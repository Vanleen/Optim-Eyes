import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/mockApi"; // ✅ Corrigé

const CoupDeCoeur = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Nos Coups de Cœur ❤️</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                key={product.id}
                to={`/produit/${product.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.price} €</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">Chargement des produits...</p>
          )}
        </div>

        <Link
          to="/catalogue"
          className="mt-8 inline-block px-6 py-3 bg-[#C7C0AE] text-white font-semibold rounded-md hover:bg-[#a89b87] transition"
        >
          Découvrir toutes nos montures
        </Link>
      </div>
    </section>
  );
};

export default CoupDeCoeur;
