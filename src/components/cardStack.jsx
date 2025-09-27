"use client";
import { MapPin } from "lucide-react";
import React, { useState, useEffect } from "react";

const CARD_DATA = [
  { id: 0, title: "Card 1", content: "This is the first card." },
  { id: 1, title: "Card 2", content: "Here’s the second card." },
  { id: 2, title: "Card 3", content: "Third card content." }
];

const CARD_OUT_OFFSET = -120; // px to slide out
const CARD_STACK_OFFSET = 40; // px sticking out

export default function CardStack() {
  const [cards, setCards] = useState(CARD_DATA);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    let timeout;
    if (!animating) {
      timeout = setTimeout(() => setAnimating(true), 1600);
    }
    if (animating) {
      timeout = setTimeout(() => {
        setCards(prev =>
          [prev[1], prev[2], prev[0]]
        );
        setAnimating(false);
      }, 600);
    }
    return () => clearTimeout(timeout);
  }, [animating]);

  return (
    <div className="relative w-full max-w-md h-fit bg-yellow-100 mt-12">
      {cards.map((card, index) => {
        // animation states
        let classes =
          "absolute left-8 top-0 transition-all duration-500 ease-in-out bg-white rounded-lg shadow-lg border w-[300px] h-[400px] sm:w-[320px] sm:h-[420px] md:w-[330px] md:h-[480px]";
        let style = {};

        if (index === 0 && animating) {
          // top card animates off left and fades out
          classes += " opacity-0";
          style = {
            transform: `translateX(${CARD_OUT_OFFSET}px) scale(0.96)`,
            zIndex: 3
          };
        } else {
          style = {
            transform: `translateX(${index * CARD_STACK_OFFSET}px)  scale(${1 - index * 0.06})`,
            zIndex: 3 - index
          };
          if (index === 0) classes += " opacity-100";
        }

        return (
          <div
            key={card.id}
            className={classes}
            style={style}
          >
            <ProfileCard2/>
          </div>
        );
      })}
    </div>
  );
}

const ProfileCard2 = ({title='hey', location='NY'})=>{
  return(
    <>
      <div className="w-full h-full flex flex-col justify-end bg-slate-50 border-2 rounded-md">
        <div className="w-full h-fit flex flex-col gap-2 p-2">
          <span className="text-3xl font-bold ">{title}</span>
          <div className="flex items-center gap-2"><MapPin size={12} color="white"/> <span>{location}</span></div>
          <div className="w-full h-fit bg-rose-300 flex items-center justify-center font-medium text-white py-2 rounded-sm">
            View Profile
          </div>
        </div>
      </div>

    </>
  )
}