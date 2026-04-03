import { Zap, Map, Users, TrendingUp, ExternalLink, MessageSquare } from 'lucide-react';

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

export function About() {
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

        {/* Four focus points — no box, just divider lines */}
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

        {/* Forum CTA */}
        <div className="reveal mt-14 pt-10 border-t border-black/6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="section-label text-xs font-mono text-[#4B9FFF] tracking-widest mb-6">BEDRIJVENPLATFORM</p>
            <h3 className="text-xl font-bold text-[#1D1D1F] mb-1">Deel kennis met andere deelnemers</h3>
            <p className="text-sm text-[#4A4A4F] leading-relaxed max-w-md">
              Wissel ervaringen uit, stel vragen en leer van andere bedrijven via ons besloten forum.
            </p>
          </div>
          <a
            href="/#/forum"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#1D1D1F] text-white text-sm font-semibold rounded-full hover:bg-[#1D1D1F]/80 transition"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Naar het forum
          </a>
        </div>
      </div>
    </section>
  );
}
