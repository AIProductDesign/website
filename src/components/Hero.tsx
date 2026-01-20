import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';
import heroImage from 'figma:asset/1d9145f42e5cfc266e49a88615bff6b306221383.png';
import sketchingImage from 'figma:asset/0e898025dbbc194ef5efbfbd10b577355e4d6195.png';
import cadModelingImage from 'figma:asset/478eefbb756d23640c39e21a9a509152bc3eb816.png';
import brainstormingImage from 'figma:asset/d88ed88c755f5b39737cbb8bc61160ef035556bd.png';
import ugentLogo from '@/assets/logo_UGent_NL_RGB_2400_kleur_witbg.png';
import uantwerpenLogo from 'figma:asset/1cb2ac71f09b11e719653dac260438a910c5bd79.png';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-white space-y-6">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
              TETRA project
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              AI Powered Product Design
            </h1>
            
            <p className="text-lg text-blue-50 leading-relaxed">
              De snelle opkomst van generatieve en agentic AI verandert fundamenteel hoe producten en diensten worden bedacht, ontworpen en verbeterd. Dit TETRA-project (momenteel in aanvraag bij VLAIO) vertaalt complexe technologieën naar concrete toepassingen voor het New Product Development (NPD) proces.
            </p>
            
            <p className="text-lg text-blue-100 leading-relaxed">
              Neem deel als bedrijf en ontdek de toekomst van product design
            </p>
            
            <div className="pt-4">
              <a 
                href="https://forms.office.com/pages/responsepage.aspx?id=-wgueVQtjkqvciAlSBNu9lP3AWYSl-9Dtiyf_E4rwNNUMkNRMTRBU0JJVjNSTUxQRDhTMTRUTVlXUy4u&route=shorturl" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl group"
              >
                <span className="text-lg font-semibold">Neem deel aan het project</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            {/* Partner logos */}
            <div className="pt-6">
              <p className="text-sm text-blue-100 mb-3">Een samenwerking tussen:</p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg">
                  <img 
                    src={uantwerpenLogo} 
                    alt="Universiteit Antwerpen" 
                    className="h-10 object-contain"
                  />
                </div>
                <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg">
                  <img 
                    src={ugentLogo} 
                    alt="Universiteit Gent" 
                    className="h-10 object-contain"
                  />
                </div>
              </div>
              <p className="text-xs text-blue-100/80 mt-3">
                Universiteit Antwerpen – Productontwikkeling & Universiteit Gent – Industrieel Ontwerpen
              </p>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            {/* Main hero image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img 
                src={heroImage}
                alt="AI Powered Product Design - Generative Workflows and Intelligent Modelling"
                className="w-full h-[450px] object-cover"
              />
            </div>
            
            {/* Additional illustrative images - in front of main image */}
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-xl overflow-hidden shadow-xl border-3 border-white/30 transform rotate-6 hover:rotate-0 transition-transform duration-300 hidden lg:block z-20">
              <img 
                src={sketchingImage}
                alt="Product design sketching on digital tablet"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-xl overflow-hidden shadow-xl border-3 border-white/30 transform -rotate-12 hover:rotate-0 transition-transform duration-300 hidden lg:block z-20">
              <img 
                src={cadModelingImage}
                alt="3D CAD modeling software"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute bottom-20 -right-16 w-44 h-44 rounded-xl overflow-hidden shadow-xl border-3 border-white/30 transform rotate-3 hover:rotate-0 transition-transform duration-300 hidden lg:block z-20">
              <img 
                src={brainstormingImage}
                alt="Brainstorming with post-it notes"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-3xl rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}