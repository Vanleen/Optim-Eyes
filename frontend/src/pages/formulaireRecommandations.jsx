// frontend/src/pages/FormulaireRecommandations.jsx
import React, { useState }   from 'react';
import axios                  from 'axios';
import { Link, useNavigate }  from 'react-router-dom';
import { useAuth }            from '../context/AuthContext';

export default function FormulaireRecommandations() {
  const { user }     = useAuth();
  const token        = user?.token;
  const navigate     = useNavigate();
  const API_URL      = process.env.REACT_APP_API_URL;

  // ── PRÉFÉRENCES ───────────────────────────────
  const [prefs, setPrefs] = useState({
    budget: '', correction: '', style: '',
    category: 'optique', gender: 'mixte',
    marquesPreferees: []
  });
  const [prefRecs, setPrefRecs]         = useState([]);
  const [prefSuccess, setPrefSuccess]   = useState(false);
  const [loadingPrefs, setLoadingPrefs] = useState(false);

  // ── IA (PHOTO) ────────────────────────────────
  const [faceShape, setFaceShape] = useState('');
  const [aiRecs, setAiRecs]       = useState([]);
  const [loadingAi, setLoadingAi] = useState(false);

  const handlePrefChange = e => {
    const { name, value } = e.target;
    if (name === 'marquesPreferees') {
      setPrefs({ ...prefs, [name]: value.split(',').map(s => s.trim()) });
    } else {
      setPrefs({ ...prefs, [name]: value });
    }
  };

  const handlePrefsSubmit = async e => {
    e.preventDefault();
    if (!token) return navigate('/login');
    setLoadingPrefs(true);
    try {
      // 1) Enregistre prefs
      await axios.post(
        `${API_URL}/api/recommendations`,
        { userId: user._id, ...prefs },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPrefSuccess(true);

      // 2) Récupère recos prefs
      const { data } = await axios.get(
        `${API_URL}/api/recommendations/${user._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPrefRecs(data);
    } catch (err) {
      console.error('Erreur préférences :', err.response?.data || err);
    } finally {
      setLoadingPrefs(false);
    }
  };

  const handleAiChange = () => {
    setFaceShape('');
    setAiRecs([]);
  };

  const handleAiSubmit = async e => {
    e.preventDefault();
    if (!token) return navigate('/login');
    const file = e.target.image.files[0];
    if (!file) return;
    setLoadingAi(true);
    try {
      // 1) Detect face shape
      const formData = new FormData();
      formData.append('image', file);
      const detectRes = await axios.post(
        `${API_URL}/api/ai/detect-face-shape`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      const shape = detectRes.data.faceShape;
      setFaceShape(shape);

      // 2) Recos IA
      const { data: recs } = await axios.post(
        `${API_URL}/api/ai/recommendations`,
        { userId: user._id, faceShape, ...prefs },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAiRecs(recs);
    } catch (err) {
      console.error('Erreur IA :', err.response?.data || err);
    } finally {
      setLoadingAi(false);
    }
  };

  const fmtImg = url =>
    url.startsWith('http') ? url : `${API_URL}${url}`;

  return (
    <section className="pt-40 pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto max-w-xl px-6 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Vos recommandations personnalisées
        </h1>

        {/* Préférences */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Basées sur vos préférences
        </h2>
        <form onSubmit={handlePrefsSubmit} className="space-y-4 mb-6">
          <input
            name="budget" placeholder="Budget (ex : moins de 100€)"
            value={prefs.budget} onChange={handlePrefChange} required
            className="border rounded px-4 py-2 w-full"
          />
          <input
            name="correction" placeholder="Correction (ex : myopie)"
            value={prefs.correction} onChange={handlePrefChange} required
            className="border rounded px-4 py-2 w-full"
          />
          <input
            name="style" placeholder="Style (ex : moderne)"
            value={prefs.style} onChange={handlePrefChange} required
            className="border rounded px-4 py-2 w-full"
          />

          <select
            name="category" value={prefs.category}
            onChange={handlePrefChange} className="border rounded px-4 py-2 w-full"
          >
            <option value="optique">Optique</option>
            <option value="solaire">Solaires</option>
          </select>

          <select
            name="gender" value={prefs.gender}
            onChange={handlePrefChange} className="border rounded px-4 py-2 w-full"
          >
            <option value="mixte">Mixte</option>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
            <option value="enfant">Enfant</option>
          </select>

          <input
            name="marquesPreferees"
            placeholder="Marques (séparées par une virgule)"
            value={prefs.marquesPreferees.join(', ')}
            onChange={handlePrefChange}
            className="border rounded px-4 py-2 w-full"
          />

          <button
            type="submit" disabled={loadingPrefs}
            className="w-full bg-[#ffaf50] hover:bg-[#e69940] text-white py-3 rounded transition"
          >
            {loadingPrefs ? 'Chargement…' : 'Voir mes recommandations'}
          </button>
        </form>

        {/* Affichage des recommandations prefs */}
        {prefSuccess && prefRecs.length > 0 && (
          <ul className="mb-8 space-y-4">
            {prefRecs.map((g, i) => (
              <Link
                key={i}
                to={`/product/${g._id}`}
                className="flex items-center border-b pb-4 hover:bg-gray-50 transition"
              >
                <img
                  src={fmtImg(g.imageUrl)}
                  alt={g.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <p className="font-medium">{g.name}</p>
                  <p className="text-gray-600">{g.brand} — {g.price.toFixed(2)} €</p>
                </div>
              </Link>
            ))}
          </ul>
        )}

        {/* Upload photo / IA */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Générées par IA (upload de photo)
        </h2>
        <form onSubmit={handleAiSubmit} className="space-y-4 mb-6">
          <input
            type="file" name="image" accept="image/*"
            onChange={handleAiChange} required
            className="border rounded px-4 py-2 w-full"
          />
          <button
            type="submit" disabled={loadingAi}
            className="w-full bg-[#ffaf50] hover:bg-[#e69940] text-white py-3 rounded transition"
          >
            {loadingAi ? 'Chargement…' : 'Voir recos IA'}
          </button>
        </form>

        {faceShape && (
          <p className="mb-4 text-center text-gray-700">
            Forme détectée : <strong>{faceShape}</strong>
          </p>
        )}
        {aiRecs.length > 0 && (
          <ul className="space-y-4">
            {aiRecs.map((g, i) => (
              <Link
                key={i}
                to={`/product/${g._id}`}
                className="flex items-center border-b pb-4 hover:bg-gray-50 transition"
              >
                <img
                  src={fmtImg(g.imageUrl)}
                  alt={g.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <p className="font-medium">{g.name}</p>
                  <p className="text-gray-600">{g.brand} — {g.price.toFixed(2)} €</p>
                </div>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
