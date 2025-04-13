import mongoose from 'mongoose';

const glassSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: false },
    frameType: { type: String, required: false },
    material: { type: String, required: false },
    category: { type: String, required: true }, // Ex: sport, repos, natation, etc.
    gender: {
      type: String,
      required: false,
      enum: ["Homme", "Femme", "Mixte", "Enfant"], // ✅ Ajout de Enfant ici
    },
    recommendedAge: { type: Number, required: false }
  },
  { timestamps: true }
);

const Glass = mongoose.model('Glass', glassSchema);
export default Glass;
