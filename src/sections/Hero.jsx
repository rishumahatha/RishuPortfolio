import { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';

/* ─── Hero ─── */
export default function Hero() {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    gsap.set([
      el.querySelector('.hero-badge'),
      el.querySelector('.hero-name'),
      el.querySelector('.hero-role'),
      el.querySelector('.hero-tagline'),
      el.querySelector('.hero-buttons'),
    ], { y: 50, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.5 });
    tl.to(el.querySelector('.hero-badge'), { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to(el.querySelector('.hero-name'), { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to(el.querySelector('.hero-role'), { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to(el.querySelector('.hero-tagline'), { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to(el.querySelector('.hero-buttons'), { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');
  }, []);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-float"></div>
      <div className="hero-float"></div>
      <div className="hero-float"></div>

      <div className="hero-content" ref={contentRef}>
        <div className="hero-badge">
          <span className="badge-dot" />
          Always tinkering with code
        </div>
        <h1 className="hero-name">
          <span className="line gradient-text">Rishu</span>
          <span className="line gradient-text">Mahatha</span>
        </h1>
        <p className="hero-role">
          <span className="accent">Frontend Developer</span> · UI/UX Enthusiast · Code Wizard in Training
        </p>
        <p className="hero-tagline">&ldquo;Turning caffeine into code, one bug at a time.&rdquo;</p>
        <div className="hero-buttons">
          <a href="#projects" className="mag-btn mag-btn-primary">✦ View Projects</a>
          <a href="/resume.pdf" download="Rishu_Mahatha_Resume.pdf" className="mag-btn">↓ Resume</a>
          <a href="#contact" className="mag-btn">→ Contact</a>
        </div>
      </div>
    </section>
  );
}
