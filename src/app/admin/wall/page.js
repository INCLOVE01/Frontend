import { supabase } from "@/lib/supabase";
import { deletePost } from "@/app/actions/wallActions";
import PostCard from "@/components/valentine-special/post-card"; // Your existing component
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default async function AdminWallPage() {
  // Fetch all posts directly on the server
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin: Moderate Wall</h1>
      
      <div className="grid gap-6">
        {posts?.map((post) => (
          <div key={post.id} className="relative group border rounded-lg p-2">
            <PostCard {...post} />
            
            {/* Admin Delete Action */}
            <form action={async () => {
              'use server';
              await deletePost(post.id);
            }} className="absolute top-4 right-4">
              <Button variant="destructive" size="sm" className="gap-2">
                <Trash2 size={16} /> Delete Post
              </Button>
            </form>
            
            <div className="mt-2 px-4 pb-2 text-xs text-slate-400">
              User Email: {post.email} (Hidden from public)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}