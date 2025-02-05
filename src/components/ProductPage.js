import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../api/mockApi";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchProducts().then((data) => {
      const foundProduct = data.find((p) => p.id === parseInt(id));
      setProduct(foundProduct);
    });
  }, [id]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setLiked(storedFavorites.some((fav) => fav.id === product?.id));
  }, [product]);

  const toggleLike = () => {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (liked) {
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
    setLiked(!liked);
  };

  if (!product)
    return <p className="text-center text-gray-500">Produit introuvable.</p>;

  return (
    <div className="container mx-auto px-6 mt-[70px]"> {/* ✅ Ajout de `py-32` pour descendre le contenu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* 🖼️ Image du produit */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* 📄 Détails du produit */}
        <div className="space-y-6 mt-[120px]"> {/* ✅ Ajout d'un `space-y-6` pour plus d'espacement */}
          <h1 className="text-4xl font-semibold text-gray-800">
            {product.name}
          </h1>
          <p className="text-3xl text-[#ffaf50] font-semibold">
            {product.price} €
          </p>

          {/* ✅ Forme, Matériaux, Teinte, Référence */}
          <div className="space-y-2 text-gray-700">
            <p><strong>Forme :</strong> {product.forme || "Carrée"}</p>
            <p><strong>Matériaux :</strong> {product.materiaux || "Acétate"}</p>
            <p><strong>Référence :</strong> {product.reference || `OPT-${product.id}`}</p>
          </div>

          {/* ✅ Description courte */}
          <p className="text-gray-600 leading-relaxed">
            Ces lunettes offrent un design moderne avec un excellent confort. Idéales pour un usage quotidien,
            elles sont fabriquées avec des matériaux de haute qualité assurant durabilité et élégance.
          </p>

          {/* ❤️ Icône Ajouter aux favoris */}
          <button
            onClick={toggleLike}
            className="flex items-center gap-2 text-[#ffaf50] text-xl transition"
          >
            <FiHeart className={`${liked ? "fill-current text-red-500" : "text-gray-400"}`} />
          </button>

          {/* 🛒 Ajouter au panier */}
          <button className="w-full md:w-auto px-6 py-3 bg-[#ffaf50] text-white font-semibold rounded-md hover:bg-[#e69940] transition">
            <FiShoppingCart className="text-xl inline-block mr-2" /> Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
