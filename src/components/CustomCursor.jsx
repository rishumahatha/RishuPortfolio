import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide on touch devices
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
      return;
    }

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => cursor.classList.add('hovered');
    const handleMouseLeave = () => cursor.classList.remove('hovered');

    window.addEventListener('mousemove', moveCursor);

    const interactives = document.querySelectorAll('a, button, .glow-btn, .glass-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef} />;
}
