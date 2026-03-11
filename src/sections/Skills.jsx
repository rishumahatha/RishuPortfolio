import { useRef } from 'react';
import { useScrollReveal, useStaggerReveal } from '../hooks/useGsapScrollTrigger';

const categories = [
  {
    title: 'Languages',
    skills: [
      { name: 'C++', icon: '⚡' }, { name: 'JavaScript', icon: '🟨' },
      { name: 'Python', icon: '🐍' }, { name: 'Java', icon: '☕' }, { name: 'PHP', icon: '🐘' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'React', icon: '⚛️' }, { name: 'GSAP', icon: '🎬' },
      { name: 'Node.js', icon: '🟢' }, { name: 'Express.js', icon: '🚀' },
      { name: 'TailwindCSS', icon: '🎨' }, { name: 'HTML/CSS', icon: '🌐' },
    ],
  },
  {
    title: 'Tools & Databases',
    skills: [
      { name: 'MySQL', icon: '🗄️' }, { name: 'MongoDB', icon: '🍃' },
      { name: 'Figma', icon: '🎯' }, { name: 'Git', icon: '📦' },
    ],
  },
];

function SkillCard({ name, icon }) {
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(600px) rotateY(${x / 16}deg) rotateX(${-y / 16}deg) translateY(-6px)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  return (
    <div className="skill-card stagger-item" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="skill-icon">{icon}</div>
      <div className="skill-name">{name}</div>
    </div>
  );
}

export default function Skills() {
  const headerRef = useScrollReveal();

  return (
    <section className="section-wrap" id="skills">
      <div className="section-header" ref={headerRef}>
        <span className="section-num">02</span>
        <span className="section-line" />
        <h2 className="section-header-title"><span>Skills</span></h2>
      </div>

      <div className="skills-categories">
        {categories.map((cat, ci) => {
          const gridRef = useStaggerReveal({ childSelector: '.stagger-item', stagger: 0.06 });
          return (
            <div key={ci}>
              <div className="skills-cat-header">
                <span className="skills-cat-name">{cat.title}</span>
                <span className="skills-cat-line" />
              </div>
              <div className="skills-grid" ref={gridRef}>
                {cat.skills.map((skill, si) => (
                  <SkillCard key={si} name={skill.name} icon={skill.icon} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
