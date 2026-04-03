import { useEffect, useRef, Component, ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Questions } from './components/Questions';
import { Participation } from './components/Participation';
import { Mapping } from './components/Mapping';
import { CaseStudies } from './components/CaseStudies';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { PartnerCarousel } from './components/PartnerCarousel';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForumPage } from './pages/ForumPage';
import { NewPostPage } from './pages/NewPostPage';
import { ForumPostPage } from './pages/ForumPostPage';
import { useReveal } from './hooks/useReveal';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center py-20 text-[#1D1D1F]/30 text-sm font-mono">
          Deze sectie kon niet geladen worden.
        </div>
      );
    }
    return this.props.children;
  }
}

function HomePage() {
  useReveal();

  const progressRef = useRef<HTMLDivElement>(null);
  const dotRef2 = useRef<HTMLDivElement>(null);
  const ringRef2 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = progressRef.current;
    const onScroll = () => {
      if (bar) {
        const total = document.body.scrollHeight - window.innerHeight;
        bar.style.width = `${total > 0 ? (window.scrollY / total) * 100 : 0}%`;
      }
      const onHero = window.scrollY < window.innerHeight * 0.85;
      if (dotRef2.current) dotRef2.current.style.background = onHero ? '#ffffff' : '#1D1D1F';
      if (ringRef2.current) ringRef2.current.style.borderColor = onHero ? 'rgba(255,255,255,0.5)' : 'rgba(29,29,31,0.45)';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dotRef = dotRef2;
  const ringRef = ringRef2;
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    dot.style.opacity = '1';
    ringEl.style.opacity = '1';

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    let rafId: number;
    const animate = () => {
      if (!document.hidden) {
        ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
        ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
        dot.style.transform = `translate(calc(${mouse.current.x}px - 50%), calc(${mouse.current.y}px - 50%))`;
        ringEl.style.transform = `translate(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%))`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button')) {
        ringEl.classList.add('is-hovering');
      } else {
        ringEl.classList.remove('is-hovering');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="grain-overlay" aria-hidden="true" />
      <div
        ref={progressRef}
        className="fixed top-0 left-0 h-[5px] bg-[#4B9FFF] z-[9999] pointer-events-none"
        style={{ width: '0%', boxShadow: '0 0 14px rgba(75,159,255,0.8)' }}
      />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" style={{ opacity: 0 }} />
      <Navigation />
      <ErrorBoundary><Hero /></ErrorBoundary>
      <ErrorBoundary><PartnerCarousel /></ErrorBoundary>
      <ErrorBoundary><About /></ErrorBoundary>
      {/* <ErrorBoundary><Questions /></ErrorBoundary> */}
      <ErrorBoundary><Mapping /></ErrorBoundary>
      <ErrorBoundary><CaseStudies /></ErrorBoundary>
      <ErrorBoundary><Participation /></ErrorBoundary>
      <ErrorBoundary><Contact /></ErrorBoundary>
    </div>
  );
}

function GlobalCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;
    dot.style.opacity = '1';
    ringEl.style.opacity = '1';

    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    let rafId: number;
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      dot.style.transform = `translate(calc(${mouse.current.x}px - 50%), calc(${mouse.current.y}px - 50%))`;
      ringEl.style.transform = `translate(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%))`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button')) ringEl.classList.add('is-hovering');
      else ringEl.classList.remove('is-hovering');
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('mousemove', onMove); document.removeEventListener('mouseover', onOver); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" style={{ opacity: 0, background: '#1D1D1F' }} />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" style={{ opacity: 0, borderColor: 'rgba(29,29,31,0.45)' }} />
    </>
  );
}

export default function App() {
  return (
    <>
      <GlobalCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forum" element={<ProtectedRoute><ForumPage /></ProtectedRoute>} />
        <Route path="/forum/new" element={<ProtectedRoute><NewPostPage /></ProtectedRoute>} />
        <Route path="/forum/:id" element={<ProtectedRoute><ForumPostPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}
