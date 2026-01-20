import { Zap, Map, Users, Shield } from 'lucide-react';
import { ExternalLink } from 'lucide-react';

const focusPoints = [
  {
    icon: Zap,
    title: 'Technologietransfer',
    description: 'Wij vertalen technologieën zoals LLM, RAG en Agentic AI naar bruikbare tools voor elke fase van uw ontwikkelingsproces.'
  },
  {
    icon: Map,
    title: 'Procesmapping',
    description: 'We scheppen orde in de chaos van AI-tools door ze te mappen op het NPD-proces. Zo ziet u direct welke tool waar inzetbaar is.'
  },
  {
    icon: Users,
    title: 'Mens–AI Samenwerking',
    description: 'Net als bij "cobots" in de productie, onderzoeken we hoe ontwerpers en AI-agents optimaal kunnen samenwerken in co-creatieve workflows.'
  },
  {
    icon: Shield,
    title: 'Veilige Integratie',
    description: 'We testen hoe AI-inzichten veilig en traceerbaar gekoppeld kunnen worden aan uw bestaande Document Management Systemen (DMS) en PLM-omgevingen.'
  }
];

export function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Over het project</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wij gaan verder dan de hype en bieden gestructureerde inzichten en praktische implementaties voor de ontwerppraktijk.
          </p>
        </div>
        
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Onze focuspunten</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {focusPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{point.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* TETRA info box */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Wat is een TETRA-project?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              TETRA-projecten worden door VLAIO ondersteund om de kenniskloof tussen onderzoek en bedrijfspraktijk te dichten. Ze vertalen nieuwe technologische inzichten naar concrete tools en methodes die direct toepasbaar zijn in bedrijven.
            </p>
            <a 
              href="https://www.vlaio.be/nl/vlaio-netwerk/tetra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Meer info over TETRA bij VLAIO
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}