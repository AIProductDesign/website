import { ArrowRight } from 'lucide-react';
import ugentLogo from '@/assets/ugent-logo-new.png';
import uantwerpenLogo from '@/assets/uantwerpen-logo-new.png';
import imecLogo from '@/assets/ccb6f66f4bcef309f545c7e1cd0253900f6ea7f4.png';
import vlaioLogo from '@/assets/vlaio-logo.png';
import { ParticleBackground } from './ParticleBackground';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-[#0A0F1E]">
      {/* Particle background */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleBackground />
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 pb-10">

        {/* Top: VLAIO label */}
        <div className="flex items-center gap-3 mt-6 hero-anim-1">
          <span className="text-xs text-white/65 font-mono tracking-widest">TETRA PROJECT · ONDERSTEUND DOOR</span>
          <img src={vlaioLogo} alt="VLAIO" className="h-3.5 object-contain" style={{ filter: 'brightness(0) invert(1)', opacity: 0.4 }} />
        </div>

        {/* Middle: heading + description + CTAs */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl py-12">

          {/* Main heading + subtitle */}
          <div className="mb-8">
            <div className="overflow-hidden pb-1 mb-1">
              <div
                className="font-black text-white leading-[1.0] tracking-tight hero-slide-1"
                style={{ fontFamily: "'Dyson Sans Modern', sans-serif", fontSize: 'clamp(2.2rem, 5.5vw, 4rem)' }}
              >
                van data naar design:
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                className="font-medium tracking-tight hero-slide-2"
                style={{ fontFamily: "'Dyson Sans Modern', sans-serif", fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: 'rgba(255,255,255,0.55)' }}
              >
                AI voor productontwikkeling van de toekomst.
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-white/75 max-w-lg leading-relaxed mb-10 hero-anim-3">
            Generatieve en agentic AI verandert fundamenteel hoe producten worden bedacht en ontworpen. Dit TETRA-project van UAntwerpen en UGent vertaalt AI naar concrete toepassingen voor het NPD-proces.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 hero-anim-4">
            <a
              href="https://forms.office.com/pages/responsepage.aspx?id=-wgueVQtjkqvciAlSBNu9lP3AWYSl-9Dtiyf_E4rwNNUMkNRMTRBU0JJVjNSTUxQRDhTMTRUTVlXUy4u&route=shorturl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-[#1D1D1F] rounded-full font-semibold hover:bg-white/90 transition-colors group text-sm"
            >
              Neem deel aan het project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/80 hover:text-white hover:border-white/45 rounded-full font-semibold transition-colors text-sm"
            >
              Meer info
            </a>
          </div>
        </div>

        {/* Bottom: partner logos */}
        <div className="hero-anim-5 mb-2">
          <p className="text-xs text-white/55 font-mono tracking-widest mb-4">EEN SAMENWERKING TUSSEN</p>
          <div className="flex flex-wrap items-center">
            <img src={uantwerpenLogo} alt="Universiteit Antwerpen" className="h-7 object-contain" style={{ opacity: 0.8 }} />
            <div className="w-px h-4 bg-white/20 mx-5 flex-shrink-0" />
            <img src={ugentLogo} alt="Universiteit Gent" className="h-7 object-contain" style={{ opacity: 0.8 }} />
            <div className="w-px h-4 bg-white/20 mx-5 flex-shrink-0" />
            <img src={imecLogo} alt="Imec" className="h-6 object-contain" style={{ filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
            <div className="w-px h-4 bg-white/20 mx-5 flex-shrink-0" />
            <img src={vlaioLogo} alt="VLAIO" className="h-5 object-contain" style={{ filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
          </div>
        </div>

      </div>

      {/* Scroll indicator — bottom left: dot · line · dot */}
      <div className="absolute bottom-8 left-8 z-10 hero-anim-6 flex flex-col items-center gap-1">
        <div className="w-1 h-1 rounded-full bg-white/50" />
        <div className="w-px h-8 bg-white/20 rounded-full overflow-hidden">
          <div className="w-full bg-white/60 rounded-full animate-scroll-bounce" style={{ height: '40%' }} />
        </div>
        <div className="w-1 h-1 rounded-full bg-white/20" />
      </div>
    </section>
  );
}
