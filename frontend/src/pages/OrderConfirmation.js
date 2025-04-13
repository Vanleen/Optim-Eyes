import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("order"));
    if (storedOrder) {
      setOrder(storedOrder);
    }
  }, []);

  if (!order) {
    return <p className="text-center text-gray-500">Aucune commande trouvée.</p>;
  }

  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold text-[#ffaf50]">Merci pour votre commande !</h1>
      <p className="mt-4 text-gray-600">Votre commande a été validée avec succès.</p>
      <p className="mt-2 text-lg font-semibold">Montant total : {order.total} €</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Résumé de votre commande :</h2>
        <ul className="mt-3">
          {order.products.map((product, index) => (
            <li key={index} className="mt-2">
              {product.name} - {product.price} €
            </li>
          ))}
        </ul>
      </div>

      <Link
        to="/"
        className="mt-6 inline-block bg-[#ffaf50] text-white px-6 py-3 rounded-md hover:bg-[#e69940] transition"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default OrderConfirmation;
