import { Lightbulb, Palette, Cog, TestTube, Rocket } from 'lucide-react';

const mappingData = [
  {
    icon: Lightbulb,
    phase: 'Ontdekken & Definiëren',
    applications: 'Trendanalyse, marktonderzoek, clusteren klantinzichten.',
    tools: 'ChatGPT, Perplexity, Dovetail AI',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Palette,
    phase: 'Idee-generatie & Concept',
    applications: 'Snel creëren van conceptschetsen, varianten en user flows.',
    tools: 'Vizcom, Leonardo AI, Miro AI, Uizard',
    color: 'from-pink-500 to-purple-500'
  },
  {
    icon: Cog,
    phase: 'Ontwerp & Prototyping',
    applications: 'Generatief ontwerp, AI-optimalisatie, Model-as-a-Service.',
    tools: 'Rhino/Grasshopper, nTopology, Fusion 360 AI',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: TestTube,
    phase: 'Testen & Valideren',
    applications: 'Analyse van gebruikerstesten, iteratieve verbeterloops.',
    tools: 'Maze AI, Figma AI, SimScale',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Rocket,
    phase: 'Industrialiseren & Launch',
    applications: 'Documentatie, PLM-integratie, Digital Product Passports.',
    tools: 'Copilot, Notion AI, Siemens/3DS integraties',
    color: 'from-indigo-500 to-purple-600'
  }
];

export function Mapping() {
  return (
    <section id="mapping" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mapping van AI-tools in het New Product Design-proces
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Het project biedt een helder kader voor de meerwaarde van AI in elke fase van productontwikkeling.
          </p>
        </div>
        
        <div className="space-y-6">
          {mappingData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="md:flex">
                  {/* Icon and phase */}
                  <div className={`md:w-1/3 p-6 bg-gradient-to-br ${item.color} text-white flex items-center gap-4`}>
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold">{item.phase}</h3>
                  </div>
                  
                  {/* Content */}
                  <div className="md:w-2/3 p-6 space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Voorbeelden van AI-toepassingen
                      </h4>
                      <p className="text-gray-800">{item.applications}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Typische tools / technologieën
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.tools.split(', ').map((tool, toolIndex) => (
                          <span 
                            key={toolIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}