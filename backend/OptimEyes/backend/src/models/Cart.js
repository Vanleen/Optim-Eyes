import mongoose from 'mongoose';

const cartSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [
            {
                glassId: { type: mongoose.Schema.Types.ObjectId, ref: 'Glass', required: true },
                quantity: { type: Number, required: true }
            }
        ]
    },
    { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
