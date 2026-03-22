import React, { useEffect, useRef } from 'react';

const WarpBackground = ({ active = false }) => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const speedRef = useRef(0.002);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const numStars = 800; // Increased

    const initStars = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      if (starsRef.current.length === 0) {
        for (let i = 0; i < numStars; i++) {
          starsRef.current.push({
            x: Math.random() * w - w / 2,
            y: Math.random() * h - h / 2,
            z: Math.random() * w,
            o: Math.random(),
          });
        }
      }
    };

    const update = () => {
      const w = canvas.width;
      const h = canvas.height;
      
      // Clear background
      ctx.fillStyle = active ? 'rgba(0, 0, 0, 0.4)' : 'black';
      ctx.fillRect(0, 0, w, h);

      // Smooth accelerate speed
      const targetSpeed = active ? 0.25 : 0.002;
      speedRef.current += (targetSpeed - speedRef.current) * 0.03;

      ctx.save();
      ctx.translate(w / 2, h / 2);

      for (let i = 0; i < starsRef.current.length; i++) {
        const s = starsRef.current[i];
        
        // Z-movement
        s.z -= speedRef.current * w;
        
        if (s.z <= 0) {
          s.z = w;
          s.x = Math.random() * w - w / 2;
          s.y = Math.random() * h - h / 2;
        }

        const x = (s.x / s.z) * w;
        const y = (s.y / s.z) * w;
        
        const size = (1 - s.z / w) * 4;
        const opacity = (1 - s.z / w);

        if (active) {
          // HYPERSPACE EFFECT
          const stretch = 1 + (speedRef.current * 50);
          const px = (s.x / (s.z + speedRef.current * w * stretch)) * w;
          const py = (s.y / (s.z + speedRef.current * w * stretch)) * w;
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(34, 197, 94, ${opacity * 2})`;
          ctx.lineWidth = size * 1.5;
          ctx.lineCap = 'round';
          ctx.moveTo(x, y);
          ctx.lineTo(px, py);
          ctx.stroke();
          
          // Glow core
          if (opacity > 0.6) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = size * 0.5;
            ctx.moveTo(x, y);
            ctx.lineTo(px, py);
            ctx.stroke();
          }
        } else {
          // IDLE STARS
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity + 0.2})`;
          ctx.beginPath();
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(update);
    };

    initStars();
    update();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 bg-black pointer-events-none"
    />
  );
};

export default WarpBackground;
