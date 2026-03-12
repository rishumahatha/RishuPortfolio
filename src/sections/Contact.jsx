import { useState } from 'react';
import { useScrollReveal } from '../hooks/useGsapScrollTrigger';

const contactLinks = [
  { icon: '📧', label: 'Email', value: 'rishumahatha4@gmail.com', href: 'mailto:rishumahatha4@gmail.com' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/rishumahatha', href: 'https://linkedin.com/in/rishumahatha' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/rishumahatha', href: 'https://github.com/rishumahatha' },
  { icon: '📱', label: 'Phone', value: '+91 62028 53608', href: 'tel:+916202853608' },
];

export default function Contact() {
  const headerRef = useScrollReveal();
  const leftRef = useScrollReveal({ delay: 0.1 });
  const rightRef = useScrollReveal({ delay: 0.2 });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.target);
    formData.append('access_key', '427e69e6-b1fb-48ac-bab0-7dc371db4a64');
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setStatus('success'); e.target.reset();
        setTimeout(() => setStatus('idle'), 4000);
      } else { setStatus('error'); setTimeout(() => setStatus('idle'), 4000); }
    } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 4000); }
  };

  return (
    <section className="section-wrap" id="contact">
      <div className="section-header" ref={headerRef}>
        <span className="section-num">06</span>
        <span className="section-line" />
        <h2 className="section-header-title"><span>Contact</span></h2>
      </div>

      <div className="contact-layout">
        <div ref={leftRef}>
          <h3 className="contact-heading">
            Let&apos;s build something <span>amazing</span> together.
          </h3>
          <p className="contact-body">
            I&apos;m always open to new opportunities, collaborations, or just a conversation about tech and design.
          </p>
          <div className="contact-links">
            {contactLinks.map((c, i) => (
              <a href={c.href} className="contact-link-item" key={i} target="_blank" rel="noopener noreferrer">
                <div className="cl-icon">{c.icon}</div>
                <div>
                  <div className="cl-label">{c.label}</div>
                  <div className="cl-value">{c.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <form className="contact-form" ref={rightRef} onSubmit={handleSubmit}>
          <input type="hidden" name="subject" value="New message from Portfolio" />
          <div className="form-group">
            <input type="text" name="name" id="name" placeholder=" " required />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-group">
            <input type="email" name="email" id="email" placeholder=" " required />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-group">
            <textarea name="message" id="message" rows="5" placeholder=" " required />
            <label htmlFor="message">Message</label>
          </div>
          <button type="submit" className="submit-btn" disabled={status === 'sending'}>
            {status === 'idle' && 'Send Message →'}
            {status === 'sending' && 'Sending...'}
            {status === 'success' && 'Sent ✓'}
            {status === 'error' && 'Failed — Retry'}
          </button>
        </form>
      </div>
    </section>
  );
}
