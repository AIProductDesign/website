import { useState, useEffect, useRef } from 'react';
// useRef blijft nodig voor triggerRefs
import { Lightbulb, Layers, TrendingUp, Cog, TestTube, Rocket, RefreshCw, ExternalLink } from 'lucide-react';

const phases = [
  {
    icon: Lightbulb,
    num: '01',
    phase: 'Ideation',
    label: 'Fuzzy front end',
    role: 'Exploreren van opportuniteiten en genereren van ideeën op basis van data.',
    applications: ['Trendanalyse van sociale media, reviews en forums', 'Detectie van klantproblemen en unmet needs', 'Generatie van nieuwe concepten'],
    tools: ['ChatGPT', 'Claude', 'BERTopic', 'Hugging Face', 'Google NLP'],
    pitfalls: ['Bias uit bestaande data', 'Veel ideeën, beperkte originaliteit', 'Moeilijke vertaling naar business waarde'],
  },
  {
    icon: Layers,
    num: '02',
    phase: 'Conceptontwikkeling',
    label: 'Validatie & varianten',
    role: 'Ondersteunen van conceptkeuzes en vroege validatie.',
    applications: ['Analyse van klantfeedback (surveys, interviews)', 'Voorspellen van klantacceptatie', 'Genereren en vergelijken van conceptvarianten'],
    tools: ['NLP feedbackanalyse', 'scikit-learn', 'XGBoost', 'Generative design tools'],
    pitfalls: ['Beperkte data voor nieuwe concepten', 'Oververtrouwen in voorspellingen', 'Anchoring op AI-output'],
  },
  {
    icon: TrendingUp,
    num: '03',
    phase: 'Business case',
    label: 'Besluitvorming & forecasting',
    role: 'Ondersteunen van investeringsbeslissingen via voorspellingen en simulaties.',
    applications: ['Marktanalyse en trendvoorspelling', 'Demand forecasting', 'Scenario-analyse (prijs, kosten, volumes)'],
    tools: ['Prophet', 'Azure ML', 'Power BI', 'Tableau AI', 'Random Forest'],
    pitfalls: ['Onbetrouwbare of incomplete data', 'Black-box modellen', 'Moeilijke adoptie in management'],
  },
  {
    icon: Cog,
    num: '04',
    phase: 'Design & Engineering',
    label: 'Optimalisatie & simulatie',
    role: 'Optimaliseren en versnellen van productontwerp.',
    applications: ['Genereren van designalternatieven', 'Optimalisatie van gewicht, kost en prestaties', 'Simulaties en iteraties'],
    tools: ['Fusion 360 AI', 'nTopology', 'ANSYS', 'Siemens NX'],
    pitfalls: ['Moeilijke interpretatie van gegenereerde designs', 'Integratieproblemen met bestaande workflows', 'Afhankelijkheid van modelassumpties'],
  },
  {
    icon: TestTube,
    num: '05',
    phase: 'Testing & Validatie',
    label: 'Foutdetectie & analyse',
    role: 'Detecteren van fouten en analyseren van testresultaten.',
    applications: ['Kwaliteitscontrole in productie', 'Anomaly detection in testdata', 'Analyse van gebruikersfeedback'],
    tools: ['Computer Vision (YOLO)', 'Isolation Forest', 'Digital Twins', 'Siemens / GE'],
    pitfalls: ['False positives/negatives', 'Slechte datakwaliteit', 'Moeilijke interpretatie van afwijkingen'],
  },
  {
    icon: Rocket,
    num: '06',
    phase: 'Launch & Commercialisatie',
    label: 'Marktintroductie & groei',
    role: 'Optimaliseren van marktintroductie en klantinteractie.',
    applications: ['Klantsegmentatie en personalisatie', 'Aanbevelingssystemen', 'Marketingoptimalisatie'],
    tools: ['Amazon Personalize', 'HubSpot AI', 'Salesforce Einstein', 'k-means clustering'],
    pitfalls: ['Privacy en dataproblemen', 'Over-personalisatie', 'Afhankelijkheid van historische data'],
  },
  {
    icon: RefreshCw,
    num: '07',
    phase: 'Product Lifecycle',
    label: 'Continue verbetering',
    role: 'Continu verbeteren van het product na lancering.',
    applications: ['Sentimentanalyse van gebruikersfeedback', 'Predictive maintenance', 'Churn-analyse'],
    tools: ['NLP / text mining', 'Predictive analytics', 'IoT + AI platforms', 'Python / R'],
    pitfalls: ['Fragmentatie van data', 'Moeilijke koppeling inzichten naar acties', 'Organisatorische weerstand'],
  },
];

