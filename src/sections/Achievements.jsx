import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../hooks/useGsapScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Counter({ count, suffix, trigger, loading }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!trigger || count === undefined || loading) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: count,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger, start: 'top 85%', toggleActions: 'play none none none' },
      onUpdate: () => { if (ref.current) ref.current.textContent = Math.floor(obj.val) + suffix; },
    });
  }, [count, suffix, trigger, loading]);

  if (loading) return <div className="ach-count" style={{ opacity: 0.3 }}>...{suffix}</div>;
  return <div className="ach-count" ref={ref}>0{suffix}</div>;
}

export default function Achievements() {
  const headerRef = useScrollReveal();
  const gridRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    leetcode: 100, // Updated to 100+
    gfg: 70,      // Updated to 70+
    hackerrank: 5
  });

  useEffect(() => {
    let active = true;

    const fetchWithTimeout = async (url, timeout = 5000) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      return response;
    };

    const loadStats = async () => {
      // Independent fetches so one slow API doesn't block the others
      const lcPromise = fetchWithTimeout('https://leetcode-stats-api.herokuapp.com/rishumahatha')
        .then(res => res.json())
        .then(data => {
          if (active && data.status === 'success') {
            setStats(prev => ({ ...prev, leetcode: data.totalSolved }));
          }
        })
        .catch(() => console.warn('LeetCode stats fetch failed.'));

      const gfgPromise = fetchWithTimeout('https://geeks-for-geeks-api.vercel.app/rishumahatha')
        .then(res => res.json())
        .then(data => {
          if (active) {
            const solved = data.total_problems_solved || data.solved_problems || data.solved;
            if (solved) setStats(prev => ({ ...prev, gfg: solved }));
          }
        })
        .catch(() => console.warn('GFG stats fetch failed.'));

      // Wait for all settled or a global timeout
      await Promise.allSettled([lcPromise, gfgPromise]);
      
      if (active) {
        // Even if some failed, we stop loading to show the defaults/fallback
        setLoading(false);
      }
    };

    loadStats();
    
    // Safety timeout to ensure loading always stops
    const safetyTimer = setTimeout(() => {
      if (active && loading) setLoading(false);
    }, 8000);

    return () => { 
      active = false;
      clearTimeout(safetyTimer);
    };
  }, []);

  const achievementsList = [
    { icon: '🧩', count: stats.leetcode, suffix: '+', label: 'LeetCode Problems' },
    { icon: '💡', count: stats.gfg, suffix: '+', label: 'GeeksforGeeks Problems' },
    { icon: '⭐', count: stats.hackerrank, suffix: '-Star', label: 'Python Badge · HackerRank' },
  ];

  return (
    <section className="section-wrap" id="achievements">
      <div className="section-header" ref={headerRef}>
        <span className="section-num">04</span>
        <span className="section-line" />
        <h2 className="section-header-title"><span>Stats</span></h2>
      </div>

      <div className="achievements-grid" ref={gridRef}>
        {achievementsList.map((a, i) => (
          <div className="ach-card" key={i}>
            <div className="ach-icon">{a.icon}</div>
            <Counter count={a.count} suffix={a.suffix} trigger={gridRef.current} loading={loading} />
            <div className="ach-label">{a.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
