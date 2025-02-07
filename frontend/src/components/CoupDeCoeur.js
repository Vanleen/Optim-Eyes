import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/mockApi";
import { FiCamera, FiHeart } from "react-icons/fi";

const categories = [
  { name: "Optique", filter: ["Homme", "Femme"] },
  { name: "Solaire", filter: ["Femme", "Homme", "Enfant"] },
  { name: "Enfant", filter: ["Optique", "Solaire"] },
  { name: "Écolo", filter: ["Ecolo"] },
];

const CoupDeCoeur = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      if (!selectedCategory) {
        const defaultProducts = [
          data.find((p) => p.subcategory === "Femme"),
          data.find((p) => p.category === "Solaire"),
          data.find((p) => p.subcategory === "Enfant"),
          data.find((p) => p.category === "Ecolo"),
        ].filter(Boolean);

        setDisplayedProducts(defaultProducts);
      } else {
        const normalizeText = (text) =>
          text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();

        const filteredProducts = data
          .filter((p) =>
            normalizeText(p.category) === normalizeText(selectedCategory) ||
            (p.subcategory &&
              normalizeText(p.subcategory) === normalizeText(selectedCategory))
          )
          .slice(0, 4);

        setDisplayedProducts(filteredProducts);
      }
    });
  }, [selectedCategory]);

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
    setLikedProducts(storedFavorites.map((fav) => fav.id));
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Nos Coups de Cœur ❤️</h2>

        <div className="flex justify-center space-x-6 mb-8">
          {categories.map(({ name }) => (
            <button
              key={name}
              className={`text-lg font-medium ${
                selectedCategory === name
                  ? "underline text-[#ffaf50]"
                  : "text-black hover:text-[#ffaf50]"
              }`}
              onClick={() =>
                setSelectedCategory(name === selectedCategory ? null : name)
              }
            >
              {name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {displayedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/produit/${product.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 relative"
            >
              <img
                src={product.image}  // ✅ Suppression du `<Link>` ici
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="absolute top-2 left-2 flex items-center group">
                <FiCamera className="text-gray-700 text-xl group-hover:text-gray-900" />
                <span className="ml-2 text-sm text-gray-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  ESSAYER
                </span>
              </div>

              <button
                className={`absolute bottom-3 right-3 text-xl ${
                  likedProducts.includes(product.id)
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
                onClick={(e) => {
                  e.preventDefault(); // 🚀 Empêche la redirection !
                  toggleLike(product);
                }}
              >
                <FiHeart
                  className={`transition ${
                    likedProducts.includes(product.id)
                      ? "fill-current text-red-500"
                      : ""
                  }`}
                />
              </button>

              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.price} €</p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to={`/catalogue/${selectedCategory?.toLowerCase() || "optique"}`}
          className="mt-8 inline-block px-6 py-3 bg-[#ffaf50] text-white font-semibold rounded-md hover:bg-[#e69940] transition"
        >
          Découvrir toutes nos montures
        </Link>
      </div>
    </section>
  );
};

export default CoupDeCoeur;
