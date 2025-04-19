// backend/src/models/formModel.js
import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    visionIssues: { type: String, required: true },
    glassesOrContacts: { type: String, required: true },
    ocularHistory: { type: String, required: true },
    examFrequency: { type: String, required: true },
    screenSensitivity: { type: String, required: true },
    familyHistory: { type: String, required: true },
    allergies: { type: String },
    prescriptionFilePath: { type: String },
    prescriptionFileName: { type: String },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);

export default Form;
