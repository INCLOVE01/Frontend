'use client'

import { useState } from "react";
import PostCard from "@/components/valentine-special/post-card";
import { Button } from "@/components/ui/button";
import { Trash2, UserX, ShieldAlert } from "lucide-react";
import { deletePost, banUser } from "@/app/actions/wallActions";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminPostRow({ post }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
    const queryClient = useQueryClient();
  // Destructure with fallbacks to prevent "Cannot read property of undefined"
  const email = post?.email || "Anonymous/No Email";
  const postId = post?.id;

  async function handleBan() {
    if (!post?.email) {
      toast.error("Cannot ban: This post has no email associated.");
      return;
    }
    
    if (!confirm(`Ban ${email} and remove all their posts?`)) return;
    
    setIsProcessing(true);
    try {
      const result = await banUser(email);
      if (result.success) {
        setIsRemoved(true);
        toast.success("User banned and posts cleared.");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setIsProcessing(false);
      toast.error("Ban failed: " + error.message);
    }
  }

  async function handleDelete() {
    if (!postId) return;
    if (!confirm("Delete this specific post?")) return;

    setIsProcessing(true);
    try {
      const result = await deletePost(postId);
      if (result.success) {
        setIsRemoved(true);
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        toast.success("Post deleted.");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setIsProcessing(false);
      toast.error("Delete failed: " + error.message);
    }
  }

  if (isRemoved) return null;

  return (
    <div className={`relative border rounded-xl bg-white p-4 transition-all ${isProcessing ? 'opacity-50 grayscale' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded">
          <ShieldAlert size={14} className="text-rose-400" />
          <span>{email}</span>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBan} 
            disabled={isProcessing} 
            className="text-rose-600 border-rose-100 hover:bg-rose-50"
          >
            <UserX size={14} className="mr-1" /> Ban User
          </Button>
          
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleDelete} 
            disabled={isProcessing}
          >
            <Trash2 size={14} className="mr-1" /> Delete
          </Button>
        </div>
      </div>
      
      {/* Visual representation of the post */}
      <div className="pointer-events-none opacity-90 scale-[0.99] origin-left select-none">
        <PostCard 
          {...post} 
          name={post?.author_name} 
          initialLikes={post?.likes || 0} 
        />
      </div>
    </div>
  );
}