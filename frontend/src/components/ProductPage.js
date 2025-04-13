import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGlassById } from "../api/glassesApi";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);

  const formatImageUrl = (url) =>
    url?.startsWith("http") ? url : `http://localhost:5000${url}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGlassById(id);
        setProduct(data);
      } catch (err) {
        console.error("❌ Produit introuvable :", err);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (product) {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setLiked(storedFavorites.some((fav) => fav._id === product._id));
    }
  }, [product]);

  if (!product) {
    return <p className="text-center text-gray-500">Produit introuvable.</p>;
  }

  const toggleLike = () => {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (liked) {
      storedFavorites = storedFavorites.filter((fav) => fav._id !== product._id);
    } else {
      storedFavorites.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    }
    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setLiked(!liked);
    window.dispatchEvent(new Event("storage"));
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.some((item) => item._id === product._id);
    if (!exists) {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="container mx-auto px-6 mt-[160px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={formatImageUrl(product.imageUrl)}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="space-y-6 mt-[80px]">
          <h1 className="text-4xl font-semibold text-gray-800">{product.name}</h1>
          <p className="text-3xl text-[#ffaf50] font-semibold">{product.price} €</p>

          <div className="space-y-2 text-gray-700">
            <p><strong>Forme :</strong> {product.frameType || "Carrée"}</p>
            <p><strong>Matériaux :</strong> {product.material || "Acétate"}</p>
            <p><strong>Référence :</strong> {product._id}</p>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <button onClick={toggleLike} className="flex items-center gap-2 text-[#ffaf50] text-xl transition">
            <FiHeart className={`${liked ? "fill-current text-red-500" : "text-gray-400"}`} />
          </button>

          <button
            onClick={addToCart}
            className="w-full md:w-auto px-6 py-3 bg-[#ffaf50] text-white font-semibold rounded-md hover:bg-[#e69940] transition"
          >
            <FiShoppingCart className="text-xl inline-block mr-2" /> Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
