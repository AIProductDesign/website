import { useState, useEffect } from 'react';
import { Zap, Map, Users, TrendingUp, ExternalLink, ArrowRight, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { avatarColor } from '../lib/avatarColor';
import { useAuth } from '../contexts/AuthContext';

const focusPoints = [
  {
    icon: Zap,
    title: 'Direct toegang tot AI-kennis en innovaties',
    description: 'Blijf up-to-date met de nieuwste AI-ontwikkelingen en onderzoek binnen UA, vertaald naar concrete toepassingen voor productontwikkeling.',
  },
  {
    icon: Map,
    title: 'Concrete tools, methodes en workflows',
    description: 'Werk met praktische toolkits en bewezen methodes die je helpen AI effectief toe te passen in je organisatie.',
  },
  {
    icon: TrendingUp,
    title: 'Van inzichten naar directe impact',
    description: 'Vertaal data en analyses naar concrete ontwerpkeuzes, productverbeteringen en circulaire innovaties.',
  },
  {
    icon: Users,
    title: 'Sterk netwerk van bedrijven en experten',
    description: 'Leer van andere bedrijven, wissel ervaringen uit en ontdek hoe AI vandaag al wordt ingezet in industriële contexten.',
  },
];

type PreviewPost = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  profiles?: { company_name: string };
};

