// app/home/components/ProfileDisplay.js
"use client";

import { useProfile } from "@/hooks/use-profile";

export default function ProfileDisplay() {
  // Pull data from the TanStack Query cache
  const { data: profile, isLoading, isError } = useProfile();

  // Loading state (fallback for client-side navigation)
  if (isLoading) {
    return (
      <div className="animate-pulse flex flex-col gap-4 p-4 border rounded-xl">
        <div className="h-12 w-12 bg-gray-200 rounded-full" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        Could not load profile. Please try logging in again.
      </div>
    );
  }

  return (
    <section className="p-6 bg-white shadow-sm border rounded-2xl max-w-md">
      <div className="flex items-center gap-4 mb-4">
        {/* Placeholder for Profile Pic */}
        <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
          {profile?.name?.charAt(0)}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{profile?.name}</h2>
          <p className="text-gray-500">{profile?.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Gender</span>
          <span className="font-medium capitalize">{profile?.gender}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Interested in</span>
          <span className="font-medium capitalize">{profile?.preference}</span>
        </div>
        
        <div className="pt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Bio</h3>
          <p className="text-gray-600 text-sm italic">
            "{profile?.bio || "No bio yet. Tell the world about yourself!"}"
          </p>
        </div>
      </div>
    </section>
  );
}