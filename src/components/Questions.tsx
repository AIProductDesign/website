import { useState } from 'react';

const questions = [
  {
    num: '01',
    text: 'Hoe kan AI productbeslissingen verbeteren in plaats van enkel analyses te leveren?',
    answer:
      'AI kan beslissingen verbeteren door niet alleen inzichten te genereren, maar ook opties te vergelijken en consequenties zichtbaar te maken. De focus verschuift naar systemen die concrete keuzes ondersteunen : ontwerpvarianten, kostenimpact en risico\'s. Dit via predictive models, scenario-analyse en decision support tools geïntegreerd in het ontwikkelproces.',
  },
  {
    num: '02',
    text: 'Hoe vertalen we data en evaluaties naar concrete ontwerpkeuzes en redesigns?',
    answer:
      'Dit vereist een koppeling tussen analyse en actie. AI wordt verbonden met ontwerpomgevingen zoals CAD en simulatietools, zodat inzichten automatisch leiden tot aanpassingen. Parameters zoals materiaal, geometrie of modulariteit worden gewijzigd op basis van prestatiescores. Kern is een gesloten loop tussen evaluatie en redesign.',
  },
  {
    num: '03',
    text: 'Waar creëert AI vandaag echte waarde in productontwikkeling en waar niet?',
    answer:
      'AI creëert vandaag vooral waarde in drie domeinen: trendanalyse en ideation, voorspellingen in business cases, en optimalisatie in design en testing. Minder waardevol zijn generieke toepassingen zonder duidelijke use case of voldoende data. Succes hangt sterk af van context, datakwaliteit en integratie in bestaande processen.',
  },
  {
    num: '04',
    text: 'Hoe integreren we AI in bestaande ontwerp- en ontwikkelprocessen zonder extra complexiteit?',
    answer:
      'AI moet ingebed worden in bestaande tools en workflows in plaats van ernaast te bestaan. Dit betekent integratie met systemen zoals CAD, PLM en data platforms. Kleine, gerichte toepassingen werken beter dan grote transformaties. Door AI stap voor stap te koppelen aan bestaande beslismomenten blijft de complexiteit beheersbaar.',
  },
];

export function Questions() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="questions" className="bg-white pt-4 pb-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
        <p className="section-label text-xs font-mono text-[#4B9FFF] tracking-widest mb-6">02 / CENTRALE VRAGEN</p>
        <div className="reveal-line h-px bg-black/8 mb-14" />

        <div className="flex flex-col lg:flex-row lg:gap-20 mb-4">
          <div className="reveal-heading lg:w-72 flex-shrink-0 mb-12 lg:mb-0">
            <h2 className="text-5xl sm:text-6xl font-black text-[#1D1D1F] tracking-tight leading-tight">
              Vier centrale vragen.
            </h2>
          </div>

          <div className="flex-1 min-w-0 divide-y divide-black/6">
            {questions.map((q, i) => {
              const isOpen = open === q.num;
              return (
                <div key={q.num} className="reveal" style={{ transitionDelay: `${i * 55}ms` }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : q.num)}
                    className="w-full flex items-center gap-6 py-6 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="font-mono text-xs tracking-widest flex-shrink-0 w-6 transition-colors duration-300"
                      style={{ color: '#4B9FFF' }}
                    >
                      {q.num}
                    </span>
                    <span className="flex-1 text-base sm:text-lg font-bold text-[#1D1D1F] leading-snug tracking-tight group-hover:text-[#1D1D1F]/60 transition-colors duration-300">
                      {q.text}
                    </span>
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300"
                      style={{
                        borderColor: isOpen ? '#4B9FFF' : 'rgba(0,0,0,0.12)',
                        background: isOpen ? '#4B9FFF' : 'transparent',
                        color: isOpen ? '#fff' : 'rgba(29,29,31,0.35)',
                      }}
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path
                          d="M4 0.5v7M0.5 4h7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          style={{
                            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                            transformOrigin: '4px 4px',
                            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                          }}
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    style={{
                      overflow: 'hidden',
                      maxHeight: isOpen ? '400px' : '0px',
                      transition: 'max-height 0.38s ease-in-out',
                    }}
                  >
                    <p className="pb-7 pl-12 pr-8 text-sm text-[#4A4A4F] leading-relaxed">
                      {q.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
