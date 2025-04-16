import Form from "../models/formModel.js";

export const createForm = async (req, res) => {
  try {
    const { firstname, lastname, age, weight, height, rhesus, allergies } = req.body;

    const newForm = new Form({
      firstname,
      lastname,
      age,
      weight,
      height,
      rhesus,
      allergies,
    });

    await newForm.save();

    res.status(200).json({ message: "Formulaire reçu avec succès" });
  } catch (err) {
    console.error("❌ Erreur lors de l'enregistrement du formulaire :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Formulaire non trouvé" });
    res.status(200).json(form);
  } catch (err) {
    console.error("❌ Erreur récupération formulaire :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    console.error("❌ Erreur récupération tous les formulaires :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
