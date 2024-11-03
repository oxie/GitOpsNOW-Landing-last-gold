import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  dx: number;
  dy: number;
  age: number;
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();
  const lastPointRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    const addPoint = (x: number, y: number) => {
      const now = performance.now();
      if (now - lastPointRef.current < 16) return; // Limit to ~60fps
      lastPointRef.current = now;

      pointsRef.current.push({
        x,
        y,
        dx: 0,
        dy: 0,
        age: 0
      });

      // Limit points array for performance
      if (pointsRef.current.length > 100) {
        pointsRef.current = pointsRef.current.slice(-100);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };

      addPoint(mouseRef.current.x, mouseRef.current.y);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Enable anti-aliasing
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(250, 189, 0, 0.2)';

      // Update and draw points
      pointsRef.current.forEach((point, i) => {
        // Smoother physics
        point.dx *= 0.97; // Less friction
        point.dy *= 0.97;
        point.x += point.dx;
        point.y += point.dy;
        point.age += 0.5; // Slower aging

        // Connect points with curves
        if (i > 0) {
          const prev = pointsRef.current[i - 1];
          const dx = prev.x - point.x;
          const dy = prev.y - point.y;
          
          // Gentler spring force
          point.dx += dx * 0.015;
          point.dy += dy * 0.015;

          // Calculate control points for smooth curves
          const controlPoint1 = {
            x: prev.x - dx * 0.15,
            y: prev.y - dy * 0.15
          };
          const controlPoint2 = {
            x: point.x + dx * 0.15,
            y: point.y + dy * 0.15
          };

          // Draw smooth curve
          const gradient = ctx.createLinearGradient(point.x, point.y, prev.x, prev.y);
          const alpha = Math.max(0, 0.5 - point.age / 200);
          gradient.addColorStop(0, `rgba(250, 189, 0, ${alpha})`);
          gradient.addColorStop(1, `rgba(250, 189, 0, ${alpha * 1.2})`);

          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = Math.max(0.5, 2.5 - point.age / 50);
          
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.bezierCurveTo(
            controlPoint2.x, controlPoint2.y,
            controlPoint1.x, controlPoint1.y,
            prev.x, prev.y
          );
          ctx.stroke();
        }

        // Draw point glow with smoother gradient
        const glowGradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, 25
        );
        const glowAlpha = Math.max(0, 0.2 - point.age / 200);
        glowGradient.addColorStop(0, `rgba(250, 189, 0, ${glowAlpha})`);
        glowGradient.addColorStop(0.5, `rgba(250, 189, 0, ${glowAlpha * 0.5})`);
        glowGradient.addColorStop(1, 'rgba(250, 189, 0, 0)');

        ctx.beginPath();
        ctx.fillStyle = glowGradient;
        ctx.arc(point.x, point.y, 25, 0, Math.PI * 2);
        ctx.fill();
      });

      // Remove old points more gradually
      pointsRef.current = pointsRef.current.filter(point => point.age < 200);

      rafRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.6 }}
    />
  );
}