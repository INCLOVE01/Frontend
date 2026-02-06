'use client'

import { useState } from "react";
import { useWall } from "@/hooks/useWall";
import PostCard from "@/components/valentine-special/post-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatePostDialog from "@/components/valentine-special/createPostDialog"; // The form we discussed

export default function SelfLoveWall() {
  const [filter, setFilter] = useState('recent');
  const { data: posts, isLoading, isError } = useWall(filter);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-rose-600 italic">Self Love Wall</h1>
          <p className="text-slate-500">Share your light this Valentine's</p>
        </div>
        <CreatePostDialog />
      </header>

      <Tabs defaultValue="recent" onValueChange={setFilter} className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="recent">Recent Thoughts</TabsTrigger>
          <TabsTrigger value="likes">Most Loved</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Grid Layout for Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading && (
          // You can replace this with a Shadcn Skeleton later
          <p className="text-center col-span-2 py-10">Loading the wall...</p>
        )}

        {isError && (
          <p className="text-center col-span-2 text-red-500">Failed to load posts.</p>
        )}

        {!isLoading && posts?.length === 0 && (
          <p className="text-center col-span-2 py-10 text-slate-400">
            The wall is empty. Be the first to share!
          </p>
        )}

        {posts?.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}