export function Mapping() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dotsVisible, setDotsVisible] = useState(false);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDotsVisible(true);
          sectionObs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) sectionObs.observe(sectionRef.current);
    return () => sectionObs.disconnect();
  }, []);

  useEffect(() => {
    const observers = phases.map((_, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIdx(i);
        },
        { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
      );
      const el = triggerRefs.current[i];
      if (el) obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="mapping" className="bg-white pt-4 pb-32" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
        <p className="section-label text-xs font-mono text-[#4B9FFF] tracking-widest mb-6">03 / NPD-PROCES</p>
        <div className="h-px bg-black/8 mb-14" />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20">
          <div className="">
            <h2 className="text-5xl sm:text-6xl font-black text-[#1D1D1F] tracking-tight">
              AI per ontwerpfase.
            </h2>
          </div>
          <a
            href="https://www.aippd.be"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link inline-flex items-center gap-2 px-5 py-2.5 border border-black/12 text-[#1D1D1F]/70 hover:text-[#1D1D1F] rounded-full text-sm font-medium transition-colors whitespace-nowrap"
          >
            AIPPD Toolkit
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* ─── Desktop: sticky left indicator + scrollable right details ─── */}
        <div className="hidden lg:grid lg:grid-cols-[300px_1fr] lg:gap-32">

          {/* Left: sticky progress indicator */}
          <div className="sticky top-24 self-start">

            {/* Horizontal progress line with dots — staggered entry */}
            <div className="flex flex-row items-center mb-10">
              {phases.flatMap((p, i) => {
                // each dot = slot i, each line = slot i + 0.5
                const dotDelay = i * 0.07;
                const lineDelay = i * 0.07 + 0.04;
                const dotAnim = dotsVisible
                  ? { opacity: 1, transform: i === activeIdx ? 'translateX(0) scale(2)' : 'translateX(0) scale(1)' }
                  : { opacity: 0, transform: 'translateX(-8px) scale(1)' };
                const items = [
                  <button
                    key={`dot-${p.num}`}
                    onClick={() => triggerRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                    aria-label={p.phase}
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: i <= activeIdx ? '#4B9FFF' : 'rgba(0,0,0,0.12)',
                      boxShadow: i === activeIdx ? '0 0 0 3px rgba(75,159,255,0.15)' : 'none',
                      ...dotAnim,
                      transition: dotsVisible
                        ? `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${dotDelay}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${dotDelay}s, background 0.5s, box-shadow 0.5s`
                        : 'none',
                    }}
                  />,
                ];
                if (i < phases.length - 1) {
                  items.push(
                    <div
                      key={`line-${p.num}`}
                      className="flex-1 mx-1 rounded-full overflow-hidden"
                      style={{
                        height: '1px',
                        background: 'rgba(0,0,0,0.08)',
                        opacity: dotsVisible ? 1 : 0,
                        transition: `opacity 0.35s ease ${lineDelay}s`,
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          background: '#4B9FFF',
                          transform: `scaleX(${i < activeIdx ? 1 : 0})`,
                          transformOrigin: 'left center',
                          transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                        }}
                      />
                    </div>
                  );
                }
                return items;
              })}
            </div>

            {/* Large ghost number — slides directionally */}
            <div style={{ position: 'relative', height: '5rem', overflow: 'visible', marginBottom: '-0.5rem' }}>
              {phases.map((p, i) => {
                const dir = i < activeIdx ? -1 : 1;
                return (
                  <div
                    key={p.num}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      opacity: i === activeIdx ? 1 : 0,
                      transform: i === activeIdx ? 'translateY(0)' : `translateY(${dir * 40}px)`,
                      transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    <span
                      className="font-black tracking-tighter select-none leading-none"
                      style={{ fontSize: '5rem', color: 'rgba(0,0,0,0.04)' }}
                    >
                      {p.num}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Phase name + icon — slides directionally */}
            <div style={{ position: 'relative', height: '7rem', overflow: 'visible' }}>
              {phases.map((p, i) => {
                const Icon = p.icon;
                const dir = i < activeIdx ? -1 : 1;
                return (
                  <div
                    key={p.num}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      opacity: i === activeIdx ? 1 : 0,
                      transform: i === activeIdx ? 'translateY(0)' : `translateY(${dir * 20}px)`,
                      transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                      pointerEvents: i === activeIdx ? 'auto' : 'none',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="w-4 h-4 text-[#4B9FFF]" />
                      <span className="font-mono text-xs text-[#4B9FFF] tracking-widest">
                        {p.num} / 07 · {p.label}
                      </span>
                    </div>
                    <h3 className="text-4xl font-black text-[#1D1D1F] tracking-tight leading-tight">
                      {p.phase}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: scroll triggers with full phase details */}
          <div>
            {phases.map((p, i) => {
              const isActive = i === activeIdx;
              return (
                <div
                  key={p.num}
                  ref={(el) => { triggerRefs.current[i] = el; }}
                  className="min-h-[65vh] flex items-center py-16"
                >
                  <div className="w-full" style={{
                    opacity: isActive ? 1 : 0.28,
                    transition: 'opacity 0.55s cubic-bezier(0.16,1,0.3,1)',
                  }}>
                    {/* Role */}
                    <p
                      className="text-lg text-[#1D1D1F] leading-relaxed mb-8 max-w-lg font-medium"
                      style={{
                        transform: isActive ? 'translateX(0)' : 'translateX(-10px)',
                        transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1)',
                      }}
                    >
                      {p.role}
                    </p>

                    {/* Applications */}
                    <div className="mb-8">
                      <p
                        className="text-xs font-mono text-[#4B9FFF] tracking-widest mb-3"
                        style={{
                          transform: isActive ? 'translateX(0)' : 'translateX(-10px)',
                          transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1) 0.05s',
                        }}
                      >
                        TOEPASSINGEN
                      </p>
                      <ul className="space-y-2.5">
                        {p.applications.map((a, ai) => (
                          <li
                            key={a}
                            className="flex items-start gap-3"
                            style={{
                              opacity: isActive ? 1 : 0,
                              transform: isActive ? 'translateX(0)' : 'translateX(-14px)',
                              transition: `opacity 0.45s ease ${isActive ? 0.08 + ai * 0.1 : 0}s, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${isActive ? 0.08 + ai * 0.1 : 0}s`,
                            }}
                          >
                            <span className="text-[#4B9FFF] flex-shrink-0 mt-0.5 text-xs font-bold leading-5">→</span>
                            <span className="text-sm text-[#1D1D1F]/85 leading-relaxed">{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tools */}
                    <div
                      className="mb-8"
                      style={{
                        transform: isActive ? 'translateX(0)' : 'translateX(-10px)',
                        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.18s',
                      }}
                    >
                      <p className="text-xs font-mono text-[#1D1D1F]/75 tracking-widest mb-3">TOOLS</p>
                      <div className="flex flex-wrap gap-2">
                        {p.tools.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1.5 bg-[#F5F5F7] border border-black/6 text-[#1D1D1F]/70 rounded-full text-xs font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pitfalls */}
                    <div
                      style={{
                        transform: isActive ? 'translateX(0)' : 'translateX(-10px)',
                        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.24s',
                      }}
                    >
                      <p className="text-xs font-mono text-[#1D1D1F]/75 tracking-widest mb-3">VALKUILEN</p>
                      <ul className="space-y-2">
                        {p.pitfalls.map((v, vi) => (
                          <li key={v} className="text-sm text-[#1D1D1F]/75 flex items-start gap-2.5" style={{
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'translateX(0)' : 'translateX(-14px)',
                            transition: `opacity 0.45s ease ${isActive ? 0.2 + vi * 0.1 : 0}s, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${isActive ? 0.2 + vi * 0.1 : 0}s`,
                          }}>
                            <span className="text-amber-400/70 flex-shrink-0 mt-0.5 text-xs font-bold leading-5">!</span>
                            {v}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Mobile: stacked cards ─── */}
        <div className="lg:hidden grid gap-3">
          {phases.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="card-hover bg-[#F5F5F7] border border-black/6 rounded-2xl p-6 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="font-mono text-xs text-[#1D1D1F]/75 tracking-widest">{p.num}</span>
                  <Icon className="w-4 h-4 text-[#1D1D1F]/75 group-hover:text-[#4B9FFF] transition-colors duration-300" />
                </div>
                <h3 className="text-base font-bold text-[#1D1D1F] mb-0.5 tracking-tight">{p.phase}</h3>
                <p className="text-xs text-[#4B9FFF] font-mono mb-3">{p.label}</p>
                <p className="text-sm text-[#4A4A4F] leading-relaxed mb-4">{p.role}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-white border border-black/8 text-[#1D1D1F]/75 rounded-full text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
