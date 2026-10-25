"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Packet {
  a: number;
  b: number;
  t: number;
  speed: number;
}

/**
 * Lightweight 2D network graph: drifting nodes, proximity links, data packets
 * travelling along edges and gentle cursor attraction. Pauses when offscreen
 * or when the tab is hidden; renders a single static frame for reduced motion.
 */
export default function NetworkCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let frame = 0;
    let onScreen = true;
    let nodes: Node[] = [];
    const packets: Packet[] = [];
    const mouse = { x: -9999, y: -9999 };
    let accent = "94 220 255";

    const readAccent = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      if (v) accent = v;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(86, Math.max(26, (w * h) / 17000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.2 + 0.6,
      }));
    };

    const draw = (animate: boolean) => {
      const link = w < 640 ? 105 : 150;
      ctx.clearRect(0, 0, w, h);
      if (frame % 30 === 0) readAccent();

      if (animate) {
        for (const n of nodes) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22000) {
            n.vx += dx * 0.000012;
            n.vy += dy * 0.000012;
          }
          n.vx *= 0.995;
          n.vy *= 0.995;
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        }
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < link) {
            ctx.strokeStyle = `rgb(${accent} / ${(1 - d / link) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            if (animate && packets.length < 10 && Math.random() < 0.0009) {
              packets.push({ a: i, b: j, t: 0, speed: 0.012 + Math.random() * 0.012 });
            }
          }
        }
      }

      // cursor links
      for (const n of nodes) {
        const d = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        if (d < 170) {
          ctx.strokeStyle = `rgb(${accent} / ${(1 - d / 170) * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // packets
      for (let p = packets.length - 1; p >= 0; p--) {
        const pk = packets[p];
        pk.t += pk.speed;
        const A = nodes[pk.a];
        const B = nodes[pk.b];
        if (pk.t >= 1 || !A || !B) {
          packets.splice(p, 1);
          continue;
        }
        const x = A.x + (B.x - A.x) * pk.t;
        const y = A.y + (B.y - A.y) * pk.t;
        ctx.fillStyle = `rgb(${accent} / 0.95)`;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgb(${accent} / 0.65)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      frame += 1;
      if (onScreen && !document.hidden) draw(true);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    readAccent();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(false);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    io.observe(canvas);

    if (reduce) {
      draw(false);
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
