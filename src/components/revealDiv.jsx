"use client";
import React, { useRef, useState, useEffect } from "react";

export default function StableGrowOnScroll() {
  const ref = useRef(null);
  const lastScrollY = useRef(window.scrollY);
  const [progress, setProgress] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(true);

  useEffect(() => {
    if (!ref.current) return;

    // Intersection Observer setup
    const observer = new IntersectionObserver(
      ([entry]) => {
        // const rect = entry.boundingClientRect;
        // const windowHeight = window.innerHeight;

        // // Calculate raw progress (ratio of visible part of element)
        // const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        // let rawProgress = visibleHeight / rect.height;
        // rawProgress = Math.min(Math.max(rawProgress, 0), 1);

        // // Determine scroll direction
        // const currentScrollY = window.scrollY;
        // setScrollingDown(currentScrollY > lastScrollY.current);
        // lastScrollY.current = currentScrollY;

        // setProgress(prev => {
        //   if (scrollingDown) {
        //     // Scrolling down - progress grows only up to 1, clamp it
        //     return Math.min(rawProgress, 1);
        //   } else {
        //     // Scrolling up - progress shrinks down to 0 smoothly
        //     return Math.min(rawProgress, 1);
        //   }
        // });
        if(entry.isIntersecting){
            console.log('he')
        } else{
            console.log('bye')
        }
      },
      {
        root: null,
        threshold: Array.from({ length: 50 }, (_, i) => i / 50), // finer granularity
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // Clamp progress to control resizing:
  //  - grow only on scroll down (0 → 1)
  //  - keep fixed at full size (1) when scrolling down but div fully visible
  //  - shrink only when scrolling up (1 → 0)

  // Styling based on final controlled progress
  const clampedProgress = scrollingDown ? Math.min(progress, 1) : progress;

  const width = 100 + clampedProgress * (window.innerWidth - 100);
  const height = 100 + clampedProgress * (window.innerHeight - 100);
  const borderRadius = 16 * (1 - clampedProgress);

  return (
    <div className="relative w-full h-[200vh] flex justify-center items-start pt-24 bg-gray-100 overflow-hidden">
      <div
        ref={ref}
        className="bg-purple-700 text-white shadow-lg flex justify-center items-center"
        style={{
          width,
          height,
          borderRadius,
          transition: "width 0.1s linear, height 0.1s linear, border-radius 0.1s linear",
          willChange: "width, height, borderRadius",
        }}
      >
        <p className="select-none px-4 text-center text-xl">Stable Grow & Shrink Div</p>
      </div>
    </div>
  );
}
