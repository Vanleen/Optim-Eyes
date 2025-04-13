import mongoose from 'mongoose';

const chatMessageSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        message: { type: String, required: true },
        response: { type: mongoose.Schema.Types.Mixed, required: true } // ✅ Accepte texte + objets JSON
    },
    { timestamps: true }
);

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
export default ChatMessage;
