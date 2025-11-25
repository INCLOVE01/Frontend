import { Card, CardContent } from "../ui/card";
import { Quote, Star } from "lucide-react";

export function AboutTestimonials() {
  const testimonials = [
    {
      name: "Sarah M.",
      quote: "For the first time, I felt like a dating app was actually made for me. InClove understands that accessibility isn't an afterthought—it's essential.",
      rating: 5
    },
    {
      name: "James K.",
      quote: "I met my partner on InClove after years of feeling invisible on other platforms. This community gets it. People here see beyond disability.",
      rating: 5
    },
    {
      name: "Priya R.",
      quote: "The respect and authenticity on InClove is refreshing. I've made genuine friendships and found people who truly understand my journey.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-white">Stories From Our Community</h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Real connections, real stories, real love.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
              <CardContent className="pt-8 pb-6">
                <Quote className="w-10 h-10 text-pink-300 mb-4" />
                <p className="text-white/95 mb-6 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/80">— {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}