import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/mockApi";
import catalogueImage from "../assets/images/catalogue.jpg";

const filtersByCategory = {
  Optique: ["Tous", "Homme", "Femme", "Enfant", "Mixte"],
  Solaire: ["Tous", "Homme", "Femme", "Enfant"],
  Enfant: ["Tous", "Optique", "Solaire"],
  Ecolo: ["Tous"],
};

const sortingOptions = [
  "En vedette",
  "Meilleures ventes",
  "Prix : faible à élevé",
  "Prix : élevé à faible",
];

const Catalogue = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("Tous");
  const [sort, setSort] = useState("En vedette");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    if (!category) return;

    fetchProducts().then((data) => {
      const normalizeText = (text) =>
        text
          ?.normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim();

      let filtered = [];
      if (normalizeText(category) === "enfant") {
        filtered = data.filter((p) => normalizeText(p.subcategory) === "enfant");
      } else {
        filtered = data.filter((p) => normalizeText(p.category) === normalizeText(category));
      }

      setProducts(filtered);
    });
  }, [category]);

  const filteredProducts =
    filter === "Tous"
      ? products
      : products.filter((p) => p.subcategory?.toLowerCase() === filter.toLowerCase());

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "Prix : faible à élevé":
        return a.price - b.price;
      case "Prix : élevé à faible":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <section className="mt-[160px] pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-6 capitalize">
          {category}
        </h1>

        <div className="w-full h-64 overflow-hidden rounded-lg shadow-md mb-6">
          <img src={catalogueImage} alt="Catalogue" className="w-full h-full object-cover" />
        </div>

        {/* ✅ Filtres & Tri */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          {/* 🔹 Filtrer par */}
          <div className="relative">
            <button
              className="text-lg font-medium flex items-center space-x-2 text-black"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <span>Filtrer par :</span>
              <span>{filter}</span>
              <span className="ml-2">▼</span>
            </button>

            {showFilterMenu && (
              <div className="absolute left-0 mt-2 bg-white shadow-md rounded-md w-48 z-50">
                {filtersByCategory[category]?.map((option) => (
                  <button
                    key={option}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setFilter(option);
                      setShowFilterMenu(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 🔹 Trier par */}
          <div className="relative">
            <button
              className="text-lg font-medium flex items-center space-x-2 text-black"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              <span>Trier par :</span>
              <span>{sort}</span>
              <span className="ml-2">▼</span>
            </button>

            {showSortMenu && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48 z-50">
                {sortingOptions.map((option) => (
                  <button
                    key={option}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setSort(option);
                      setShowSortMenu(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ✅ Affichage des produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Link to={`/produit/${product.id}`} className="block">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                </Link>

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.price} €</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Aucun produit disponible.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Catalogue;
