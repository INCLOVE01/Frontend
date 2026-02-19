'use client'

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toggleLike } from "@/app/actions/wallActions";
import { db } from "@/db/db";
import { useQueryClient } from "@tanstack/react-query";

export default function LikeButton({ postId, initialLikes }) {
  const queryClient = useQueryClient();
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadLocalState() {
      const activeUser = await db.identities.where('isActive').equals(1).first();
      if (!activeUser) return;
      const localLike = await db.local_likes
      .where('[post_id+user_email]')
      .equals([postId, activeUser.email])
      .first();
      setHasLiked(!!localLike);
    }
    loadLocalState();
  }, [postId]);

  const handleLikeClick = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const activeUser = await db.identities.where('isActive').equals(1).first();
      if (!activeUser) throw new Error("No active user");

      const wasLiked = hasLiked;
      const originalCount = likes;

      // 1. OPTIMISTIC UPDATE: GLOBAL COUNTER (Header)
      queryClient.setQueriesData({ queryKey: ['posts'] }, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          globalLikes: wasLiked ? Math.max(0, oldData.globalLikes - 1) : oldData.globalLikes + 1
        };
      });

      // 2. OPTIMISTIC UPDATE: LOCAL BUTTON
      setHasLiked(!wasLiked);
      setLikes(prev => wasLiked ? prev - 1 : prev + 1);

      // 3. SERVER SYNC
      const result = await toggleLike(postId, activeUser.inclove_token);

      if (result.success) {
        if (result.action === 'liked') {
          await db.local_likes.add({ post_id: postId, user_email: activeUser.email });
        } else {
          await db.local_likes.where({ post_id: postId, user_email: activeUser.email }).delete();
        }
        if (result.new_count !== undefined) setLikes(result.new_count);
      } else {
        // ROLLBACK
        setHasLiked(wasLiked);
        setLikes(originalCount);
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      }
    } catch (error) {
      console.error("Toggle Failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLikeClick} 
      className={`flex items-center gap-2 transition-transform active:scale-90 ${hasLiked ? 'text-rose-500' : 'text-slate-400'}`}
    >
      <Heart size={18} fill={hasLiked ? "currentColor" : "none"} />
      <span className="text-xs font-bold">{likes}</span>
    </button>
  );
}