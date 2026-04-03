import { Zap, Map, Users, TrendingUp, ExternalLink, ArrowRight } from 'lucide-react';
import { avatarColor } from '../lib/avatarColor';

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

const DEMO_POST = {
  company: 'Cortex Industries',
  date: '14 mrt',
  title: 'AI geeft antwoorden, maar stelt niet de juiste vragen',
  content: 'We werken nu zes maanden met generatieve AI in ons ontwerpproces. Het versnelt, dat klopt — maar ik merk dat mijn team minder diep nadenkt. De tool geeft altijd iets terug, en dat "iets" voelt al snel goed genoeg. Wie bewaakt nog het verschil tussen een snel antwoord en het juiste antwoord?',
};

export function About() {
  const formatDate = (d: string) => d;

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

          {/* Demo post — white card */}
          <a
            href="/#/forum"
            className="block bg-white rounded-2xl border border-black/8 shadow-sm p-5 hover:border-[#4B9FFF]/30 hover:shadow-md transition group"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: avatarColor(DEMO_POST.company) }} />
              <span className="text-xs font-medium text-[#1D1D1F]/50 flex-1">{DEMO_POST.company}</span>
              <span className="text-xs text-[#1D1D1F]/25 font-mono">{formatDate(DEMO_POST.date)}</span>
            </div>
            <div className="bg-[#F5F5F7] rounded-xl px-4 py-4 mb-4">
              <p className="text-sm font-semibold text-[#1D1D1F] group-hover:text-[#4B9FFF] transition-colors leading-snug mb-2">
                {DEMO_POST.title}
              </p>
              <p className="text-xs text-[#1D1D1F]/50 leading-relaxed">{DEMO_POST.content}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#1D1D1F]/25 font-mono">Voorbeeld bericht</span>
              <span className="flex items-center gap-1 text-xs text-[#4B9FFF]/60 group-hover:text-[#4B9FFF] transition font-medium">
                Ga naar het forum <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </a>

          <a href="/#/forum" className="sm:hidden mt-5 flex items-center justify-center gap-1.5 text-xs text-[#1D1D1F]/40 hover:text-[#1D1D1F] transition font-medium">
            Alle berichten <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
