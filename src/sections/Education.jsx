import { useScrollReveal, useStaggerReveal } from '../hooks/useGsapScrollTrigger';

const timeline = [
  { date: '2023 — Present', title: 'B.Tech in Computer Science & Engineering', subtitle: 'Lovely Professional University (LPU) - CGPA: 7.97' },
  { date: '2021 — 2023', title: 'Intermediate (12th)', subtitle: 'Score: 79.6%' },
  { date: '2021', title: 'Matriculation (10th)', subtitle: 'Score: 70.2%' },
];

export default function Education() {
  const headerRef = useScrollReveal();
  const timelineRef = useStaggerReveal({ childSelector: '.stagger-item', stagger: 0.2, y: 50 });

  return (
    <section className="section-wrap" id="education">
      <div className="section-header" ref={headerRef}>
        <span className="section-num">05</span>
        <span className="section-line" />
        <h2 className="section-header-title"><span>Education</span></h2>
      </div>

      <div className="timeline" ref={timelineRef}>
        {timeline.map((item, i) => (
          <div className="timeline-item stagger-item" key={i}>
            <div className="tl-date">{item.date}</div>
            <div className="tl-title">{item.title}</div>
            <div className="tl-subtitle">{item.subtitle}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
