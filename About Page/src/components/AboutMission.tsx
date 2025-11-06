import { Heart, Users, Shield, Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function AboutMission() {
  const values = [
    {
      icon: Heart,
      title: "Inclusive by Design",
      description: "We believe love is universal. Our platform is built from the ground up to be accessible, welcoming, and empowering for people of all abilities.",
      color: "bg-pink-100 text-pink-600"
    },
    {
      icon: Users,
      title: "Genuine Connections",
      description: "Beyond swiping, we foster meaningful relationships through authentic profiles, thoughtful matching, and a community that celebrates diversity.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Shield,
      title: "Safe & Respectful",
      description: "Your safety and dignity matter. We maintain a zero-tolerance policy for discrimination and provide tools to ensure a respectful environment.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Sparkles,
      title: "Breaking Barriers",
      description: "We challenge stigmas and break down the barriers that have kept people with disabilities from accessing mainstream dating platforms.",
      color: "bg-amber-100 text-amber-600"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white via-purple-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4">Our Mission & Values</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            InClove was created to fill a gap in the dating world—a platform that truly understands 
            and celebrates the diversity of human experience and ability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-8 pb-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${value.color} mb-6`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="mb-3">{value.title}</h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
