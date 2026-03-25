import { useScrollReveal, useStaggerReveal } from '../hooks/useGsapScrollTrigger';

const projects = [
  {
    num: '01',
    title: 'Expense Tracker',
    desc: 'A full-stack expense management application with real-time tracking, intelligent categorization, and comprehensive financial analytics dashboard.',
    features: [
      'Add, edit, and delete expenses seamlessly',
      'Smart category & date filtering',
      'Real-time totals and spending breakdown',
      'Fully responsive, mobile-first design',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/rishumahatha/expense-tracker-advanced',
  },
  {
    num: '02',
    title: 'GreenConnect',
    desc: 'An environmental collaboration platform connecting communities for sustainability initiatives, enabling resource sharing and collective impact tracking.',
    features: [
      'Role-based user interface & access control',
      'Community collaboration & project boards',
      'Environmental impact management',
      'Discussion forums and resource sharing',
    ],
    tags: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
    github: 'https://github.com/rishumahatha/greenconnect',
  },
];

export default function Projects() {
  const headerRef = useScrollReveal();
  const listRef = useStaggerReveal({ childSelector: '.stagger-item', stagger: 0.2 });

  return (
    <section className="section-wrap" id="projects" style={{ padding: '120px 48px 160px' }}>
      <div className="section-header" ref={headerRef}>
        <span className="section-num">03</span>
        <span className="section-line" />
        <h2 className="section-header-title"><span>Work</span></h2>
      </div>

      <div className="projects-list" ref={listRef}>
        {projects.map((p, i) => (
          <div className={`project-card stagger-item ${i === 1 ? 'project-card-alt' : ''}`} key={i}>
            <div>
              <div className="project-num">{p.num}</div>
              <div className="project-tags">
                {p.tags.map((t, ti) => (
                  <span className="project-tag" key={ti}>{t}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <ul className="project-features">
                {p.features.map((f, fi) => <li key={fi}>{f}</li>)}
              </ul>
              <a 
                href={p.github} 
                className="project-link" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(p.github, '_blank');
                }}
              >
                View on GitHub →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
