import { useScrollReveal, useStaggerReveal } from '../hooks/useGsapScrollTrigger';

const stats = [
  { icon: '🎓', label: 'University', value: 'LPU' },
  { icon: '📚', label: 'Year', value: '3rd Year B.Tech' },
  { icon: '💻', label: 'Focus', value: 'Frontend Dev' },
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
          <h3 className="about-big-text">
            I build <span className="dim">digital experiences that feel</span> alive <span className="dim">and</span> meaningful.
          </h3>
          <div className="about-body">
            <p>
              I&apos;m a <strong>3rd year Computer Science</strong> student at
              <strong> Lovely Professional University</strong>, obsessed with the intersection
              of design and engineering.
            </p>
            <p>
              I specialize in <strong>Frontend Development</strong> and <strong>UI/UX Design</strong> —
              turning complex ideas into pixel-perfect, performant web applications.
              I&apos;m a <strong>self-learner</strong> who thrives on solving hard problems
              and pushing the boundaries of what&apos;s possible on the web.
            </p>
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
