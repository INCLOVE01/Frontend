import Image from "next/image";
import { Quote } from "lucide-react";

export function AboutStory() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-6">
              Our Story
            </div>
            <h2 className="mb-6">Why InClove Exists</h2>
            <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
              <p>
                Dating apps have revolutionized how people meet and connect, but they've 
                left millions behind. People with disabilities face unique challenges—from 
                inaccessible interfaces to discrimination and stigma on mainstream platforms.
              </p>
              <p>
                InClove was born from a simple realization: everyone deserves the opportunity 
                to find love, companionship, and meaningful connection. We're not just another 
                dating app—we're a community built on understanding, respect, and celebration 
                of diversity.
              </p>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">
                <Quote className="w-8 h-8 text-purple-500 mb-3" />
                <p className="text-gray-800 italic">
                  "We believe that disability doesn't define a person's capacity to love or 
                  be loved. InClove creates a space where authenticity is celebrated and 
                  connections are built on who you truly are."
                </p>
              </div>
              <p>
                Today, we're proud to serve a growing community of people who are finding 
                friendship, romance, and genuine human connection in a space designed with 
                their needs at the forefront.
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1553989577-14e950184619?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmNsdXNpdmUlMjBjb21tdW5pdHklMjBwZW9wbGV8ZW58MXx8fHwxNzYxNDk4NTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Inclusive community"
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              width={400}
              height={400}
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6 rounded-xl text-white">
                <div className="mb-2">10,000+</div>
                <p className="text-white/90">Active Members</p>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-6 rounded-xl text-white">
                <div className="mb-2">2,500+</div>
                <p className="text-white/90">Connections Made</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}