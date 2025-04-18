// frontend/src/pages/formulaireRecommendations.jsx
import React, { useState } from 'react';
import axios        from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth }  from '../context/AuthContext';

export default function RecommendationsPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  // ── ÉTAT FORMULAIRE PRÉFÉRENCES ───────────────────────────────────────────
  const [prefs, setPrefs] = useState({
    budget: '',
    correction: '',
    style: '',
    marquesPreferees: []
  });
  const [prefRecs, setPrefRecs] = useState([]);
  const [prefSuccess, setPrefSuccess] = useState(false);
  const [loadingPrefs, setLoadingPrefs] = useState(false);

  // ── ÉTAT FORMULAIRE IA ────────────────────────────────────────────────────
  const [faceShape, setFaceShape] = useState('');
  const [aiRecs, setAiRecs] = useState([]);
  const [loadingAi, setLoadingAi] = useState(false);

  // Gérer la saisie du formulaire préférences
  const handlePrefChange = e => {
    const { name, value } = e.target;
    if (name === 'marquesPreferees') {
      setPrefs({ ...prefs, [name]: value.split(',').map(s => s.trim()) });
    } else {
      setPrefs({ ...prefs, [name]: value });
    }
  };

  // Soumettre les préférences → POST then GET
  const handlePrefsSubmit = async e => {
    e.preventDefault();
    if (!user) return navigate('/login');
    setLoadingPrefs(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/recommendations`,
        { userId: user._id, ...prefs },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPrefSuccess(true);
      // Récupérer tout de suite les recommandations
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/recommendations/${user._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPrefRecs(data);
    } catch (err) {
      console.error('Erreur préférences :', err.response?.data || err);
    } finally {
      setLoadingPrefs(false);
    }
  };

  // Soumettre l’image → POST FormData
  const handleAiChange = e => {
    setFaceShape('');
    setAiRecs([]);
    e.target.files.length && setAiRecs(null);
  };
  const handleAiSubmit = async e => {
    e.preventDefault();
    const file = e.target.image.files[0];
    if (!file) return;
    setLoadingAi(true);
    try {
      const form = new FormData();
      form.append('image', file);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/ai/recommendations`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setFaceShape(data.faceShape);
      setAiRecs(data.recommendations);
    } catch (err) {
      console.error('Erreur IA :', err.response?.data || err);
    } finally {
      setLoadingAi(false);
    }
  };

  // Helper pour URL d’image
  const fmtImg = url =>
    url.startsWith('http') ? url : `${process.env.REACT_APP_API_URL}${url}`;

  return (
    <section className="pt-40 pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto max-w-xl px-6 bg-white p-8 rounded-lg shadow-md">

        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Recommandations de lunettes
        </h1>

        {/* ── FORMULAIRE PRÉFÉRENCES ───────────────────────────────────────── */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Basées sur vos préférences
        </h2>
        <form onSubmit={handlePrefsSubmit} className="space-y-4 mb-6">
          <input
            type="text" name="budget"
            placeholder="Budget (ex : moins de 100€)"
            value={prefs.budget}
            onChange={handlePrefChange}
            required
            className="border rounded px-4 py-2 w-full"
          />
          <input
            type="text" name="correction"
            placeholder="Correction (ex : myopie)"
            value={prefs.correction}
            onChange={handlePrefChange}
            required
            className="border rounded px-4 py-2 w-full"
          />
          <input
            type="text" name="style"
            placeholder="Style (ex : moderne)"
            value={prefs.style}
            onChange={handlePrefChange}
            required
            className="border rounded px-4 py-2 w-full"
          />
          <input
            type="text" name="marquesPreferees"
            placeholder="Marques (séparées par une virgule)"
            value={prefs.marquesPreferees.join(', ')}
            onChange={handlePrefChange}
            className="border rounded px-4 py-2 w-full"
          />
          <button
            type="submit"
            disabled={loadingPrefs}
            className="w-full bg-[#ffaf50] hover:bg-[#e69940] text-white font-semibold py-3 rounded transition"
          >
            {loadingPrefs ? 'Chargement…' : 'Enregistrer & Recommander'}
          </button>
        </form>

        {prefSuccess && prefRecs.length > 0 && (
          <ul className="mb-8 space-y-4">
            {prefRecs.map((g, i) => (
              <li key={i} className="flex items-center border-b pb-4">
                <img
                  src={fmtImg(g.imageUrl)}
                  alt={g.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                  onError={e => { e.target.onerror=null; e.target.src='/placeholder.png'; }}
                />
                <div>
                  <p className="font-medium">{g.name}</p>
                  <p className="text-gray-600">
                    {g.brand} — {g.price.toFixed(2)} €
                  </p>
                  <p className="text-sm text-gray-500">{g.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* ── FORMULAIRE IA ─────────────────────────────────────────────────── */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Générées par IA (upload de photo)
        </h2>
        <form onSubmit={handleAiSubmit} className="space-y-4 mb-6">
          <input
            type="file" name="image" accept="image/*"
            onChange={handleAiChange}
            required
            className="border rounded px-4 py-2 w-full"
          />
          <button
            type="submit"
            disabled={loadingAi}
            className="w-full bg-[#ffaf50] hover:bg-[#e69940] text-white font-semibold py-3 rounded transition"
          >
            {loadingAi ? 'Chargement…' : 'Envoyer la photo'}
          </button>
        </form>

        {faceShape && (
          <p className="mb-4 text-center text-gray-700">
            Forme de visage détectée : <strong>{faceShape}</strong>
          </p>
        )}
        {aiRecs && aiRecs.length > 0 && (
          <ul className="space-y-4">
            {aiRecs.map((g, i) => (
              <li key={i} className="flex items-center border-b pb-4">
                <img
                  src={fmtImg(g.imageUrl)}
                  alt={g.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                  onError={e => { e.target.onerror=null; e.target.src='/placeholder.png'; }}
                />
                <div>
                  <p className="font-medium">{g.name}</p>
                  <p className="text-gray-600">
                    {g.brand} — {g.price.toFixed(2)} €
                  </p>
                  <p className="text-sm text-gray-500">{g.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

      </div>
    </section>
  );
}
