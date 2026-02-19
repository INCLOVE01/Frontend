
'use client'
import { useState, createContext, useContext } from 'react';
import confetti from 'canvas-confetti';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


const MilestoneContext = createContext();

export function MilestoneProvider({ children }) {
  const [milestone, setMilestone] = useState(null);

  const triggerMilestone = (type) => {
    const rewards = {
      FIRST_POST: { title: "Thought Shared!", desc: "Your light is now on the wall.", icon: "✨" },
      FIRST_LIKE: { title: "Spreading Love!", desc: "You just gave your first affirmation.", icon: "❤️" },
      WELCOME: { title: "Welcome Home!", desc: "You're officially an Early Member.", icon: "🏠" }
    };

    if (rewards[type]) {
      setMilestone(rewards[type]);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#fb7185', '#fda4af'] });
    }
  };

  return (
    <MilestoneContext.Provider value={{ triggerMilestone }}>
      {children}
      <Dialog open={!!milestone} onOpenChange={() => setMilestone(null)}>
        <DialogContent className="text-center sm:max-w-[400px]">
          <div className="text-6xl mb-4">{milestone?.icon}</div>
          <DialogTitle className="text-2xl font-bold">{milestone?.title}</DialogTitle>
          <p className="text-slate-500">{milestone?.desc}</p>
        </DialogContent>
      </Dialog>
    </MilestoneContext.Provider>
  );
}

export const useMilestones = () => useContext(MilestoneContext);