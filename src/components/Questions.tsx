import { HelpCircle } from 'lucide-react';

const questions = [
  'Wat is het verschil tussen ML, Deep Learning, NLP en Agentic AI?',
  'Waar levert AI vandaag een werkelijke Return on Investment (ROI) op?',
  'Hoe gaan we veilig om met bedrijfsdata, privacy en intellectueel eigendom?',
  'Welke taken laten we bij de ontwerper en welke delegeren we aan de AI?'
];

export function Questions() {
  return (
    <section id="questions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Antwoorden op uw kernvragen</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {questions.map((question, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg text-gray-800 pt-1">{question}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}