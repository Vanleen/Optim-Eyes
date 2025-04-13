import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [
            {
                glassId: { type: mongoose.Schema.Types.ObjectId, ref: 'Glass', required: true },
                quantity: { type: Number, required: true }
            }
        ],
        totalPrice: { type: Number, required: true },
        status: { type: String, enum: ['En attente de paiement', 'Payée', 'Expédiée', 'Annulée'], default: 'En attente de paiement' },
        paymentMethod: { type: String, enum: ['Stripe', 'PayPal'], required: true },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date }
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
