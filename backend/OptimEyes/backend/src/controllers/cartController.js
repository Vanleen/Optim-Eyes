import Cart from '../models/Cart.js';

// ✅ Ajouter un produit au panier
export const addToCart = async (req, res) => {
    const { userId, glassId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.glassId.toString() === glassId);

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ glassId, quantity });
    }

    await cart.save();
    res.json(cart);
};

// ✅ Récupérer le panier d’un utilisateur
export const getCart = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.glassId');
    res.json(cart ? cart.items : []);
};

// ✅ Supprimer un produit du panier
export const removeFromCart = async (req, res) => {
    const { userId, glassId } = req.body;
    const cart = await Cart.findOne({ userId });

    if (cart) {
        cart.items = cart.items.filter(item => item.glassId.toString() !== glassId);
        await cart.save();
    }

    res.json(cart);
};
