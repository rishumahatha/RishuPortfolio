export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">
          © {new Date().getFullYear()} Rishu Mahatha
        </p>
        <div className="footer-links">
          <a href="https://github.com/rishumahatha" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/rishumahatha" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:rishumahatha4@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
