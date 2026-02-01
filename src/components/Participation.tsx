import { CheckCircle, Building2 } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const benefits = [
  {
    title: '6 Thematische contactmomenten',
    description: 'Met strategische kennistransfer en updates van use-cases.'
  },
  {
    title: '8 Verdiepende workshops',
    description: '(4/jaar) focus op hands-on AI-tools gericht naar de ontwerpers.'
  },
  {
    title: 'Begeleiding bij use-cases',
    description: 'Directe ondersteuning bij een bedrijfsspecifieke case, uitgevoerd door onderzoekers en studenten.'
  },
  {
    title: 'Praktisch stappenplan',
    description: 'Een gids voor veilige en effectieve AI-integratie in uw bedrijf.'
  },
  {
    title: 'Lerend netwerk',
    description: 'Wissel ervaringen uit met een selecte groep van sectorgenoten.'
  }
];

const pricing = [
  {
    type: 'GO (Grote Onderneming)',
    condition: '> 250 werknemers',
    price: '€ 5.000'
  },
  {
    type: 'MO (Middelgrote Onderneming)',
    condition: '50 - 250 werknemers',
    price: '€ 3.000'
  },
  {
    type: 'KO (Kleine Onderneming)',
    condition: '< 50 werknemers',
    price: '€ 1.500'
  },
  {
    type: 'Starter',
    condition: '< 5 jaar opgericht',
    price: '€ 500'
  },
  {
    type: 'VZW',
    condition: '-',
    price: '€ 1.500 (in kind)'
  }
];

export function Participation() {
  return (
    <section id="participate" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Deelnemen</h2>
        </div>

        {/* Why participate */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Waarom deelnemen?</h3>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
            De integratie van AI bepaalt in toenemende mate uw competitiviteit en innovatiecapaciteit. Dit project biedt de kans om in een veilige, praktijkgerichte omgeving kennis op te bouwen. Bedrijven die deze technologie vroegtijdig omarmen, zullen de nieuwe standaard in de markt bepalen.
          </p>
        </div>

        {/* For whom */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Voor wie?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              'Ontwerp- en innovatiebureaus.',
              'R&D-afdelingen van maakbedrijven (machines, elektronica, consumentenproducten, etc.).',
              'Technologiebedrijven met AI-oplossingen voor design en engineering.'
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <Building2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What you receive */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Wat u ontvangt</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing table */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Bijdrage (Totaal voor 2 jaar)</h3>
          <p className="text-gray-600 mb-6">
            Onder voorbehoud van goedkeuring. Projectlooptijd: 01/10/2026 t/m 30/09/2028.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Type Bedrijf</th>
                  <th className="px-6 py-4 text-left font-semibold">Voorwaarde</th>
                  <th className="px-6 py-4 text-left font-semibold">Bijdrage voor 2 jaar</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${index === pricing.length - 1 ? 'border-b-0' : ''
                      }`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{row.type}</td>
                    <td className="px-6 py-4 text-gray-700">{row.condition}</td>
                    <td className="px-6 py-4 font-semibold text-blue-600">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Call to action button */}
          <div className="mt-8 text-center">
            <a 
              href="https://forms.office.com/pages/responsepage.aspx?id=-wgueVQtjkqvciAlSBNu9lP3AWYSl-9Dtiyf_E4rwNNUMkNRMTRBU0JJVjNSTUxQRDhTMTRUTVlXUy4u&route=shorturl" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl group"
            >
              <span className="text-lg font-semibold">Meld uw bedrijf aan</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}