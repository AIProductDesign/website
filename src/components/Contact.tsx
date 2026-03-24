import { Mail } from 'lucide-react';
import uantwerpenLogo from '@/assets/uantwerpen-logo-new.png';
import ugentLogo from '@/assets/ugent-logo-new.png';
import imecLogo from '@/assets/ccb6f66f4bcef309f545c7e1cd0253900f6ea7f4.png';

const people = [
  {
    role: 'Projectleider',
    name: 'Jelle Saldien',
    email: 'jelle.saldien@uantwerpen.be',
    affiliation: 'Universiteit Antwerpen',
  },
  {
    role: 'Onderzoeker',
    name: 'Anton Vervoort, PhD',
    email: 'anton.vervoort@uantwerpen.be',
    affiliation: 'Universiteit Antwerpen',
  },
];

const partners = [
  { logo: uantwerpenLogo, name: 'Universiteit Antwerpen', dept: 'Productontwikkeling', white: true },
  { logo: ugentLogo,      name: 'Universiteit Gent',      dept: 'Industrieel Ontwerpen', white: true },
  { logo: imecLogo,       name: 'Imec',                   dept: 'Technologie & AI', white: false },
];

export function Contact() {
  return (
    <section id="contact" className="bg-white pt-4 pb-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
        <p className="section-label text-xs font-mono text-[#4B9FFF] tracking-widest mb-6">06 / CONTACT</p>
        <div className="reveal-line h-px bg-black/8 mb-16" />

        <div className="reveal-heading mb-20">
          <span className="text-5xl sm:text-6xl font-black text-[#1D1D1F] tracking-tight">Nog een vraag?</span>
        </div>

        {/* Contact cards */}
        <div className="reveal-stagger grid sm:grid-cols-2 gap-4 max-w-2xl mb-20">
          {people.map((p) => (
            <div key={p.email} className="card-hover p-7 bg-[#F5F5F7] border border-black/6 rounded-2xl flex flex-col gap-4">
              <div>
                <p className="text-xs font-mono text-[#1D1D1F]/70 tracking-widest mb-1">{p.role}</p>
                <p className="text-xl font-bold text-[#1D1D1F] tracking-tight">{p.name}</p>
                <p className="text-xs text-[#4A4A4F] mt-0.5">{p.affiliation}</p>
              </div>
              <a
                href={`mailto:${p.email}`}
                className="inline-flex items-center gap-2 text-sm text-[#4B9FFF] font-medium hover:text-[#2280E8] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                {p.email}
              </a>
            </div>
          ))}
        </div>

        {/* Partner logos */}
        <div className="reveal" style={{ transitionDelay: '80ms' }}>
          <p className="text-xs font-mono text-[#1D1D1F]/70 tracking-widest mb-8">ONDERZOEKSPARTNERS</p>
          <div className="flex flex-wrap items-center gap-10">
            {partners.map((p) => (
              <div key={p.name} className="flex items-center gap-3">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="h-8 object-contain"
                  style={p.white ? { filter: 'brightness(0)', opacity: 0.65 } : { mixBlendMode: 'multiply', opacity: 0.8 }}
                />
                <div>
                  <p className="text-sm font-semibold text-[#1D1D1F]">{p.name}</p>
                  <p className="text-xs text-[#1D1D1F]/75 font-mono">{p.dept}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal mt-24 pt-8 border-t border-black/6" style={{ transitionDelay: '100ms' }}>
          <p className="font-mono text-xs text-[#1D1D1F]/75 tracking-wide">
            © 2026 <span style={{ fontFamily: "'Dyson Sans Modern', sans-serif" }}>aipec</span> · AI-driven Design Engineering Center · TETRA project in voorbereiding voor VLAIO.
          </p>
        </div>
      </div>
    </section>
  );
}
