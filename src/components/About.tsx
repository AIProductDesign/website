import { useState, useEffect } from 'react';
import { Zap, Map, Users, TrendingUp, ExternalLink, Heart, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { avatarColor, avatarInitial } from '../lib/avatarColor';

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
  like_count?: number;
  reply_count?: number;
};

export function About() {
  const [posts, setPosts] = useState<PreviewPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select('id, title, content, created_at, profiles(company_name)')
        .order('created_at', { ascending: false })
        .limit(6);

      if (!data) return;

      const enriched = await Promise.all(data.map(async (post) => {
        const [{ count: likeCount }, { count: replyCount }] = await Promise.all([
          supabase.from('post_likes').select('*', { count: 'exact', head: true }).eq('post_id', post.id),
          supabase.from('replies').select('*', { count: 'exact', head: true }).eq('post_id', post.id),
        ]);
        return { ...post, like_count: likeCount ?? 0, reply_count: replyCount ?? 0 };
      }));

      setPosts(enriched);
    };
    fetchPosts();
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('nl-BE', { day: 'numeric', month: 'short' });

  return (
    <section id="about" className="bg-white pt-4 pb-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
        <p className="section-label text-xs font-mono text-[#4B9FFF] tracking-widest mb-6">01 / WAAROM AIPEC</p>
        <div className="reveal-line h-px bg-black/8 mb-14" />

        {/* Two-column: heading left, description right */}
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

        {/* Four focus points */}
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

        {/* Forum preview */}
        <div className="reveal mt-14 pt-10 border-t border-black/6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="section-label text-xs font-mono text-[#4B9FFF] tracking-widest mb-3">02 / BEDRIJVENPLATFORM</p>
              <h3 className="text-3xl sm:text-4xl font-black text-[#1D1D1F] leading-[1.05] tracking-tight">Wat er leeft</h3>
              <p className="text-3xl sm:text-4xl font-black text-[#1D1D1F]/25 leading-[1.05] tracking-tight">bij de deelnemers.</p>
            </div>
            <a
              href="/#/forum"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#1D1D1F]/40 hover:text-[#1D1D1F] transition font-medium"
            >
              Alles bekijken
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {posts.length === 0 ? (
            <p className="text-xs font-mono text-[#1D1D1F]/20 tracking-wide py-8 text-center">
              Nog geen berichten geplaatst.
            </p>
          ) : (
            <div
              className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 sm:-mx-10 sm:px-10 lg:-mx-12 lg:px-12 scrollbar-none"
              style={{ scrollbarWidth: 'none' }}
            >
              {posts.map(post => {
                const company = (post.profiles as any)?.company_name ?? 'Onbekend';
                return (
                  <a
                    key={post.id}
                    href="/#/forum"
                    className="flex-shrink-0 w-64 sm:w-72 bg-[#F5F5F7] rounded-2xl p-5 flex flex-col gap-3 hover:bg-[#EBEBED] transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                        style={{ background: avatarColor(company) }}
                      >
                        {avatarInitial(company)}
                      </div>
                      <span className="text-xs font-medium text-[#1D1D1F]/50 truncate">{company}</span>
                      <span className="text-[#1D1D1F]/15 ml-auto shrink-0">·</span>
                      <span className="text-xs text-[#1D1D1F]/30 shrink-0">{formatDate(post.created_at)}</span>
                    </div>
                    <p className="text-sm font-semibold text-[#1D1D1F] leading-snug line-clamp-2 group-hover:text-[#4B9FFF] transition-colors">
                      {post.title}
                    </p>
                    <p className="text-xs text-[#1D1D1F]/40 leading-relaxed line-clamp-2 flex-1">{post.content}</p>
                    <div className="flex items-center gap-3 pt-1">
                      <span className="flex items-center gap-1 text-xs text-[#1D1D1F]/25">
                        <Heart className="w-3 h-3" />
                        {post.like_count}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          <a
            href="/#/forum"
            className="sm:hidden mt-5 flex items-center justify-center gap-1.5 text-xs text-[#1D1D1F]/40 hover:text-[#1D1D1F] transition font-medium"
          >
            Alles bekijken
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
