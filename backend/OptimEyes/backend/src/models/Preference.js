import mongoose from 'mongoose';

const preferenceSchema = mongoose.Schema({
  userId:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  budget:           { type: String },
  correction:       { type: String },
  style:            { type: String },
  category:         { type: String },       // "optique" ou "solaire"
  gender:           { type: String },       // "mixte","homme","femme","enfant"
  marquesPreferees: [String]
}, { timestamps: true });

export default mongoose.model('Preference', preferenceSchema);
