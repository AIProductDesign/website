import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Ongeldig e-mailadres of wachtwoord.');
    } else {
      navigate('/forum');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <a href="/" className="block text-center mb-8 tracking-widest font-bold text-[#1D1D1F] text-xl" style={{ fontFamily: "'Dyson Sans Modern', sans-serif" }}>
          aipec
        </a>

        <div className="bg-white rounded-2xl shadow-sm border border-black/6 p-8">
          <h1 className="text-xl font-semibold text-[#1D1D1F] mb-1">Aanmelden</h1>
          <p className="text-sm text-[#1D1D1F]/50 mb-6">Toegang tot het bedrijvenplatform</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#1D1D1F]/60 mb-1.5">E-mailadres</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="bedrijf@voorbeeld.be"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] text-sm text-[#1D1D1F] placeholder:text-[#1D1D1F]/30 focus:outline-none focus:ring-2 focus:ring-[#4B9FFF]/40 focus:border-[#4B9FFF] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1D1D1F]/60 mb-1.5">Wachtwoord</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] text-sm text-[#1D1D1F] placeholder:text-[#1D1D1F]/30 focus:outline-none focus:ring-2 focus:ring-[#4B9FFF]/40 focus:border-[#4B9FFF] transition"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#1D1D1F] text-white text-sm font-semibold hover:bg-[#1D1D1F]/80 transition disabled:opacity-50"
            >
              {loading ? 'Aanmelden…' : 'Aanmelden'}
            </button>
          </form>

          <p className="text-center text-xs text-[#1D1D1F]/40 mt-6">
            Nog geen account?{' '}
            <Link to="/register" className="text-[#4B9FFF] hover:underline font-medium">
              Registreer hier
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
