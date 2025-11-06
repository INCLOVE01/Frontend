import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1666213302169-741d8a9597db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY291cGxlcyUyMGxvdmV8ZW58MXx8fHwxNzYxNDk4NTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Diverse couples in love"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 via-pink-900/60 to-purple-900/80" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-8 border-2 border-white/20">
          <Heart className="w-10 h-10 text-pink-300 fill-pink-300" />
        </div>
        <h1 className="mb-6">Love Knows No Limits</h1>
        <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed">
          InClove is redefining dating by creating a space where everyone—regardless of ability—can find genuine connection, companionship, and love.
        </p>
        <p className="text-lg text-white/80 mt-6 max-w-2xl mx-auto">
          Because everyone deserves to be loved for who they are.
        </p>
      </div>
    </section>
  );
}
