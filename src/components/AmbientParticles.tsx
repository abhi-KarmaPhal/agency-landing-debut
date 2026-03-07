"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    opacityTarget: number;
    life: number;
}

export default function AmbientParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = 0, h = 0;
        let particles: Particle[] = [];
        let animId: number;

        const resize = () => {
            w = canvas.offsetWidth;
            h = canvas.offsetHeight;
            canvas.width = w * window.devicePixelRatio;
            canvas.height = h * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        const createParticle = (): Particle => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -Math.random() * 0.4 - 0.1,
            size: Math.random() * 2.5 + 0.5,
            opacity: 0,
            opacityTarget: Math.random() * 0.4 + 0.1,
            life: Math.random() * 400 + 200,
        });

        const init = () => {
            resize();
            particles = Array.from({ length: 50 }, createParticle);
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life--;

                // Fade in/out
                if (p.life > 50) {
                    p.opacity += (p.opacityTarget - p.opacity) * 0.02;
                } else {
                    p.opacity *= 0.96;
                }

                if (p.life <= 0 || p.y < -10 || p.x < -10 || p.x > w + 10) {
                    particles[i] = createParticle();
                    particles[i].y = h + 10;
                    return;
                }

                // Draw gold particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`;
                ctx.fill();

                // Glow effect
                if (p.size > 1.5) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity * 0.15})`;
                    ctx.fill();
                }
            });

            animId = requestAnimationFrame(draw);
        };

        init();
        draw();
        window.addEventListener("resize", resize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 1,
                opacity: 0.6,
            }}
        />
    );
}
