import { Button } from "./ui/button";
import { Heart, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutCTA() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1736615494551-234dde339853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFydCUyMGhhbmRzJTIwbG92ZXxlbnwxfHx8fDE3NjE0MDU1MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Love and connection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-pink-900/85 to-purple-900/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <Heart className="w-16 h-16 mx-auto mb-6 text-pink-300 fill-pink-300" />
        <h2 className="mb-6 text-white">Your Journey Starts Here</h2>
        <p className="text-xl text-white/95 mb-4 max-w-2xl mx-auto leading-relaxed">
          Join a community where you're celebrated for who you are.
        </p>
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
          Find friendship, romance, and genuine human connection in a space designed 
          with accessibility, respect, and inclusivity at its core.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-purple-700 hover:bg-gray-100 gap-2 shadow-xl hover:shadow-2xl transition-all"
          >
            Join InClove <ArrowRight className="w-5 h-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50 gap-2"
          >
            Learn More
          </Button>
        </div>
        <p className="text-white/70 mt-8 text-sm">
          Free to join • Safe & Inclusive • 10,000+ Members
        </p>
      </div>
    </section>
  );
}