export function About() {
  const { user, profile } = useAuth();
  const [latestPost, setLatestPost] = useState<PreviewPost | null>(null);
  const [quickText, setQuickText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [posted, setPosted] = useState(false);

  const fetchLatest = async () => {
    const { data } = await supabase
      .from('posts')
      .select('id, title, content, created_at, profiles(company_name)')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    if (data) setLatestPost(data as PreviewPost);
  };

  useEffect(() => { fetchLatest(); }, []);

  const handleQuickPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickText.trim() || !user) return;
    setSubmitting(true);
    const title = quickText.trim().split('\n')[0].slice(0, 80);
    await supabase.from('posts').insert({ author_id: user.id, title, content: quickText.trim() });
    setQuickText('');
    setPosted(true);
    await fetchLatest();
    setSubmitting(false);
    setTimeout(() => setPosted(false), 3000);
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' });

  return (
    <section id="about" className="bg-white pt-4 pb-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
        <p className="section-label text-xs font-mono text-[#4B9FFF] tracking-widest mb-6">01 / WAAROM AIPEC</p>
        <div className="reveal-line h-px bg-black/8 mb-14" />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-14">
          <h2>
            <div className="reveal-heading mb-2">
              <span className="text-5xl sm:text-6xl font-black text-[#1D1D1F] leading-[1.05] tracking-tight">
                AI dat uw ontwerpteam
              </span>
            </div>
            <div className="reveal-heading" style={{ transitionDelay: '100ms' }}>
              <span className="text-5xl sm:text-6xl font-black text-[#1D1D1F]/75 leading-[1.05] tracking-tight">
                versterkt.
              </span>
            </div>
          </h2>
          <div>
            <p className="reveal text-base text-[#4A4A4F] leading-relaxed mb-6" style={{ transitionDelay: '80ms' }}>
              <span style={{ fontFamily: "'Dyson Sans Modern', sans-serif" }}>aipec</span> levert toolkits, begeleide workshops en bedrijfsspecifieke use-cases, zodat uw
              ontwerpteam AI morgen kan toepassen, niet pas na jaren onderzoek. Als TETRA-project
              ondersteund door VLAIO, dichten wij de kenniskloof tussen onderzoek en bedrijf.
            </p>
            <div className="reveal" style={{ transitionDelay: '130ms' }}>
              <a
                href="https://www.vlaio.be/nl/vlaio-netwerk/tetra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#4B9FFF]/70 hover:text-[#4B9FFF] transition-colors"
              >
                Meer over TETRA
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="reveal-stagger flex flex-col sm:flex-row">
          {focusPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <div key={point.title} className="flex-1 flex flex-col gap-2.5 py-6 sm:px-6 first:pl-0 last:pr-0 relative border-b sm:border-b-0 border-black/6 last:border-0">
                {i > 0 && <div className="hidden sm:block absolute left-0 inset-y-0 w-px bg-black/6" />}
                <Icon className="w-4 h-4 text-[#4B9FFF] flex-shrink-0" />
                <p className="text-sm font-semibold text-[#1D1D1F] leading-snug">{point.title}</p>
                <p className="text-xs text-[#4A4A4F] leading-relaxed">{point.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bedrijvenplatform */}
        <div className="reveal mt-14 pt-10 border-t border-black/6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="section-label text-xs font-mono text-[#4B9FFF] tracking-widest mb-3">02 / BEDRIJVENFORUM</p>
              <h3 className="text-3xl sm:text-4xl font-black text-[#1D1D1F] leading-[1.05] tracking-tight">Wat er leeft</h3>
              <p className="text-3xl sm:text-4xl font-black text-[#1D1D1F]/25 leading-[1.05] tracking-tight">bij de deelnemers.</p>
            </div>
            <a href="/#/forum" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#1D1D1F]/40 hover:text-[#1D1D1F] transition font-medium">
              Alle berichten
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">

            {/* Quick post — white card */}
            <div className="bg-white rounded-2xl border border-black/8 shadow-sm p-5 flex flex-col">
              {user && profile ? (
                <form onSubmit={handleQuickPost} className="flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: avatarColor(profile.company_name) + '18', border: `1.5px solid ${avatarColor(profile.company_name)}35` }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: avatarColor(profile.company_name) }} />
                    </div>
                    <span className="text-xs font-medium text-[#1D1D1F]/50">{profile.company_name}</span>
                  </div>
                  <textarea
                    value={quickText}
                    onChange={e => setQuickText(e.target.value)}
                    rows={4}
                    placeholder={`Wat wil je delen, ${profile.company_name.split(' ')[0]}?`}
                    className="flex-1 w-full text-sm text-[#1D1D1F] placeholder:text-[#1D1D1F]/25 bg-[#F5F5F7] rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#4B9FFF]/20 leading-relaxed mb-4"
                  />
                  <div className="flex items-center justify-between">
                    {posted ? (
                      <span className="text-xs text-[#4B9FFF] font-medium">Geplaatst!</span>
                    ) : (
                      <span className="text-xs text-[#1D1D1F]/25">{quickText.length > 0 ? `${quickText.length} tekens` : ''}</span>
                    )}
                    <button
                      type="submit"
                      disabled={submitting || !quickText.trim()}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#1D1D1F] text-white text-xs font-semibold rounded-full hover:bg-[#1D1D1F]/80 transition disabled:opacity-35"
                    >
                      <Send className="w-3 h-3" />
                      {submitting ? 'Plaatsen…' : 'Plaatsen'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col flex-1 gap-4">
                  <p className="text-sm font-semibold text-[#1D1D1F]">Deel jouw inzicht</p>
                  <div className="flex-1 bg-[#F5F5F7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F]/25 leading-relaxed">
                    Wat wil je delen met de groep?
                  </div>
                  <a
                    href="/#/login"
                    className="self-end flex items-center gap-1.5 px-4 py-2 bg-[#1D1D1F] text-white text-xs font-semibold rounded-full hover:bg-[#1D1D1F]/80 transition"
                  >
                    Aanmelden om te plaatsen
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Latest post — white card */}
            {latestPost ? (() => {
              const company = (latestPost.profiles as any)?.company_name ?? 'Onbekend';
              const color = avatarColor(company);
              return (
                <a
                  href="/#/forum"
                  className="bg-white rounded-2xl border border-black/8 shadow-sm p-5 flex flex-col gap-3 hover:border-[#4B9FFF]/30 hover:shadow-md transition group"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: color + '18', border: `1.5px solid ${color}35` }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                    </div>
                    <span className="text-xs font-medium text-[#1D1D1F]/50 flex-1 truncate">{company}</span>
                    <span className="text-xs text-[#1D1D1F]/25 font-mono shrink-0">{formatDate(latestPost.created_at)}</span>
                  </div>
                  <div className="flex-1 bg-[#F5F5F7] rounded-xl px-4 py-3 flex flex-col gap-2">
                    <p className="text-sm font-semibold text-[#1D1D1F] group-hover:text-[#4B9FFF] transition-colors leading-snug line-clamp-2">
                      {latestPost.title}
                    </p>
                    <p className="text-xs text-[#1D1D1F]/45 leading-relaxed line-clamp-3">{latestPost.content}</p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-[#1D1D1F]/30 font-mono">Laatste bericht</span>
                    <span className="flex items-center gap-1 text-xs text-[#4B9FFF]/60 group-hover:text-[#4B9FFF] transition font-medium">
                      Bekijk forum <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              );
            })() : (
              <div className="bg-white rounded-2xl border border-black/8 shadow-sm p-5 flex items-center justify-center">
                <p className="text-xs font-mono text-[#1D1D1F]/20 tracking-wide">Nog geen berichten.</p>
              </div>
            )}

          </div>

          <a href="/#/forum" className="sm:hidden mt-5 flex items-center justify-center gap-1.5 text-xs text-[#1D1D1F]/40 hover:text-[#1D1D1F] transition font-medium">
            Alle berichten <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
