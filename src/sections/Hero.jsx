import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

/* ─── Floating Geometry (much larger & closer) ─── */
function FloatingGeometry() {
  const groupRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = t * 0.08;
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.4;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.15;
      innerRef.current.rotation.z = t * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Large outer wireframe */}
      <mesh>
        <icosahedronGeometry args={[4, 1]} />
        <meshStandardMaterial color="#6c63ff" wireframe transparent opacity={0.18} />
      </mesh>
      {/* Inner wireframe */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[2.8, 2]} />
        <meshStandardMaterial color="#a855f7" wireframe transparent opacity={0.1} />
      </mesh>
      {/* Core glow sphere */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color="#6c63ff" transparent opacity={0.05} emissive="#6c63ff" emissiveIntensity={0.8} />
      </mesh>
      {/* Orbit rings */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[5, 0.008, 16, 150]} />
        <meshStandardMaterial color="#00d4ff" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[5.8, 0.006, 16, 150]} />
        <meshStandardMaterial color="#a855f7" transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[Math.PI / 6, -Math.PI / 5, Math.PI / 8]}>
        <torusGeometry args={[6.5, 0.005, 16, 150]} />
        <meshStandardMaterial color="#6c63ff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

/* ─── Particles ─── */
function Particles({ count = 2000 }) {
  const ref = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [new THREE.Color('#6c63ff'), new THREE.Color('#a855f7'), new THREE.Color('#00d4ff')];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 35;
      const c = palette[Math.floor(Math.random() * 3)];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} transparent opacity={0.7} sizeAttenuation vertexColors />
    </points>
  );
}

/* ─── Mouse Camera ─── */
function MouseCamera() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.2 - camera.position.x) * 0.03;
    camera.position.y += (-mouse.current.y * 1.2 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─── Hero ─── */
export default function Hero() {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    gsap.set([
      el.querySelector('.hero-badge'),
      el.querySelector('.hero-name'),
      el.querySelector('.hero-role'),
      el.querySelector('.hero-tagline'),
      el.querySelector('.hero-buttons'),
    ], { y: 50, opacity: 0 });

    const tl = gsap.timeline({ delay: 2.4 });
    tl.to(el.querySelector('.hero-badge'), { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(el.querySelector('.hero-name'), { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      .to(el.querySelector('.hero-role'), { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(el.querySelector('.hero-tagline'), { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .to(el.querySelector('.hero-buttons'), { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3');
  }, []);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-canvas">
        <Canvas camera={{ position: [0, 0, 10], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[6, 6, 6]} intensity={1} color="#6c63ff" />
          <pointLight position={[-6, -4, -6]} intensity={0.6} color="#a855f7" />
          <pointLight position={[0, -6, 4]} intensity={0.35} color="#00d4ff" />
          <FloatingGeometry />
          <Particles />
          <MouseCamera />
        </Canvas>
      </div>

      <div className="hero-content" ref={contentRef}>
        <div className="hero-badge">
          <span className="badge-dot" />
          Open to opportunities
        </div>
        <h1 className="hero-name">
          <span className="line gradient-text">Rishu</span>
          <span className="line gradient-text">Mahatha</span>
        </h1>
        <p className="hero-role">
          <span className="accent">Frontend Developer</span> · UI/UX Enthusiast · CSE Student
        </p>
        <p className="hero-tagline">&ldquo;Building interactive experiences with code.&rdquo;</p>
        <div className="hero-buttons">
          <a href="#projects" className="mag-btn mag-btn-primary">✦ View Projects</a>
          <a href="/resume.pdf" download="Rishu_Mahatha_Resume.pdf" className="mag-btn">↓ Resume</a>
          <a href="#contact" className="mag-btn">→ Contact</a>
        </div>
      </div>
    </section>
  );
}
