import { Mail, Building } from 'lucide-react';
import uantwerpenLogo from 'figma:asset/1cb2ac71f09b11e719653dac260438a910c5bd79.png';
import ugentLogo from 'figma:asset/9aa6fb2f4bf6ab524760a6d761529bd91983a137.png';
import imecLogo from 'figma:asset/ccb6f66f4bcef309f545c7e1cd0253900f6ea7f4.png';

const partners = [];

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Contact & Partners</h2>
          <p className="text-xl text-blue-100">
            Dit project is een samenwerking tussen toonaangevende onderzoekspartners
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Partners */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Building className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-semibold">Partners</h3>
            </div>

            {/* Partner logos */}
            <div className="mb-6 flex flex-col gap-4">
              <div className="p-4 bg-white rounded-lg">
                <img
                  src={uantwerpenLogo}
                  alt="Universiteit Antwerpen"
                  className="h-12 object-contain mx-auto"
                />
                <p className="text-sm text-gray-700 text-center mt-2">Productontwikkeling</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <img
                  src={ugentLogo}
                  alt="Universiteit Gent"
                  className="h-12 object-contain mx-auto"
                />
                <p className="text-sm text-gray-700 text-center mt-2">Industrieel Ontwerpen</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <img
                  src={imecLogo}
                  alt="Imec"
                  className="h-12 object-contain mx-auto"
                />
              </div>
            </div>

            {partners.length > 0 && (
              <ul className="space-y-4">
                {partners.map((partner, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-lg">{partner}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-semibold">Vragen?</h3>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <p className="text-lg mb-4">
                Neem contact op met <span className="font-semibold">Jelle Saldien</span> via:
              </p>
              <a
                href="mailto:jelle.saldien@uantwerpen.be"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors font-medium"
              >
                <Mail className="w-5 h-5" />
                jelle.saldien@uantwerpen.be
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/20 text-center">
          <p className="text-blue-200">
            © 2026 AI Powered Product Design TETRA Project. Momenteel in voorbereiding voor VLAIO.
          </p>
        </div>
      </div>
    </section>
  );
}
