import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll } from "framer-motion";
import { cn } from "./shared";

/* ───────── Custom cursor (dot + lagging ring) ───────── */
export const CustomCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 550, damping: 32, mass: 0.35 });
  const ry = useSpring(y, { stiffness: 550, damping: 32, mass: 0.35 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    document.body.classList.add("custom-cursor-on");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const isInteractive = (t) =>
      t && t.closest && t.closest("[data-cursor], a, button, input, textarea, label, [role='button']");
    const over = (e) => isInteractive(e.target) && setHover(true);
    const out = (e) => isInteractive(e.target) && setHover(false);
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => {
      document.body.classList.remove("custom-cursor-on");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        className="cursor-dot hidden md:block"
        style={{ x, y, marginLeft: -3.5, marginTop: -3.5 }}
        animate={{ scale: down ? 0.6 : 1 }}
      />
      <motion.div
        className="cursor-ring hidden md:block"
        style={{ x: rx, y: ry, marginLeft: -19, marginTop: -19 }}
        animate={{ scale: hover ? 1.7 : down ? 0.85 : 1, opacity: hover ? 1 : 0.55 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
};

/* ───────── Crystal / lightning cursor trail (canvas) ───────── */
export const CursorTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const rand = (a, b) => a + Math.random() * (b - a);
    const points = []; // recent cursor positions (lightning path)
    const shards = []; // crystal particles
    let mx = -200;
    let my = -200;
    let lastX = mx;
    let lastY = my;
    let started = false;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!started) {
        started = true;
        lastX = mx;
        lastY = my;
      }
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const loop = () => {
      // trail path
      points.push({ x: mx, y: my });
      if (points.length > 16) points.shift();

      // spawn crystal shards on movement
      const dx = mx - lastX;
      const dy = my - lastY;
      const speed = Math.hypot(dx, dy);
      if (started && speed > 2 && shards.length < 44) {
        const count = speed > 30 ? 2 : 1;
        const dir = Math.atan2(dy, dx);
        for (let i = 0; i < count; i++) {
          const ang = dir + rand(-0.9, 0.9);
          const sp = rand(0.3, 2.4);
          shards.push({
            x: mx + rand(-4, 4),
            y: my + rand(-4, 4),
            vx: Math.cos(ang) * sp - dx * 0.02,
            vy: Math.sin(ang) * sp - dy * 0.02,
            life: 1,
            decay: rand(0.014, 0.03),
            size: rand(3, 9),
            rot: rand(0, Math.PI),
            vr: rand(-0.22, 0.22),
            cool: Math.random() < 0.5,
          });
        }
      }
      lastX = mx;
      lastY = my;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      // lightning polyline — cheap glow: wide faint stroke + bright thin core.
      // (No shadowBlur — it forces a per-call gaussian blur and tanks framerate.)
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const t = i / points.length; // brighter near cursor
        const jitter = (1 - t) * 6;
        const cxp = (p0.x + p1.x) / 2 + rand(-jitter, jitter);
        const cyp = (p0.y + p1.y) / 2 + rand(-jitter, jitter);
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.quadraticCurveTo(cxp, cyp, p1.x, p1.y);
        ctx.strokeStyle = `rgba(198,255,61,${0.05 + t * 0.12})`;
        ctx.lineWidth = (0.6 + t * 1.8) * 4;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.quadraticCurveTo(cxp, cyp, p1.x, p1.y);
        ctx.strokeStyle = `rgba(224,255,150,${0.18 + t * 0.6})`;
        ctx.lineWidth = 0.6 + t * 1.3;
        ctx.stroke();
      }

      // crystal shards — layered translucent diamonds (halo + body + core),
      // additive blend gives the glow. No shadowBlur.
      for (let i = shards.length - 1; i >= 0; i--) {
        const s = shards[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.97;
        s.vy = s.vy * 0.97 + 0.02;
        s.rot += s.vr;
        s.life -= s.decay;
        if (s.life <= 0) {
          shards.splice(i, 1);
          continue;
        }
        const a = s.life;
        const sz = s.size * (0.35 + s.life * 0.65);
        const rgb = s.cool ? "150,255,180" : "198,255,61";
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.beginPath();
        ctx.moveTo(0, -sz * 1.9);
        ctx.lineTo(sz * 1.1, 0);
        ctx.lineTo(0, sz * 1.9);
        ctx.lineTo(-sz * 1.1, 0);
        ctx.closePath();
        ctx.fillStyle = `rgba(${rgb},${a * 0.12})`;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, -sz);
        ctx.lineTo(sz * 0.58, 0);
        ctx.lineTo(0, sz);
        ctx.lineTo(-sz * 0.58, 0);
        ctx.closePath();
        ctx.fillStyle = `rgba(${rgb},${a * 0.55})`;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, -sz * 0.42);
        ctx.lineTo(sz * 0.24, 0);
        ctx.lineTo(0, sz * 0.42);
        ctx.lineTo(-sz * 0.24, 0);
        ctx.closePath();
        ctx.fillStyle = `rgba(255,255,255,${a * 0.5})`;
        ctx.fill();
        ctx.restore();
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9998] hidden md:block"
      aria-hidden="true"
    />
  );
};

/* ───────── Scroll progress bar ───────── */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-acid"
    />
  );
};

/* ───────── Page transition wrapper ───────── */
export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);
