"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import styles from "./ScrollFrameHero.module.css";

const FRAME_COUNT = 381;
const LAST_INDEX = FRAME_COUNT - 1;

type Props = {
  children: ReactNode;
  /** URL prefix without trailing slash, e.g. "/animation" */
  animationBase?: string;
};

function frameSrc(base: string, index: number) {
  const n = String(index + 1).padStart(4, "0");
  return `${base.replace(/\/$/, "")}/${n}.jpg`;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobileLayout() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 900px)").matches
  );
}

function strideForViewport() {
  if (isMobileLayout()) return 3;
  if (window.innerWidth >= 1100) return 2;
  return 1;
}

function buildFrameIndices(stride: number): number[] {
  if (stride <= 1) return Array.from({ length: FRAME_COUNT }, (_, i) => i);
  const out: number[] = [];
  for (let i = 0; i < FRAME_COUNT; i += stride) out.push(i);
  if (out[out.length - 1] !== LAST_INDEX) out.push(LAST_INDEX);
  return out;
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) {
  const iw = image.naturalWidth || image.width;
  const ih = image.naturalHeight || image.height;
  if (iw <= 0 || ih <= 0) return;
  const ir = iw / ih;
  const wr = width / height;
  let sx = 0;
  let sy = 0;
  let sw = iw;
  let sh = ih;
  if (ir > wr) {
    sx = (iw - sh * wr) * 0.5;
    sw = sh * wr;
  } else {
    sy = (ih - sw / wr) * 0.5;
    sh = sw / wr;
  }
  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, width, height);
}

function resolveLoadedFrameIndex(target: number, images: (HTMLImageElement | null)[]) {
  const t = Math.max(0, Math.min(LAST_INDEX, Math.round(target)));
  const ok = (i: number) => {
    const img = images[i];
    return !!(img?.complete && (img.naturalWidth || img.width) > 0);
  };
  if (ok(t)) return t;
  for (let d = 1; d < FRAME_COUNT; d += 1) {
    const lo = t - d;
    if (lo >= 0 && ok(lo)) return lo;
    const hi = t + d;
    if (hi < FRAME_COUNT && ok(hi)) return hi;
  }
  return -1;
}

