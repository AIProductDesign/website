const companies = [
  'Bedrijf A', 'Bedrijf B', 'Bedrijf C', 'Bedrijf D', 'Bedrijf E',
  'Bedrijf F', 'Bedrijf G', 'Bedrijf H', 'Bedrijf I', 'Bedrijf J',
  'Bedrijf K', 'Bedrijf L', 'Bedrijf M', 'Bedrijf N', 'Bedrijf O',
];

export function PartnerCarousel() {
  const doubled = [...companies, ...companies];

  return (
    <section className="bg-white border-y border-black/6 py-10 overflow-hidden">
      <p className="text-center text-xs font-mono text-[#1D1D1F]/40 tracking-widest mb-8">
        vertrouwd door
      </p>
      <div className="relative flex">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {doubled.map((name, i) => (
            <span
              key={i}
              className="text-sm font-semibold text-[#1D1D1F]/70 hover:text-[#1D1D1F]/70 transition-colors cursor-default tracking-wide flex-shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
