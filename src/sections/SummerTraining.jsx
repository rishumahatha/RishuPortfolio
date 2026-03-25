import { useScrollReveal } from '../hooks/useGsapScrollTrigger';

export default function SummerTraining() {
  const sectionRef = useScrollReveal({ y: 40, opacity: 0, duration: 0.8, start: 'top 90%' });

  return (
    <section id="summer-training" ref={sectionRef} className="section-wrap">
      <div className="section-header">
        <span className="section-num">04</span>
        <span className="section-line" />
        <h2 className="section-header-title"><span>Training</span></h2>
      </div>

      <div className="projects-list">
        <div className="project-card">
          <div>
            <div className="project-num">01</div>
          </div>
          <div>
            <h3 className="project-title">User Interface and User Experience Design</h3>
            <p className="project-desc">Summer training at CipherSchools focused on UI/UX design fundamentals and hands-on Figma prototype work.</p>
            <ul className="project-features">
              <li>Organization: CipherSchools (Edtech Company)</li>
              <li>Duration: June 2025 – July 2025</li>
              <li>Training: User Interface and User Experience Design</li>
              <li>Tech & Skills: Figma, Typography, Prototyping, Wireframes, user-centered design, interaction design, visual hierarchy</li>
              <li>Built Spotify Clone, Netflix Profile & Detail Pages, IRCTC UI Mockup, PlugPoint final project</li>
            </ul>
            <div className="flex flex-wrap gap-3 mt-3">
              <a
                href="https://www.cipherschools.com/certificate/preview?id=688b98ff39a767513ab913d2"
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Certificate →
              </a>
              <a
                href="https://www.figma.com/design/8UG3jPqfJvPiJfv9TcC9RU/PlugPoint?node-id=0-1&t=Xq4jbuFao6ACUBWu-1"
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Final Prototype →
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
