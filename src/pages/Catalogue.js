import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../api/mockApi";
import catalogueImage from "../assets/images/catalogue.jpg";
import { FiHeart } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";

const filtersByCategory = {
  Optique: ["Tous", "Homme", "Femme", "Enfant", "Mixte", "Ecolo"],
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
  console.log("📢 Catégorie récupérée :", category);

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("Tous");
  const [sort, setSort] = useState("En vedette");
  const [likedProducts, setLikedProducts] = useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    if (!category) return;

    fetchProducts().then((data) => {
      const normalizeText = (text) =>
        text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim();

      console.log(`📢 Catégorie sélectionnée : ${category}`);

      const filtered = data.filter(
        (p) =>
          normalizeText(p.category) === normalizeText(category) ||
          (p.subcategory &&
            normalizeText(p.subcategory) === normalizeText(category))
      );

      console.log(`📢 Produits filtrés pour ${category} :`, filtered);
      setProducts(filtered);
    });
  }, [category]);

  const toggleLike = (product) => {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = storedFavorites.some((fav) => fav.id === product.id);

    if (exists) {
      storedFavorites = storedFavorites.filter((fav) => fav.id !== product.id);
    } else {
      storedFavorites.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }

    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setLikedProducts(storedFavorites.map((fav) => fav.id)); // ✅ Met à jour l'état des favoris
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleSortChange = (selectedSort) => {
    setSort(selectedSort);
    setShowSortMenu(false);
  };

  const filteredProducts =
    filter === "Tous"
      ? products
      : products.filter((p) => p.subcategory === filter);

  return (
    <section className="mt-[160px] pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-6 capitalize">
          {category}
        </h1>

        <div className="w-full h-64 overflow-hidden rounded-lg shadow-md mb-6">
          <img
            src={catalogueImage}
            alt="Catalogue"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          {/* ✅ Filtres à gauche */}
          <div className="flex flex-wrap lg:flex-col space-x-4 lg:space-x-0 lg:space-y-2 w-full lg:w-auto">
            {filtersByCategory[category]?.map((f) => (
              <button
                key={f}
                className={`text-lg font-medium px-4 py-2 ${
                  filter === f ? "underline text-[#ffaf50]" : "text-black"
                } hover:text-[#ffaf50]`}
                onClick={() => handleFilterChange(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* ✅ Tri à droite */}
          <div className="relative">
            <button
              className="text-lg font-medium flex items-center space-x-2 text-black"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              <span className="font-semibold">Trier par :</span>{" "}
              <span>{sort}</span>
              <span className="ml-2">▼</span>
            </button>
            {showSortMenu && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48 z-50">
                {sortingOptions.map((option) => (
                  <button
                    key={option}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleSortChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden relative"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />

                <button
                  className={`absolute bottom-3 right-3 text-xl ${
                    likedProducts.includes(product.id)
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => toggleLike(product)}
                >
                  <FiHeart
                    className={`transition ${
                      likedProducts.includes(product.id)
                        ? "fill-current text-red-500"
                        : ""
                    }`}
                  />
                </button>

                <div className="absolute top-3 left-3 flex items-center group">
                  <FiCamera className="text-gray-700 text-xl group-hover:text-gray-900" />
                  <span className="ml-2 text-sm text-gray-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    ESSAYER
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.price} €</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Aucun produit disponible.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Catalogue;
