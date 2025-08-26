'use client'
import React from "react";

const InfiniteCarouselCSS = ({ items, itemWidth = 300 }) => {
  return (
    <div
      className="overflow-hidden select-none"
      style={{ width: `${itemWidth * 3}px` }} // visible area for 3 items
    >
      <div
        className="flex whitespace-nowrap animate-scroll gap-1"
        style={{ width: `${items.length * 2 * itemWidth}px` }}
      >
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 border rounded-md flex items-center justify-center text-2xl font-semibold"
            style={{ width: `${itemWidth}px`, height: "200px" }}
          >
            {item}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default function App() {
  const sampleItems = ["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5"];

  return (
    <div className=" p-6 flex flex-col justify-center">
      <h2 className="text-center text-2xl font-bold mb-6">
        Connecting happy memories
      </h2>
      <div className="relative w-full">
        <InfiniteCarouselCSS items={sampleItems} />

        <div className="pointer-events-none absolute top-0 left-0 h-full w-16" style={{
          background:
            "linear-gradient(to right, white, rgba(255,255,255,0))",
          zIndex: 10,}}></div>
        <div className="pointer-events-none absolute bg-red-400top-0 right-0 h-full w-16" style={{
        background:
          "linear-gradient(to right, white, rgba(255,255,255,0))",
        zIndex: 10,}}></div>

  
      </div>
    </div>
  );
}
