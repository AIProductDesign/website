import { useState } from 'react';
import img0 from '@/assets/0e898025dbbc194ef5efbfbd10b577355e4d6195.png';
import img1 from '@/assets/1d9145f42e5cfc266e49a88615bff6b306221383.png';

// Array order determines display order. Niko and Novy are placed last intentionally.
const caseStudies = [
  {
    title: '2D naar 3D Block-out',
    subtitle: 'Volumetrische studie',
    owner: 'Televic',
    domain: 'Consumer Electronics',
    tools: ['Tripo AI', 'Spline AI', 'Claude 3.5'],
    kpis: ['Tijd −30%', 'Constraint dekking ≥90%'],
    img: 'https://images.unsplash.com/photo-1620245446020-879dc5cf2414?w=800&q=80',
    imgAlt: 'Televic 3D sprint',
  },
  {
    title: 'Medtech Design Controls',
    subtitle: 'Requirements naar Hazard naar Test matrix',
    owner: 'Eqwal Ability',
    domain: 'Medische hulpmiddelen',
    tools: ['Claude 3.5', 'GPT-4', 'Custom RAG'],
    kpis: ['Traceability ≥95%', 'Ontbrekende hazards ≤1'],
    img: 'https://images.unsplash.com/photo-1651326659270-59bbb788199a?w=800&q=80',
    imgAlt: 'Eqwal Ability medtech',
  },
  {
    title: 'Circular Redesign + DPP',
    subtitle: 'Modulair concept & dataschema',
    owner: 'Signify',
    domain: 'Circulaire oplossingen',
    tools: ['Claude 3.5', 'Perplexity', 'GPT-4'],
    kpis: ['Tijd −30%', 'DPP volledigheid ≥85%'],
    img: 'https://images.unsplash.com/photo-1769433874744-494f351342ed?w=800&q=80',
    imgAlt: 'Signify circulair',
  },
  {
    title: 'Generatief Herontwerp',
    subtitle: 'Maakbaarheidsgate industrieel',
    owner: 'Unilin',
    domain: 'Industriële machines',
    tools: ['Fusion 360 AI', 'nTopology', 'Claude 3.5'],
    kpis: ['Tijd −30%', 'Maakbaarheidsproblemen pre-CAD ≥80%'],
    img: 'https://images.unsplash.com/photo-1688274165311-15de2165d686?w=800&q=80',
    imgAlt: 'Unilin generatief ontwerp',
  },
  {
    title: 'Synthetische Gebruikersvalidatie',
    subtitle: 'Conceptevaluatie meubels',
    owner: 'Robberechts',
    domain: 'Meubels & Kantoor',
    tools: ['Claude 3.5', 'GPT-4', 'Synthetic Users'],
    kpis: ['Tijd −30%', 'Inter-rater agreement ≥0.7'],
    img: 'https://images.unsplash.com/photo-1666005368598-2164c0e486c8?w=800&q=80',
    imgAlt: 'Robberechts gebruikerstest',
  },
  {
    title: 'FMCG Verpakkingsconcept',
    subtitle: 'Claims & checklist naar mockup',
    owner: 'Artori',
    domain: 'Verpakking & FMCG',
    tools: ['Claude 3.5', 'Midjourney', 'GPT-4'],
    kpis: ['Tijd −30%', 'Late compliance issues −30%'],
    img: 'https://images.unsplash.com/photo-1705592579405-0d59931c8e00?w=800&q=80',
    imgAlt: 'Artori verpakking',
  },
  {
    title: 'Brand-RAG Assistent',
    subtitle: 'Consistente productcopy',
    owner: 'KAN Design',
    domain: 'Branding',
    tools: ['Claude 3.5', 'Custom RAG', 'GPT-4'],
    kpis: ['Tijd −30%', 'Stijl compliance ≥90%'],
    img: 'https://images.unsplash.com/photo-1683818051102-dd1199d163b9?w=800&q=80',
    imgAlt: 'KAN Design brand RAG',
  },
  {
    title: 'Refurbish Triage Workflow',
    subtitle: 'Reparatieservice & evidence pack',
    owner: 'The Argonauts',
    domain: 'Circulaire oplossingen',
    tools: ['GPT-4 Vision', 'Claude 3.5', 'Custom RAG'],
    kpis: ['Tijd −30%', 'Triagnauwkeurigheid ≥90%'],
    img: 'https://images.unsplash.com/photo-1661338148421-b18059ee420a?w=800&q=80',
    imgAlt: 'The Argonauts refurbish',
  },
  // Niko and Novy intentionally placed last
  {
    title: 'IoT Concept naar PRD',
    subtitle: 'Requirements Sprint',
    owner: 'Niko',
    domain: 'Consumer Electronics',
    tools: ['Claude 3.5', 'GPT-4', 'Perplexity'],
    kpis: ['Tijd −30%', 'Kwaliteit +1.5/5', 'Traceability ≥90%'],
    img: img0,
    imgAlt: 'Niko IoT sprint',
  },
  {
    title: 'CMF & Rendering Sprint',
    subtitle: 'Premium Witgoed',
    owner: 'Novy',
    domain: 'Witgoed',
    tools: ['Midjourney', 'DALL-E 3', 'Claude 3.5'],
    kpis: ['Tijd −30%', 'Brand compliance ≥90%', '−2 iteraties vs baseline'],
    img: img1,
    imgAlt: 'Novy CMF sprint',
  },
];

