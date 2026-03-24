import { ArrowRight } from 'lucide-react';

const benefits = [
  { title: '6 Thematische contactmomenten', description: 'Met strategische kennistransfer en updates van use-cases.' },
  { title: '8 Verdiepende workshops', description: '(4/jaar) focus op hands-on AI-tools gericht naar de ontwerpers.' },
  { title: 'Lerend netwerk', description: 'Word deel van een netwerk van bedrijven en experten die actief experimenteren met AI in productontwikkeling en deel ervaringen, use-cases en best practices.' },
  { title: 'Exclusieve inzichten', description: 'Krijg exclusieve inzichten in de nieuwste AI-ontwikkelingen en onderzoek binnen UA, vertaald naar concrete toepassingen voor productontwikkeling.' },
  { title: 'Studentencase', description: 'Optie om een bedrijfsspecifieke vraag in te dienen die door studenten van UAntwerpen of UGent wordt uitgewerkt tot een concrete oplossing.' },
];

const pricing = [
  { type: 'Grote Onderneming', condition: '> 250 werknemers', price: '€ 5.000' },
  { type: 'Middelgrote Onderneming', condition: '50 – 250 werknemers', price: '€ 3.000' },
  { type: 'Kleine Onderneming', condition: '< 50 werknemers', price: '€ 1.500' },
  { type: 'Starter', condition: '< 5 jaar opgericht', price: '€ 500' },
  { type: 'VZW', condition: '–', price: '€ 1.500' },
];

const targets = [
  'Ontwerp- en innovatiebureaus',
  'R&D-afdelingen van maakbedrijven',
  'Technologiebedrijven met AI-oplossingen voor design en engineering',
];

export function Participation() {
  return (
    <section id="participate" className="bg-white pt-4 pb-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
        <p className="section-label text-xs font-mono text-[#4B9FFF] tracking-widest mb-6">05 / DEELNEMEN</p>
        <div className="reveal-line h-px bg-black/8 mb-16" />

        {/* Hero heading + intro */}
        <div className="max-w-3xl mb-16">
          <div className="reveal-heading mb-6">
            <span className="text-5xl sm:text-6xl font-black text-[#1D1D1F] tracking-tight">Word projectpartner.</span>
          </div>
          <p className="reveal text-lg text-[#4A4A4F] leading-relaxed" style={{ transitionDelay: '80ms' }}>
            De integratie van AI bepaalt in toenemende mate uw competitiviteit en innovatiecapaciteit.
            Bedrijven die deze technologie vroegtijdig omarmen, bepalen de nieuwe standaard.
          </p>
        </div>


        {/* Two-column: voor wie + wat u ontvangt */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">

          {/* Voor wie */}
          <div className="reveal">
            <p className="text-xs font-mono text-[#1D1D1F]/70 tracking-widest mb-5">VOOR WIE</p>
            <div className="space-y-2">
              {targets.map((text, i) => (
                <div key={i} className="flex items-start gap-3 py-4 border-b border-black/5 last:border-0">
                  <span className="text-[#4B9FFF] font-bold text-xs mt-0.5 flex-shrink-0">→</span>
                  <p className="text-sm text-[#1D1D1F]/70 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Wat u ontvangt */}
          <div className="reveal" style={{ transitionDelay: '60ms' }}>
            <p className="text-xs font-mono text-[#1D1D1F]/70 tracking-widest mb-5">WAT U ONTVANGT</p>
            <div className="space-y-2">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 py-3.5 border-b border-black/5 last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4B9FFF] flex-shrink-0 mt-1.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#1D1D1F] leading-snug">{b.title}</p>
                    <p className="text-xs text-[#4A4A4F] mt-0.5">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="reveal mb-14" style={{ transitionDelay: '60ms' }}>
          <p className="text-xs font-mono text-[#1D1D1F]/70 tracking-widest mb-1">BIJDRAGE (TOTAAL VOOR 2 JAAR)</p>
          <p className="text-xs text-[#1D1D1F]/50 mb-8 font-mono">Onder voorbehoud van goedkeuring · 01/10/2026 t/m 30/09/2028</p>

          <div className="overflow-x-auto rounded-2xl border border-black/6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/6 bg-[#F5F5F7]">
                  <th className="px-6 py-4 text-left text-xs font-mono text-[#1D1D1F]/70 tracking-widest">TYPE</th>
                  <th className="px-6 py-4 text-left text-xs font-mono text-[#1D1D1F]/70 tracking-widest">VOORWAARDE</th>
                  <th className="px-6 py-4 text-left text-xs font-mono text-[#1D1D1F]/70 tracking-widest">BIJDRAGE</th>
                </tr>
              </thead>
              <tbody className="bg-[#F5F5F7]">
                {pricing.map((row, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-white/60 transition-colors ${index < pricing.length - 1 ? 'border-b border-black/4' : ''}`}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-[#1D1D1F]">{row.type}</td>
                    <td className="px-6 py-4 text-sm text-[#4A4A4F]">{row.condition}</td>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-[#4B9FFF]">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="reveal border border-black/8 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6" style={{ transitionDelay: '80ms' }}>
          <div>
            <p className="text-base font-semibold text-[#1D1D1F] mb-1">Interesse om deel te nemen?</p>
            <p className="text-sm text-[#4A4A4F] max-w-md">Vul het formulier in en we nemen contact op om te kijken of het project past bij uw bedrijf.</p>
          </div>
          <a
            href="https://forms.office.com/pages/responsepage.aspx?id=-wgueVQtjkqvciAlSBNu9lP3AWYSl-9Dtiyf_E4rwNNUMkNRMTRBU0JJVjNSTUxQRDhTMTRUTVlXUy4u&route=shorturl"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2.5 px-6 py-3 bg-[#1D1D1F] text-white rounded-full font-semibold hover:bg-[#1D1D1F]/80 transition-colors group text-sm"
          >
            Neem deel
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
