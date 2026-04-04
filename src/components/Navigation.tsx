import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Over', id: 'about' },
  { label: 'AI per fase', id: 'mapping' },
  { label: 'Cases', id: 'case-studies' },
  { label: 'Deelnemen', id: 'participate' },
  { label: 'Contact', id: 'contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    const check = () => setOnHero(window.scrollY < window.innerHeight * 0.85);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const textColor = onHero ? 'text-white/70 hover:text-white' : 'text-[#1D1D1F]/70 hover:text-[#1D1D1F]';
  const brandColor = onHero ? 'text-white' : 'text-[#1D1D1F]';
  const ctaBg = onHero
    ? 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
    : 'bg-[#1D1D1F] text-white hover:bg-[#1D1D1F]/80';
  const navBg = onHero
    ? 'bg-transparent border-transparent'
    : 'bg-white/90 backdrop-blur-xl border-black/6';
  const mobileBg = onHero ? 'bg-[#0A0F1E]/95 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl';
  const mobileDivider = onHero ? 'border-white/10' : 'border-black/6';
  const mobileText = onHero ? 'text-white/70 hover:text-white' : 'text-[#1D1D1F]/70 hover:text-[#1D1D1F]';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${navBg}`}>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex justify-between items-center h-14">
          <a
            href="#"
            onClick={e => scrollTo(e, 'hero')}
            className={`tracking-widest font-bold transition-colors duration-500 opacity-0 animate-[fadeIn_0.6s_ease_0.1s_forwards] ${brandColor}`}
            style={{ fontSize: '1.1rem', lineHeight: '1', fontFamily: "'Dyson Sans Modern', sans-serif" }}
          >
            aipec
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7 opacity-0 animate-[fadeIn_0.6s_ease_0.3s_forwards]">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={e => scrollTo(e, item.id)}
                className={`nav-link text-sm font-medium tracking-wide transition-colors duration-300 ${textColor}`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#/forum"
              className={`nav-link text-sm font-medium tracking-wide transition-colors duration-300 ${textColor}`}
            >
              Forum
            </a>
            <a
              href="https://forms.office.com/pages/responsepage.aspx?id=-wgueVQtjkqvciAlSBNu9lP3AWYSl-9Dtiyf_E4rwNNUMkNRMTRBU0JJVjNSTUxQRDhTMTRUTVlXUy4u&route=shorturl"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300 ${ctaBg}`}
            >
              Wordt lid
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-1.5 rounded transition-colors ${onHero ? 'text-white' : 'text-[#1D1D1F]'}`}
            aria-label="Menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        } ${mobileBg}`}
      >
        <div className={`py-3 border-t px-4 sm:px-6 lg:px-8 ${mobileDivider}`}>
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={e => scrollTo(e, item.id)}
              className={`block py-2.5 text-xs font-medium tracking-wide transition-colors ${mobileText}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#/forum"
            onClick={() => setIsOpen(false)}
            className={`block py-2.5 text-xs font-medium tracking-wide transition-colors ${mobileText}`}
          >
            Forum
          </a>
          <a
            href="https://forms.office.com/pages/responsepage.aspx?id=-wgueVQtjkqvciAlSBNu9lP3AWYSl-9Dtiyf_E4rwNNUMkNRMTRBU0JJVjNSTUxQRDhTMTRUTVlXUy4u&route=shorturl"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="block mt-2 py-2.5 px-4 bg-[#4B9FFF] text-white rounded-full text-xs font-semibold text-center"
          >
            Wordt lid
          </a>
        </div>
      </div>
    </nav>
  );
}
