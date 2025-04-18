import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  userId:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  budget:           { type: String, required: true },
  correction:       { type: String, required: true },
  style:            { type: String, required: true },
  marquesPreferees: [{ type: String }]
}, {
  timestamps: true
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);
export default Recommendation;
