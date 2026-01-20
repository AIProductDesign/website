import { Hero } from './components/Hero';
import { About } from './components/About';
import { Questions } from './components/Questions';
import { Participation } from './components/Participation';
import { Mapping } from './components/Mapping';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <About />
      <Questions />
      <Participation />
      <Mapping />
      <Contact />
    </div>
  );
}