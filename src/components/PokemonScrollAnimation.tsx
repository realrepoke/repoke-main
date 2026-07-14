import { useEffect, useRef } from "react";
import "../animation.css";

/**
 * REPOKE scroll animation — v3.0.0.
 * DOM structure and scroll logic are ported 1:1 from the delivered
 * repoke-scroll-animation-final-v3.0.0 bundle. Only asset paths were
 * rewritten to /animation/assets/. Artwork, proportions, masks and
 * animation behaviour are unchanged.
 */
export function PokemonScrollAnimation() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const story = root.querySelector<HTMLElement>(".story");
    const stage = root.querySelector<HTMLElement>(".stage");
    const scene = root.querySelector<HTMLElement>(".scene");
    const box = root.querySelector<HTMLElement>(".box");
    const boxShadow = root.querySelector<HTMLElement>(".box-shadow");
    const exitShadow = root.querySelector<HTMLElement>(".exit-shadow");
    const front = root.querySelector<HTMLElement>(".front-assembly");
    const middle = root.querySelector<HTMLElement>(".middle-assembly");
    const back = root.querySelector<HTMLElement>(".back-assembly");
    const finalCollection = root.querySelector<HTMLElement>(".final-collection");
    const collectionSheen = root.querySelector<HTMLElement>(".collection-sheen");
    const progressFill = root.querySelector<HTMLElement>(".progress-fill");
    const phaseNumber = root.querySelector<HTMLElement>(".phase-number");
    const phaseText = root.querySelector<HTMLElement>(".phase-text");

    if (!story || !stage || !scene || !box || !front || !middle || !back || !finalCollection) return;

    const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const smoothstep = (t: number) => t * t * (3 - 2 * t);
    const smooth = (s: number, e: number, v: number) => {
      if (s === e) return v >= e ? 1 : 0;
      return smoothstep(clamp((v - s) / (e - s)));
    };
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const phases = [
      { at: 0, number: "01", text: "Die Box" },
      { at: 0.16, number: "02", text: "Die Vordergrundkarten" },
      { at: 0.52, number: "03", text: "Die Hauptkarten dahinter" },
      { at: 0.72, number: "04", text: "Die Hintergrundreihe" },
      { at: 0.93, number: "05", text: "Die komplette Sammlung" },
    ];

    let currentPhase = -1;
    let latestProgress = 0;
    let ticking = false;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pointerFrame = 0;

    const setPhase = (progress: number) => {
      let index = 0;
      phases.forEach((phase, i) => {
        if (progress >= phase.at) index = i;
      });
      if (index === currentPhase) return;
      currentPhase = index;
      if (phaseNumber) phaseNumber.textContent = phases[index].number;
      if (phaseText) phaseText.textContent = phases[index].text;
    };

    type LayerCfg = {
      opacity: number;
      scale: number;
      rotateX: number;
      rotateY?: number;
      rotateZ?: number;
      z: number;
      shadowY: number;
      shadowBlur: number;
      shadowAlpha: number;
    };

    const setLayer = (el: HTMLElement, c: LayerCfg) => {
      const rY = c.rotateY ?? 0;
      const rZ = c.rotateZ ?? 0;
      el.style.opacity = c.opacity.toFixed(4);
      el.style.transform = [
        `translate3d(0, 0, ${c.z.toFixed(2)}px)`,
        `rotateX(${c.rotateX.toFixed(2)}deg)`,
        `rotateY(${rY.toFixed(2)}deg)`,
        `rotateZ(${rZ.toFixed(2)}deg)`,
        `scale(${c.scale.toFixed(4)})`,
      ].join(" ");
      el.style.filter = `drop-shadow(0 ${c.shadowY.toFixed(2)}rem ${c.shadowBlur.toFixed(2)}rem rgba(52, 35, 22, ${c.shadowAlpha.toFixed(3)}))`;
    };

    const render = (progress: number) => {
      const p = clamp(progress);
      const size = scene.getBoundingClientRect().width;
      setPhase(p);

      if (progressFill) progressFill.style.transform = `scaleY(${p.toFixed(4)})`;

      const boxWake = smooth(0.02, 0.16, p);
      const boxLift = smooth(0.14, 0.58, p);
      const boxExit = smooth(0.56, 0.76, p);
      const boxY = lerp(0, -0.275 * size, easeOutCubic(boxLift)) + lerp(0, -0.24 * size, boxExit);
      const boxScale = lerp(1, 0.91, boxLift) * lerp(1, 0.82, boxExit);
      const boxOpacity = 1 - smooth(0.59, 0.755, p);

      box.style.opacity = boxOpacity.toFixed(4);
      box.style.transform = [
        "translate(-50%, -50%)",
        `translate3d(0, ${boxY.toFixed(2)}px, 125px)`,
        `rotateX(${lerp(0, 2.8, boxWake).toFixed(2)}deg)`,
        `rotateY(${lerp(0, -1.8, boxWake).toFixed(2)}deg)`,
        `rotateZ(${lerp(0, -0.7, boxLift).toFixed(2)}deg)`,
        `scale(${boxScale.toFixed(4)})`,
      ].join(" ");

      if (boxShadow) {
        boxShadow.style.opacity = (boxOpacity * lerp(0.76, 0.22, boxLift)).toFixed(4);
        boxShadow.style.transform = `translate(-50%, -50%) translate3d(${(-0.012 * size * boxLift).toFixed(2)}px, ${(boxY * 0.72).toFixed(2)}px, 0) rotate(-4deg) scale(${lerp(1, 0.7, boxExit).toFixed(4)})`;
      }

      const emergenceShadow = smooth(0.14, 0.3, p) * (1 - smooth(0.51, 0.68, p));
      if (exitShadow) {
        exitShadow.style.opacity = (emergenceShadow * 0.86).toFixed(4);
        exitShadow.style.transform = `translate(-50%, -50%) translate3d(0, ${(boxY * 0.82).toFixed(2)}px, 116px) scaleX(${lerp(0.42, 1.18, smooth(0.14, 0.48, p)).toFixed(4)})`;
      }

      const frontIn = smooth(0.145, 0.575, p);
      const middleIn = smooth(0.535, 0.785, p);
      const backIn = smooth(0.705, 0.915, p);
      const finalBlend = smooth(0.935, 0.985, p);
      const assemblyOpacity = 1 - finalBlend;

      setLayer(front, {
        opacity: smooth(0.15, 0.235, p) * assemblyOpacity,
        scale: lerp(0.22, 1, easeOutCubic(frontIn)),
        rotateX: lerp(15, 0, easeOutCubic(frontIn)),
        rotateY: lerp(-3.2, 0, frontIn),
        rotateZ: lerp(0.8, 0, frontIn),
        z: lerp(18, 56, frontIn),
        shadowY: lerp(0.32, 1.05, frontIn),
        shadowBlur: lerp(0.32, 0.9, frontIn),
        shadowAlpha: lerp(0.09, 0.2, frontIn),
      });

      setLayer(middle, {
        opacity: smooth(0.54, 0.64, p) * assemblyOpacity,
        scale: lerp(0.65, 1, easeOutCubic(middleIn)),
        rotateX: lerp(12, 0, easeOutCubic(middleIn)),
        rotateY: lerp(2.2, 0, middleIn),
        rotateZ: lerp(-0.55, 0, middleIn),
        z: lerp(8, 38, middleIn),
        shadowY: lerp(0.24, 0.86, middleIn),
        shadowBlur: lerp(0.3, 0.78, middleIn),
        shadowAlpha: lerp(0.07, 0.16, middleIn),
      });

      setLayer(back, {
        opacity: smooth(0.71, 0.81, p) * assemblyOpacity,
        scale: lerp(0.985, 1, easeOutCubic(backIn)),
        rotateX: lerp(6, 0, easeOutCubic(backIn)),
        rotateY: 0,
        rotateZ: 0,
        z: lerp(0, 22, backIn),
        shadowY: lerp(0.16, 0.62, backIn),
        shadowBlur: lerp(0.25, 0.68, backIn),
        shadowAlpha: lerp(0.04, 0.11, backIn),
      });
      const backMask = (1 - backIn) * 50;
      back.style.clipPath = `inset(0 ${backMask.toFixed(3)}% 0 ${backMask.toFixed(3)}%)`;

      finalCollection.style.opacity = finalBlend.toFixed(4);
      finalCollection.style.transform = `translate3d(0, 0, 70px) rotateX(${lerp(1.4, 0, finalBlend).toFixed(2)}deg) scale(${lerp(0.992, 1, finalBlend).toFixed(4)})`;

      if (collectionSheen) {
        const sheen = smooth(0.955, 1, p);
        collectionSheen.style.opacity = (Math.sin(sheen * Math.PI) * 0.14).toFixed(4);
        collectionSheen.style.transform = `translate3d(${lerp(-48, 48, sheen).toFixed(2)}%, 0, 76px)`;
      }

      const sceneBreath = smooth(0.36, 0.93, p);
      scene.style.setProperty("--scene-scale", lerp(1.015, 1, sceneBreath).toFixed(4));
    };

    const calculateProgress = () => {
      const rect = story.getBoundingClientRect();
      const scrollable = Math.max(1, story.offsetHeight - window.innerHeight);
      latestProgress = clamp(-rect.top / scrollable);
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          render(latestProgress);
          ticking = false;
        });
      }
    };

    const animatePointer = () => {
      pointerX = lerp(pointerX, pointerTargetX, 0.09);
      pointerY = lerp(pointerY, pointerTargetY, 0.09);
      scene.style.setProperty("--pointer-x", pointerX.toFixed(3));
      scene.style.setProperty("--pointer-y", pointerY.toFixed(3));
      if (Math.abs(pointerTargetX - pointerX) > 0.01 || Math.abs(pointerTargetY - pointerY) > 0.01) {
        pointerFrame = window.requestAnimationFrame(animatePointer);
      } else {
        pointerFrame = 0;
      }
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      pointerTargetX = clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1) * 1.15;
      pointerTargetY = clamp((event.clientY - rect.top) / rect.height * 2 - 1, -1, 1) * 0.9;
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(animatePointer);
    };

    const resetPointer = () => {
      pointerTargetX = 0;
      pointerTargetY = 0;
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(animatePointer);
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!reducedMotion.matches) {
      window.addEventListener("scroll", calculateProgress, { passive: true });
      window.addEventListener("resize", calculateProgress);
      stage.addEventListener("pointermove", updatePointer as EventListener, { passive: true });
      stage.addEventListener("pointerleave", resetPointer as EventListener, { passive: true });
      calculateProgress();
    } else {
      render(1);
    }

    return () => {
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
      stage.removeEventListener("pointermove", updatePointer as EventListener);
      stage.removeEventListener("pointerleave", resetPointer as EventListener);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
    };
  }, []);

  return (
    <div ref={rootRef} className="repoke-anim">
      <section className="story" id="animation" aria-label="Scrollgesteuerte Animation der REPOKE-Kartensammlung">
        <div className="stage">
          <div className="ambient ambient-left" aria-hidden="true" />
          <div className="ambient ambient-right" aria-hidden="true" />

          <div className="scene" aria-hidden="true">
            <div className="scene-tilt">
              <div className="collection-stack">
                <img className="assembly back-assembly" src="/animation/assets/back-cards.png" alt="" width={1600} height={1594} decoding="async" />
                <img className="assembly middle-assembly" src="/animation/assets/middle-cards.png" alt="" width={1600} height={1594} decoding="async" />
                <img className="assembly front-assembly" src="/animation/assets/front-cards.png" alt="" width={1600} height={1594} decoding="async" />
                <img className="final-collection" src="/animation/assets/cards-collection.png" alt="" width={1600} height={1594} decoding="async" />
                <div className="collection-sheen" aria-hidden="true" />
              </div>

              <div className="box-shadow" aria-hidden="true" />
              <div className="exit-shadow" aria-hidden="true" />
              <img className="box" src="/animation/assets/box.png" alt="" width={623} height={866} decoding="async" />
            </div>
          </div>

          <div className="phase-label" aria-live="polite">
            <span className="phase-number">01</span>
            <span className="phase-text">Die Box</span>
          </div>

          <div className="progress" aria-hidden="true">
            <span className="progress-fill" />
          </div>
        </div>
      </section>
    </div>
  );
}
