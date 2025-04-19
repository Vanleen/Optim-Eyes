// backend/src/controllers/formController.js
import Form from "../models/formModel.js";

export const createForm = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      age,
      visionIssues,
      glassesOrContacts,
      ocularHistory,
      examFrequency,
      screenSensitivity,
      familyHistory,
      allergies,
    } = req.body;

    // 🔍 Log des données reçues
    console.log("📥 Données reçues via POST /api/form :");
    console.log("➡️ Champs :", req.body);
    console.log("📎 Fichier :", req.file);

    const newForm = new Form({
      firstname,
      lastname,
      age,
      visionIssues,
      glassesOrContacts,
      ocularHistory,
      examFrequency,
      screenSensitivity,
      familyHistory,
      allergies,
      prescriptionFilePath: req.file?.path || null,
      prescriptionFileName: req.file?.originalname || null,
    });

    await newForm.save();

    res.status(200).json({ message: "Formulaire reçu avec succès" });
  } catch (err) {
    console.error("❌ Erreur lors de l'enregistrement du formulaire :", err);
    res.status(500).json({ error: err.message || "Erreur serveur" });
  }
};

export const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Formulaire non trouvé" });
    res.status(200).json(form);
  } catch (err) {
    console.error("❌ Erreur récupération formulaire :", err);
    res.status(500).json({ error: err.message || "Erreur serveur" });
  }
};

export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    console.error("❌ Erreur récupération tous les formulaires :", error);
    res.status(500).json({ error: error.message || "Erreur serveur" });
  }
};
