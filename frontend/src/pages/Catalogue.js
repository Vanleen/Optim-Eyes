import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiHeart, FiCamera } from "react-icons/fi";
import { fetchAllGlasses } from "../api/glassesApi";
import catalogueImage from "../assets/images/catalogue.jpg";

const filtersByCategory = {
  Optique: ["Tous", "Femme", "Homme", "Enfant", "Mixte", "Ecolo"],
  Solaire: ["Tous", "Femme", "Homme", "Enfant"],
  Enfant: ["Tous", "Optique", "Solaire"],
  Ecolo: ["Tous"],
};

const sortingOptions = [
  "En vedette",
  "Meilleures ventes",
  "Prix : faible à élevé",
  "Prix : élevé à faible",
];

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const Catalogue = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("Tous");
  const [sort, setSort] = useState("En vedette");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    fetchAllGlasses().then((data) => {
      setProducts(data);
    });
  }, []);

  const filteredProducts = products.filter((p) => {
    const cat = category.toLowerCase();
    const selected = filter.toLowerCase();

    if (cat === "optique") {
      if (selected === "tous") return ["optique", "ecolo"].includes(p.category?.toLowerCase());
      if (selected === "ecolo") return p.category?.toLowerCase() === "ecolo";
      return (
        ["optique"].includes(p.category?.toLowerCase()) &&
        p.gender?.toLowerCase() === selected
      );
    }

    if (cat === "solaire") {
      if (selected === "tous") return p.category?.toLowerCase() === "solaire";
      return (
        p.category?.toLowerCase() === "solaire" &&
        p.gender?.toLowerCase() === selected
      );
    }

    if (cat === "enfant") {
      if (selected === "tous") return p.gender?.toLowerCase() === "enfant";
      return (
        p.gender?.toLowerCase() === "enfant" &&
        p.category?.toLowerCase() === selected
      );
    }

    if (cat === "ecolo") {
      return p.category?.toLowerCase() === "ecolo";
    }

    return true;
  });

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

  const toggleLike = (product) => {
    let stored = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = stored.find((p) => p._id === product._id);
    if (exists) {
      stored = stored.filter((p) => p._id !== product._id);
    } else {
      stored.push(product);
    }
    localStorage.setItem("favorites", JSON.stringify(stored));
    setLikedProducts(stored.map((p) => p._id));
  };

  return (
    <section className="mt-[160px] pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-6 capitalize">
          {category}
        </h1>

        <div className="w-full h-64 overflow-hidden rounded-lg shadow-md mb-6">
          <img src={catalogueImage} alt="Catalogue" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
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
                {filtersByCategory[capitalize(category)]?.map((option) => (
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

          <div className="relative mt-4 lg:mt-0">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => {
            const finalImage = product.imageUrl?.startsWith("http")
              ? product.imageUrl
              : `http://localhost:5000${product.imageUrl}`;

            return (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                <Link to={`/produit/${product._id}`}>
                  <img
                    src={finalImage}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 flex items-center group">
                    <FiCamera className="text-gray-700 text-xl group-hover:text-gray-900" />
                    <span className="ml-2 text-sm text-gray-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      ESSAYER
                    </span>
                  </div>
                </Link>

                <button
                  className={`absolute bottom-3 right-3 text-xl ${
                    likedProducts.includes(product._id) ? "text-red-500" : "text-gray-400"
                  }`}
                  onClick={() => toggleLike(product)}
                >
                  <FiHeart className={likedProducts.includes(product._id) ? "fill-current text-red-500" : ""} />
                </button>

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.price} €</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Catalogue;
