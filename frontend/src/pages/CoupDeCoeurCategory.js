import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAllGlasses } from "../api/glassesApi";

const normalize = (text) =>
  (text || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, "")
    .trim();

const Catalogue = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetchAllGlasses()
      .then((data) => {
        setProducts(data);
        console.log("✅ Produits chargés:", data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const norm = normalize(category);
    console.log("🌐 URL param category:", category);
    console.log("🔠 Normalized category:", norm);
    if (!norm || norm === "tout") {
      setFiltered(products);
    } else {
      const filteredData = products.filter(
        (p) =>
          normalize(p.category) === norm ||
          normalize(p.subcategory) === norm ||
          normalize(p.gender) === norm
      );
      console.log("🔍 Produits filtrés:", filteredData);
      setFiltered(filteredData);
    }
  }, [category, products]);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Catalogue de Montures
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {filtered.length > 0 ? (
            filtered.map((product) => {
              console.log("📦 Produit rendu :", product);
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={`http://localhost:5000${product.imageUrl}`}
                    alt={product.name}
                    className="w-full h-48 object-cover bg-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.png";
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.price} €</p>
                    <p className="text-xs text-gray-400 break-all">
                      imageUrl: {product.imageUrl}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 w-full">Aucun produit trouvé.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Catalogue;
