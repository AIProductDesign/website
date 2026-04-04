import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { sanitize } from '../lib/sanitize';

export function RegisterPage() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Meld direct aan zodat er een actieve sessie is voor de profielinvoeging
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError || !signInData.user) {
      setError('Account aangemaakt. Meld je aan om verder te gaan.');
      setLoading(false);
      navigate('/login');
      return;
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ id: signInData.user.id, company_name: sanitize(companyName.trim()) });

    if (profileError) {
      setError('Profiel kon niet worden opgeslagen: ' + profileError.message);
      setLoading(false);
      return;
    }

    navigate('/forum');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <a href="/" className="block text-center mb-8 tracking-widest font-bold text-[#1D1D1F] text-xl" style={{ fontFamily: "'Dyson Sans Modern', sans-serif" }}>
          aipec
        </a>

        <div className="bg-white rounded-2xl shadow-sm border border-black/6 p-8">
          <h1 className="text-xl font-semibold text-[#1D1D1F] mb-1">Account aanmaken</h1>
          <p className="text-sm text-[#1D1D1F]/50 mb-6">Toegang tot het bedrijvenplatform</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#1D1D1F]/60 mb-1.5">Bedrijfsnaam</label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                required
                maxLength={100}
                placeholder="Jouw bedrijf BV"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] text-sm text-[#1D1D1F] placeholder:text-[#1D1D1F]/30 focus:outline-none focus:ring-2 focus:ring-[#4B9FFF]/40 focus:border-[#4B9FFF] transition"
              />
            </div>

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
                minLength={8}
                maxLength={128}
                placeholder="Minimaal 8 tekens"
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
              {loading ? 'Account aanmaken…' : 'Account aanmaken'}
            </button>
          </form>

          <p className="text-center text-xs text-[#1D1D1F]/40 mt-6">
            Al een account?{' '}
            <Link to="/login" className="text-[#4B9FFF] hover:underline font-medium">
              Aanmelden
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
