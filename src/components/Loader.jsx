import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const ref = useRef(null);
  const barRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(ref.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            if (ref.current) ref.current.style.display = 'none';
            if (onComplete) onComplete();
          },
        });
      },
    });

    const counter = { val: 0 };

    tl.to(counter, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.floor(counter.val);
        if (barRef.current) barRef.current.style.width = v + '%';
        if (percentRef.current) percentRef.current.textContent = v + '%';
      },
    });
  }, []);

  return (
    <div className="loader-screen" ref={ref}>
      <div className="loader-logo">RM.</div>
      <div className="loader-bar-track">
        <div className="loader-bar-fill" ref={barRef} />
      </div>
      <div className="loader-percent" ref={percentRef}>0%</div>
    </div>
  );
}
