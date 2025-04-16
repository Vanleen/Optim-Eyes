// backend/src/models/formModel.js
import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    rhesus: { type: String, required: true },
    allergies: { type: String },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);

export default Form;
