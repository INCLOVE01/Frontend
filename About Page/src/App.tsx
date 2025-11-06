import { AboutHero } from "./components/AboutHero";
import { AboutMission } from "./components/AboutMission";
import { AboutStory } from "./components/AboutStory";
import { AboutFeatures } from "./components/AboutFeatures";
import { AboutTestimonials } from "./components/AboutTestimonials";
import { AboutCTA } from "./components/AboutCTA";

export default function App() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <AboutMission />
      <AboutStory />
      <AboutFeatures />
      <AboutTestimonials />
      <AboutCTA />
    </div>
  );
}