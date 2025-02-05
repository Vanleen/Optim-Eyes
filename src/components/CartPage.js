import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiTrash } from "react-icons/fi";

const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const handleCartUpdate = () => {
          const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
          setCart(storedCart);
        };
      
        window.addEventListener("storage", handleCartUpdate);
        return () => window.removeEventListener("storage", handleCartUpdate);
      }, []);
      
  
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    }, []);
  
    const removeFromCart = (id) => {
      const updatedCart = cart.filter((product) => product.id !== id);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
  
      // 🔄 Met à jour le header en dispatchant un événement "storage"
      setTimeout(() => {
        window.dispatchEvent(new Event("storage"));
      }, 200);
          
    };
  
    const getTotalPrice = () => {
      return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
    };

  return (
    <section className="mt-[180px] pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-8">
          Mon Panier 🛒
        </h1>

        {cart.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b pb-4 mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.price} €</p>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromCart(product.id)}
                >
                  <FiTrash className="text-xl" />
                </button>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <p className="text-xl font-semibold">Total : {getTotalPrice()} €</p>
              <button className="px-6 py-3 bg-[#ffaf50] text-white font-semibold rounded-md hover:bg-[#e69940] transition">
                Passer la commande
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">Votre panier est vide.</p>
        )}

        <div className="text-center mt-8">
          <Link
            to="/catalogue/optique"
            className="px-6 py-3 bg-[#0077B6] text-white font-semibold rounded-md hover:bg-[#e69940] transition"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
