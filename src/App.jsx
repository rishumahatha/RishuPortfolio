import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Education from './sections/Education';
import SummerTraining from './sections/SummerTraining';
import Certificates from './sections/Certificates';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Marquee() {
  const items = ['React', 'Three.js', 'GSAP', 'Node.js', 'UI/UX', 'Frontend', 'Creative', 'Developer'];
  const doubled = [...items, ...items];

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i}>
            <span className="marquee-item">{item}</span>
            <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <div className="noise-overlay" />
      <CustomCursor />

      <Navbar />
      <SmoothScroll>
        <main>
          <Hero />
          <Marquee />
          <About />
          <div className="section-divider" />
          <Skills />
          <div className="section-divider" />
          <Projects />
          <div className="section-divider" />
          <SummerTraining />
          <div className="section-divider" />
          <Achievements />
          <div className="section-divider" />
          <Education />
          <div className="section-divider" />
          <Certificates />
          <div className="section-divider" />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
