import { useScrollReveal, useStaggerReveal } from '../hooks/useGsapScrollTrigger';

const stats = [
  { icon: '🎓', label: 'University', value: 'Lovely Professional University (LPU)' },
  { icon: '📚', label: 'Year', value: '3rd Year B.Tech' },
  { icon: '💻', label: 'Focus', value: 'Full-Stack Dev' },
  { icon: '🎨', label: 'Passion', value: 'UI/UX Design' },
];

export default function About() {
  const headerRef = useScrollReveal();
  const leftRef = useScrollReveal({ delay: 0.1 });
  const rightRef = useStaggerReveal({ childSelector: '.stat-card', stagger: 0.12 });

  return (
    <section className="section-wrap" id="about">
      <div className="section-header" ref={headerRef}>
        <span className="section-num">01</span>
        <span className="section-line" />
        <h2 className="section-header-title"><span>About</span></h2>
      </div>

      <div className="about-layout">
        <div ref={leftRef}>
          <div className="about-label">Who I Am</div>
          <h3 className="about-big-text" style={{ textAlign: 'left' }}>
            I craft <span className="dim">digital experiences that actually</span> connect <span className="dim">with</span> people.
          </h3>
          <div className="about-body">
            <p>
              Hey, I&apos;m Rishu – a <strong>3rd year Computer Science</strong> student at
              <strong> Lovely Professional University</strong>, who fell in love with the magic where design meets code.
            </p>
            <p>
              I specialize in <strong>Full-Stack Development</strong> and <strong>UI/UX Design</strong> — 
              because I believe great products start with great user experiences. I&apos;m a <strong>self-taught tinkerer</strong> who loves 
              solving tricky problems and experimenting with new tech. When I&apos;m not coding, you&apos;ll find me sketching UI ideas or reading about the latest in web dev.
            </p>
            <p style={{ fontStyle: 'italic', color: 'var(--text-dim)', marginTop: '20px' }}>P.S. Still learning every day – that's the fun part!</p>
          </div>
        </div>

        <div className="about-stats" ref={rightRef}>
          {stats.map((s, i) => (
            <div className="stat-card stagger-item" key={i}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
