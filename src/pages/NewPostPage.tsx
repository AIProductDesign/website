import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';

export function NewPostPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase
      .from('posts')
      .insert({ author_id: user!.id, title, content });

    if (error) {
      setError('Fout: ' + error.message);
    } else {
      navigate('/forum');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <header className="bg-white border-b border-black/6 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <a href="/" className="tracking-widest font-bold text-[#1D1D1F]" style={{ fontFamily: "'Dyson Sans Modern', sans-serif" }}>
            aipec
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/forum" className="inline-flex items-center gap-1.5 text-sm text-[#1D1D1F]/40 hover:text-[#1D1D1F] transition mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Terug naar forum
        </Link>

        <h1 className="text-2xl font-semibold text-[#1D1D1F] mb-8">Nieuw bericht</h1>

        <div className="bg-white rounded-2xl border border-black/6 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-[#1D1D1F]/60 mb-1.5">Titel</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                placeholder="Waar gaat jouw bericht over?"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] text-sm text-[#1D1D1F] placeholder:text-[#1D1D1F]/30 focus:outline-none focus:ring-2 focus:ring-[#4B9FFF]/40 focus:border-[#4B9FFF] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1D1D1F]/60 mb-1.5">Bericht</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                required
                rows={8}
                placeholder="Schrijf hier je bericht…"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] text-sm text-[#1D1D1F] placeholder:text-[#1D1D1F]/30 focus:outline-none focus:ring-2 focus:ring-[#4B9FFF]/40 focus:border-[#4B9FFF] transition resize-none"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[#1D1D1F] text-white text-sm font-semibold rounded-xl hover:bg-[#1D1D1F]/80 transition disabled:opacity-50"
              >
                {loading ? 'Plaatsen…' : 'Bericht plaatsen'}
              </button>
              <Link
                to="/forum"
                className="px-6 py-2.5 bg-black/5 text-[#1D1D1F] text-sm font-semibold rounded-xl hover:bg-black/10 transition"
              >
                Annuleren
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