export function ScrollFrameHero({ children, animationBase = "/animation" }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [framesReady, setFramesReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const reduced = prefersReducedMotion();
    const stride = strideForViewport();
    const indices = buildFrameIndices(stride);
    const prefetchHead = isMobileLayout() ? 16 : 28;
    const images: (HTMLImageElement | null)[] = Array(FRAME_COUNT).fill(null);
    imagesRef.current = images;

    const markReady = (idx: number) => {
      if (!cancelled && idx === 0) setFramesReady(true);
    };

    if (reduced) {
      const img = new Image();
      img.decoding = "async";
      if ("fetchPriority" in img)
        (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = "high";
      img.src = frameSrc(animationBase, 0);
      img.onload = () => {
        if (!cancelled) {
          images[0] = img;
          markReady(0);
        }
      };
      img.onerror = () => markReady(0);
      return () => {
        cancelled = true;
      };
    }

    const queueHead = indices.slice(0, prefetchHead);
    const queueTail = indices.slice(prefetchHead);
    let inflight = 0;
    let tailUnlocked = false;
    const maxConcurrent = 8;

    const pump = () => {
      while (!cancelled && inflight < maxConcurrent) {
        if (queueHead.length > 0) {
          loadOne(queueHead.shift()!);
          continue;
        }
        if (tailUnlocked && queueTail.length > 0) {
          loadOne(queueTail.shift()!);
          continue;
        }
        break;
      }
    };

    const loadOne = (frameIndex: number) => {
      inflight++;
      const img = new Image();
      img.decoding = "async";
      if ("fetchPriority" in img) {
        (img as HTMLImageElement & { fetchPriority: string }).fetchPriority =
          frameIndex <= 12 * stride ? "high" : "low";
      }
      img.src = frameSrc(animationBase, frameIndex);
      const done = () => {
        if (cancelled) return;
        inflight--;
        if (img.complete && img.naturalWidth > 0) images[frameIndex] = img;
        markReady(frameIndex);
        pump();
      };
      img.onload = done;
      img.onerror = done;
    };

    pump();
    const unlockTail = () => {
      if (!cancelled && !tailUnlocked) {
        tailUnlocked = true;
        pump();
      }
    };
    const t = window.setTimeout(unlockTail, 900);
    window.addEventListener("scroll", unlockTail, { passive: true, once: true });
    window.addEventListener("pointerdown", unlockTail, { passive: true, once: true });

    return () => {
      cancelled = true;
      window.clearTimeout(t);
      window.removeEventListener("scroll", unlockTail);
      window.removeEventListener("pointerdown", unlockTail);
    };
  }, [animationBase]);

  const paintFrame = useCallback((rawIndex: number) => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const mobile = isMobileLayout();
    const stride = strideForViewport();
    const rounded = Math.max(0, Math.min(LAST_INDEX, Math.round(rawIndex)));
    const decimated =
      stride <= 1 ? rounded : Math.min(LAST_INDEX, Math.round(rounded / stride) * stride);

    const frameIdx = resolveLoadedFrameIndex(decimated, imagesRef.current);
    if (frameIdx < 0) return;

    const img = imagesRef.current[frameIdx];
    if (!img) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = mobile ? "medium" : "high";
    ctx.clearRect(0, 0, w, h);
    drawImageCover(ctx, img, w, h);
  }, []);

  useLayoutEffect(() => {
    if (!framesReady) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const reduced = prefersReducedMotion();
    const mobile = isMobileLayout();

    let rafDraw = 0;
    let rafScroll = 0;
    let pendingFrame = 0;

    const flushDraw = () => {
      rafDraw = 0;
      paintFrame(pendingFrame);
    };

    const scrollProgress = () => {
      const vh = window.visualViewport?.height ?? window.innerHeight;
      const range = section.offsetHeight - vh;
      if (range <= 1) return 1;
      const top = section.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, Math.max(0, -top) / range));
      return p;
    };

    const syncVideo = (p: number) => {
      const v = videoRef.current;
      if (!v || !mobile || reduced) return;
      const dur = v.duration;
      if (!Number.isFinite(dur) || dur <= 0) return;
      const t = dur * p;
      if (Math.abs(v.currentTime - t) > 0.05) v.currentTime = t;
    };

    const onScroll = () => {
      if (rafScroll) return;
      rafScroll = requestAnimationFrame(() => {
        rafScroll = 0;
        tick();
      });
    };

    const tick = () => {
      if (reduced) {
        paintFrame(0);
        return;
      }
      const p = scrollProgress();
      const frame = LAST_INDEX * p;

      if (mobile) {
        if (rafDraw) cancelAnimationFrame(rafDraw);
        rafDraw = 0;
        paintFrame(frame);
        syncVideo(p);
        return;
      }

      pendingFrame = frame;
      if (!rafDraw) rafDraw = requestAnimationFrame(flushDraw);
    };

    const onResize = () => {
      if (reduced) paintFrame(0);
      else tick();
    };

    paintFrame(0);

    window.addEventListener("resize", onResize);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", onResize);
    vv?.addEventListener("scroll", onResize);

    if (!reduced) {
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    }

    const onVis = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVis);

    const vid = videoRef.current;
    const kick = () => tick();
    vid?.addEventListener("loadedmetadata", kick);
    vid?.addEventListener("canplay", kick);

    requestAnimationFrame(() => requestAnimationFrame(tick));

    return () => {
      window.removeEventListener("resize", onResize);
      vv?.removeEventListener("resize", onResize);
      vv?.removeEventListener("scroll", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("visibilitychange", onVis);
      vid?.removeEventListener("loadedmetadata", kick);
      vid?.removeEventListener("canplay", kick);
      if (rafDraw) cancelAnimationFrame(rafDraw);
      if (rafScroll) cancelAnimationFrame(rafScroll);
    };
  }, [framesReady, paintFrame]);

  return (
    <section ref={sectionRef} className={styles.root}>
      <div className={styles.sticky}>
        <div className={styles.media} aria-hidden>
          <video
            ref={videoRef}
            className={styles.video}
            src={`${animationBase.replace(/\/$/, "")}/mobile-hero.mp4`}
            preload="auto"
            muted
            playsInline
            aria-hidden
          />
          <canvas ref={canvasRef} className={styles.canvas} />
        </div>
        <div className={styles.overlay}>{children}</div>
      </div>
      {/* Scroll distance ≈ как на general-site: длинная «плёнка» кадров */}
      <div className={`${styles.spacer} h-[min(280vh,4200px)]`} aria-hidden />
    </section>
  );
}
