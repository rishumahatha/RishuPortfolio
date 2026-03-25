import { useScrollReveal, useStaggerReveal } from '../hooks/useGsapScrollTrigger';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const CertificateCard = ({ cert, index }) => {
  const [pdfError, setPdfError] = useState(false);
  const [pdfLoaded, setPdfLoaded] = useState(false);

  return (
    <div className="cert-card" style={{ '--cert-color': cert.color }}>
      {/* Certificate image preview */}
      <div className="cert-preview">
        {cert.image?.endsWith('.pdf') ? (
          <>
            {!pdfError && (
              <Document
                file={cert.image}
                onLoadError={() => setPdfError(true)}
                onLoadSuccess={() => setPdfLoaded(true)}
                loading={<div className="pdf-loading">Loading PDF...</div>}
              >
                <Page 
                  pageNumber={1} 
                  width={240}
                  scale={1}
                />
              </Document>
            )}
            {pdfError && (
              <div className="cert-preview-fallback">
                <span className="cert-preview-icon">{cert.icon}</span>
              </div>
            )}
          </>
        ) : (
          <>
            <img
              src={cert.image}
              alt={cert.title}
              className="cert-preview-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="cert-preview-fallback" style={{ display: 'none' }}>
              <span className="cert-preview-icon">{cert.icon}</span>
            </div>
          </>
        )}
      </div>

      {/* Certificate details */}
      <div className="cert-body">
        <div className="cert-title">{cert.title}</div>
        <div className="cert-issuer">{cert.issuer}</div>
        <div className="cert-date">{cert.date}</div>
        <a
          href={cert.credential}
          target="_blank"
          rel="noopener noreferrer"
          className="cert-link"
        >
          View Certificate <span>→</span>
        </a>
      </div>
    </div>
  );
};

const certificates = [
  {
    icon: '🔌',
    title: 'Introduction to Internet of Things',
    issuer: 'NPTEL (Swayam)',
    date: '2025',
    credential: 'https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS147S95870073910600209',
    color: '#ff6b6b',
    image: '/certs/Screenshot%202026-03-25%20095919.png',
  },
  {
    icon: '📚',
    title: 'ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM',
    issuer: 'Infosys',
    date: 'August 2025',
    credential: 'https://verify.onwingspan.com/',
    color: '#00d4ff',
    image: '/certs/Screenshot%202026-03-25%20100123.png',
  },
  {
    icon: '🎓',
    title: 'Computational Theory: Language Principle & Finite Automata Theory',
    issuer: 'Infosys',
    date: 'August 2025',
    credential: 'https://verify.onwingspan.com/',
    color: '#ff9900',
    image: '/certs/Screenshot%202026-03-25%20100137.png',
  },
  {
    icon: '✨',
    title: 'Build Generative AI Apps and Solutions with No-Code Tools',
    issuer: 'Infosys',
    date: 'August 2025',
    credential: 'https://verify.onwingspan.com/',
    color: '#a855f7',
    image: '/certs/Screenshot%202026-03-25%20100147.png',
  },
  {
    icon: '🏆',
    title: 'Master Generative AI & Generative AI tools (ChatGPT & more)',
    issuer: 'Infosys',
    date: 'August 2025',
    credential: 'https://verify.onwingspan.com/',
    color: '#22c55e',
    image: '/certs/Screenshot%202026-03-25%20100156.png',
  },
];

export default function Certificates() {
  const headerRef = useScrollReveal();
  const gridRef = useStaggerReveal({ childSelector: '.cert-card', stagger: 0.12, y: 40 });

  return (
    <section className="section-wrap" id="certificates">
      <div className="section-header" ref={headerRef}>
        <span className="section-num">06</span>
        <span className="section-line" />
        <h2 className="section-header-title"><span>Certificates</span></h2>
      </div>

      <div className="cert-grid" ref={gridRef}>
        {certificates.map((cert, i) => (
          <CertificateCard key={i} cert={cert} index={i} />
        ))}
      </div>
    </section>
  );
}
