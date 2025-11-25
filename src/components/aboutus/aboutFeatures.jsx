import { Accessibility, MessageCircle, UserCheck, Lock, Volume2, Eye } from "lucide-react";

export function AboutFeatures() {
  const features = [
    {
      icon: Accessibility,
      title: "Accessibility First",
      description: "Screen reader optimized, keyboard navigation, adjustable text sizes, and high contrast modes built in from day one."
    },
    {
      icon: UserCheck,
      title: "Verified Profiles",
      description: "Optional verification system to help build trust while respecting privacy and individual comfort levels."
    },
    {
      icon: MessageCircle,
      title: "Thoughtful Matching",
      description: "Go beyond photos. Share your interests, values, and what makes you unique to find compatible connections."
    },
    {
      icon: Lock,
      title: "Privacy Controls",
      description: "You decide what to share and when. Full control over your profile visibility and personal information."
    },
    {
      icon: Volume2,
      title: "Multiple Communication",
      description: "Text, voice messages, video calls—communicate in the way that works best for you."
    },
    {
      icon: Eye,
      title: "Anti-Discrimination",
      description: "Active moderation and reporting tools ensure a respectful community where everyone feels safe."
    }
  ];

return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4">Built Different, Built Better</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every feature is designed with accessibility, safety, and genuine connection in mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="mb-2">{feature.title}</h4>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}