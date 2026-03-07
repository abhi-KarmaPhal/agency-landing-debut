"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Sets up all GSAP ScrollTrigger animations for the V12 sections */
export function useScrollAnimations() {
    useEffect(() => {
        // Small delay to ensure DOM is painted
        const ctx = gsap.context(() => {
            // ── DIVIDERS ──
            gsap.utils.toArray<HTMLElement>(".sdiv").forEach((el) => {
                gsap.to(el, {
                    scaleX: 1,
                    duration: 1.4,
                    ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
                });
            });

            // ── MANIFESTO ──
            const manifesto = document.getElementById("manifesto");
            if (manifesto) {
                // Eyebrow
                gsap.to(manifesto.querySelector(".mf-eyebrow"), {
                    opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
                    scrollTrigger: { trigger: manifesto, start: "top 70%" },
                });

                // Intro text
                gsap.to(manifesto.querySelector(".mf-intro"), {
                    opacity: 1, y: 0, duration: 0.9, delay: 0.15, ease: "power2.out",
                    scrollTrigger: { trigger: manifesto, start: "top 70%" },
                });

                // Big text line reveals (mask reveal)
                gsap.utils.toArray<HTMLElement>(".ml-wrap").forEach((wrap, i) => {
                    gsap.to(wrap.querySelector(".ml-inner"), {
                        y: 0, duration: 1.4, delay: 0.25 + i * 0.13, ease: "power3.out",
                        scrollTrigger: { trigger: manifesto, start: "top 65%" },
                    });
                });

                // Gold underline
                gsap.to(manifesto.querySelector(".mf-underline"), {
                    width: "clamp(120px,35vw,380px)", duration: 1.2, delay: 0.9, ease: "power3.out",
                    scrollTrigger: { trigger: manifesto, start: "top 65%" },
                });

                // Body columns
                gsap.to(manifesto.querySelector(".mf-body"), {
                    opacity: 1, y: 0, duration: 1.1, delay: 1.0, ease: "power2.out",
                    scrollTrigger: { trigger: manifesto, start: "top 65%" },
                });

                // Parallax ghost elements
                gsap.to(manifesto.querySelector(".mf-ghost"), {
                    y: 120, ease: "none",
                    scrollTrigger: { trigger: manifesto, start: "top bottom", end: "bottom top", scrub: 1.5 },
                });
                gsap.to(manifesto.querySelector(".mf-pg"), {
                    y: 70, ease: "none",
                    scrollTrigger: { trigger: manifesto, start: "top bottom", end: "bottom top", scrub: 1.5 },
                });
            }

            // ── METRICS ──
            const metrics = document.getElementById("metrics");
            if (metrics) {
                // Header reveal
                gsap.utils.toArray<HTMLElement>("#metrics .rv").forEach((el) => {
                    gsap.to(el, {
                        opacity: 1, y: 0, duration: 1, ease: "power2.out",
                        scrollTrigger: { trigger: el, start: "top 80%" },
                    });
                });

                // Metric rows stagger
                gsap.utils.toArray<HTMLElement>(".mr").forEach((el, i) => {
                    gsap.to(el, {
                        opacity: 1, y: 0, duration: 1.1, delay: i * 0.12, ease: "power3.out",
                        scrollTrigger: { trigger: el, start: "top 85%" },
                    });
                });

                // Count-up on scroll
                metrics.querySelectorAll("[data-target]").forEach((el) => {
                    const htmlEl = el as HTMLElement;
                    const target = parseInt(htmlEl.dataset.target || "0") || 0;
                    const suffix = htmlEl.dataset.suffix || "";
                    if (!target) return;

                    ScrollTrigger.create({
                        trigger: el,
                        start: "top 85%",
                        once: true,
                        onEnter: () => {
                            const obj = { val: 0 };
                            gsap.to(obj, {
                                val: target, duration: 2.2, ease: "power3.out",
                                onUpdate: () => {
                                    el.textContent = Math.round(obj.val) + suffix;
                                },
                            });
                        },
                    });
                });
            }

            // ── SERVICES ──
            gsap.utils.toArray<HTMLElement>("#services .rv").forEach((el) => {
                gsap.to(el, {
                    opacity: 1, y: 0, duration: 1, ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 80%" },
                });
            });
            gsap.utils.toArray<HTMLElement>(".sr").forEach((el, i) => {
                gsap.to(el, {
                    opacity: 1, y: 0, duration: 0.8, delay: i * 0.09, ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 88%" },
                });
            });

            // ── TRUST ──
            gsap.utils.toArray<HTMLElement>("#trust .rv").forEach((el) => {
                gsap.to(el, {
                    opacity: 1, y: 0, duration: 1, ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 80%" },
                });
            });
            gsap.utils.toArray<HTMLElement>(".tp").forEach((el, i) => {
                gsap.to(el, {
                    opacity: 1, x: 0, duration: 1, delay: i * 0.15, ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 85%" },
                });
            });

            // ── TESTIMONIALS ──
            gsap.utils.toArray<HTMLElement>("#testimonials .rv").forEach((el) => {
                gsap.to(el, {
                    opacity: 1, y: 0, duration: 1, ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 80%" },
                });
            });
            gsap.utils.toArray<HTMLElement>(".tcard").forEach((el, i) => {
                gsap.to(el, {
                    opacity: 1, y: 0, duration: 0.9, delay: i * 0.11, ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 88%" },
                });
            });

            // ── STUDIO ──
            gsap.utils.toArray<HTMLElement>("#studio .rv").forEach((el) => {
                gsap.to(el, {
                    opacity: 1, y: 0, duration: 1, ease: "power2.out",
                    scrollTrigger: { trigger: el, start: "top 80%" },
                });
            });

            // Sanskrit river parallax
            const river = document.querySelector(".studio-river-txt");
            if (river) {
                gsap.to(river, {
                    x: -200, ease: "none",
                    scrollTrigger: { trigger: "#studio", start: "top bottom", end: "bottom top", scrub: 2 },
                });
            }

            // ── CTA ──
            const cta = document.getElementById("cta");
            if (cta) {
                gsap.to(cta.querySelector(".cta-tag"), {
                    opacity: 1, duration: 1,
                    scrollTrigger: { trigger: cta, start: "top 70%" },
                });
                gsap.to(cta.querySelector(".cta-kick"), {
                    opacity: 1, duration: 1, delay: 0.1,
                    scrollTrigger: { trigger: cta, start: "top 70%" },
                });

                // CTA big text lines
                cta.querySelectorAll(".cta-lw").forEach((wrap, i) => {
                    gsap.to(wrap.querySelector(".cta-lt"), {
                        y: 0, duration: 1.3, delay: 0.25 + i * 0.12, ease: "power3.out",
                        scrollTrigger: { trigger: cta, start: "top 65%" },
                    });
                });

                // Gold rule
                gsap.to(cta.querySelector(".cta-rule"), {
                    width: "clamp(80px,26vw,260px)", duration: 1.4, delay: 1.1, ease: "power3.out",
                    scrollTrigger: { trigger: cta, start: "top 65%" },
                });

                gsap.to(cta.querySelector(".cta-body"), {
                    opacity: 1, y: 0, duration: 1.1, delay: 0.4,
                    scrollTrigger: { trigger: cta, start: "top 65%" },
                });
                gsap.to(cta.querySelector(".cta-btns"), {
                    opacity: 1, duration: 1, delay: 0.6,
                    scrollTrigger: { trigger: cta, start: "top 65%" },
                });
                gsap.to(cta.querySelector(".cta-footer-deva"), {
                    opacity: 1, duration: 2, delay: 0.9,
                    scrollTrigger: { trigger: cta, start: "top 65%" },
                });
            }
        });

        return () => ctx.revert();
    }, []);
}