const INITIAL_COUNT = 6;

type CaseEntry = typeof caseStudies[0];

function CaseCard({ cs, num }: { cs: CaseEntry; num: number }) {
  return (
    <div className="card-hover group bg-[#F5F5F7] rounded-3xl overflow-hidden border border-black/4 flex flex-col h-full">
      <div className="relative h-44 overflow-hidden bg-[#E8E8ED] flex-shrink-0">
        <img
          src={cs.img as string}
          alt={cs.imgAlt}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#1D1D1F] rounded-full text-xs font-semibold">
          {cs.domain}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-xs font-mono text-[#1D1D1F]/70 tracking-widest mb-1">
          {String(num).padStart(2, '0')} · {cs.owner}
        </p>
        <h3 className="font-bold text-[#1D1D1F] tracking-tight leading-snug mb-0.5" style={{ fontSize: '1rem' }}>
          {cs.title}
        </h3>
        <p className="text-xs text-[#4A4A4F] mb-3">{cs.subtitle}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 mb-3">
          {cs.kpis.map((kpi) => (
            <span key={kpi} className="text-xs font-mono font-bold text-[#4B9FFF]">{kpi}</span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {cs.tools.map((t) => (
            <span key={t} className="px-2 py-0.5 bg-white border border-black/6 text-[#1D1D1F]/70 rounded-full text-xs font-mono">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CaseStudies() {
  const [showAll, setShowAll] = useState(false);
  const count = showAll ? caseStudies.length : INITIAL_COUNT;

  return (
    <section id="case-studies" className="bg-white pt-4 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="section-label text-xs font-mono text-[#4B9FFF] tracking-widest mb-6">04 / CASE STUDIES</p>
        <div className="reveal-line h-px bg-black/8 mb-16" />

        <h2 className="reveal-heading mb-6">
          <span className="text-5xl sm:text-6xl font-black text-[#1D1D1F] tracking-tight">Bewezen in de praktijk. </span>
          <span className="text-5xl sm:text-6xl font-black text-[#1D1D1F]/60 tracking-tight">Tien real-world sprints.</span>
        </h2>

        <p className="reveal text-lg text-[#4A4A4F] leading-relaxed max-w-2xl mb-16">
          Studenten van UAntwerpen en UGent valideerden AI-gedreven ontwerpworkflows in samenwerking met toonaangevende bedrijven.
        </p>

        <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {caseStudies.slice(0, count).map((cs, index) => (
            <CaseCard key={cs.owner + cs.title} cs={cs} num={index + 1} />
          ))}
        </div>

        {!showAll && caseStudies.length > INITIAL_COUNT && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-7 py-3 border border-black/12 text-[#1D1D1F]/70 hover:text-[#1D1D1F] hover:border-black/25 rounded-full text-sm font-medium transition-colors"
            >
              Laad meer ({caseStudies.length - INITIAL_COUNT} cases)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
