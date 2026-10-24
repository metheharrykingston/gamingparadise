import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Hooks are scoped to the React root and cleaned up after route transitions.
export function useSiteMotion(scope, pathname) {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const mobile = window.matchMedia("(max-width: 700px)").matches;
      const select = gsap.utils.selector(scope);
      const lead = select(".hero .eyebrow, .hero h1, .hero-sub, .hero-actions, .hero-trust");
      if (lead.length) {
        gsap.from(lead, {
          autoAlpha: 0, y: mobile ? 14 : 25, stagger: 0.11,
          duration: mobile ? 0.55 : 0.8, ease: "power3.out", clearProps: "all"
        });
        gsap.from(select(".hero-visual"), {
          autoAlpha: 0, x: mobile ? 0 : 35, y: mobile ? 18 : 0,
          duration: 0.85, delay: 0.12, ease: "power3.out", clearProps: "all"
        });
      }
      const intro = select(".inner-hero .eyebrow, .inner-hero h1, .inner-hero-row > div, .form-intro, .pass-container > .section-label, .pass-container > h1, .privacy-page > .section-label, .privacy-page > h1");
      if (intro.length) gsap.from(intro, {
        autoAlpha: 0, y: 22, duration: 0.65, stagger: 0.09,
        ease: "power2.out", clearProps: "all"
      });
      const reveal = select(".section-head, .experience-card, .teaser-left, .member-card-graphic, .step-card, .faq-layout > div:first-child, .faq-item, .location-layout > div:first-child, .location-art, .plans-intro, .plan-card, .member-banner-inner, .perk, .form-box, .pass-card, .pass-details, .empty-pass, .privacy-copy");
      reveal.forEach((element, index) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: mobile ? 20 : 48,
          duration: mobile ? 0.55 : 0.8,
          delay: mobile ? 0 : (index % 3) * 0.035,
          ease: "power2.out", immediateRender: false, clearProps: "all",
          scrollTrigger: { trigger: element, start: mobile ? "top 96%" : "top 91%", once: true }
        });
      });
      if (!mobile) {
        const image = select(".hero-photo");
        if (image.length) gsap.to(image, {
          scale: 1.07, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
        });
        const card = select(".floating-play");
        if (card.length) gsap.to(card, {
          y: -9, duration: 2.7, repeat: -1, yoyo: true, ease: "sine.inOut"
        });
      }
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh, { once: true });
      requestAnimationFrame(refresh);
      return () => window.removeEventListener("load", refresh);
    });
    return () => media.revert();
  }, { scope, dependencies: [pathname], revertOnUpdate: true });
}
