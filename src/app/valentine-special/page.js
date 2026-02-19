'use client'

import { useState } from "react";
import { useWall } from "@/hooks/useWall";
import PostCard, { PostSkeleton } from "@/components/valentine-special/post-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MessageSquareQuote, Loader2 } from "lucide-react";
import CreatePostDialog from "@/components/valentine-special/createPostDialog";
import { useLocalStats } from "@/hooks/useLocalStat";

export default function SelfLoveWall() {
  const [filter, setFilter] = useState('recent');
  const [page, setPage] = useState(1);
  const postsPerPage = 10;

  const { data, isLoading, isError, isFetching } = useWall(filter, page, postsPerPage);
  const stats = useLocalStats(data?.globalLikes, data?.totalCount);
  
  const posts = data?.posts || [];
  const totalPages = Math.ceil((data?.totalCount || 0) / postsPerPage);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-rose-100">
      <div className="max-w-5xl mx-auto p-6 lg:p-12 space-y-12">
        
        {/* PREMIUM HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Wall Of <span className="text-rose-400">Love</span>
            </h1>
            <p className="text-slate-500 max-w-md leading-snug">
              A sanctuary for shared light and self-affirmation. Anonymous, safe, and supportive.
            </p>
          </div>
          <div className="w-full max-w-md h-fit flex items-center">
            <div className="w-full h-fit flex items-center justify-evenly md:gap-2 md:justify-end gap-4">

              <div className="w-fit h-fit flex flex-row items-center gap-2 ">
                <div className="w-fit h-fit flex flex-col gap-1  bg-rose-50 rounded-md p-2  outline outline-rose-200">
                  <span className="text-lg font-medium text-rose-500 flex flex-row items-center md:text-xl"> 
                    {isFetching && posts.length > 0 ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {stats?.displayLikes || 0}
                  </span>
                  <span className="text-sm text-muted-foreground"> Total Loves</span>
                </div>
                <div className="w-fit h-fit flex flex-col gap-1 bg-muted rounded-md p-2 border">
                  <span className="text-lg font-medium md:text-xl">{stats?.displayPosts || 0}</span>
                  <span className="text-sm text-muted-foreground">Thoughts shared</span>
                </div>
              </div>
              <CreatePostDialog />
            </div>
          </div>
        </header>

        {/* TABS & FILTERS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Tabs defaultValue="recent" onValueChange={(val) => {
            setFilter(val);
            setPage(1); // Reset to page 1 on filter change
          }} className="w-full sm:w-auto">
            <TabsList className="bg-slate-100 p-1 border border-slate-200 rounded-lg">
              <TabsTrigger value="recent" className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Recent
              </TabsTrigger>
              <TabsTrigger value="likes" className="px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Most Loved
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* POSTS GRID */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-500 ${isFetching ? 'opacity-70' : 'opacity-100'}`}>
          {/* Show skeletons on initial load or if page is empty and fetching */}
          {(isLoading || (isFetching && posts.length === 0)) && (
            Array(postsPerPage).fill(0).map((_, i) => <PostSkeleton key={i} />)
          )}

          {isError && (
            <div className="col-span-full py-20 text-center bg-white border border-dashed rounded-2xl">
              <p className="text-slate-500 font-medium">Unable to connect to the wall. Please refresh.</p>
            </div>
          )}

          {/* EMPTY STATE */}
          {!isLoading && posts.length === 0 && !isFetching && (
            <div className="col-span-full py-24 flex flex-col items-center justify-center space-y-4 bg-white rounded-3xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4">
              <div className="p-4 bg-slate-50 rounded-full">
                <MessageSquareQuote className="w-10 h-10 text-slate-300" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900">The wall is quiet...</h3>
                <p className="text-slate-500 text-sm">Be the first to share your thought and light up this space.</p>
              </div>
              <CreatePostDialog />
            </div>
          )}

          {/* RENDER POSTS */}
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>

        {/* PAGINATION COMPONENT */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-12">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || isFetching}
              className="rounded-xl border-slate-200 hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">{page}</span>
              <span className="text-sm text-slate-400">/</span>
              <span className="text-sm text-slate-400">{totalPages}</span>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || isFetching}
              className="rounded-xl border-slate-200 hover:bg-slate-50"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}