'use client'

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { db } from "@/db/db";

export function useWall(sortBy = 'recent', page = 1, limit = 10) {
  return useQuery({
    queryKey: ['posts', sortBy, page, limit], 
    queryFn: async () => {
      // 1. Get local ID from Dexie
      const activeUser = await db.identities.where('isActive').equals(1).first();
      const userId = activeUser?.uuid || null;

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      // 2. Prepare the query
      let postsQuery = supabase
        .from('posts')
        .select(`
          *,
          user_liked: post_likes!left(id)
        `, { count: 'exact' });

      // FIX: Apply the filter to the JOINED table (post_likes), NOT the main table (posts)
      if (userId) {
        postsQuery = postsQuery.eq('post_likes.identity_id', userId);
      } else {
        // If no user, we still want all posts, but no likes assigned to 'me'
        postsQuery = postsQuery.eq('post_likes.identity_id', '00000000-0000-0000-0000-000000000000');
      }

      const [postsResult, statsResult] = await Promise.all([
        postsQuery
          .order(sortBy === 'likes' ? 'likes' : 'created_at', { ascending: false })
          .range(from, to),
        
        supabase.rpc('get_global_stats')
      ]);

      if (postsResult.error) {
        console.error("Supabase Error:", postsResult.error);
        throw postsResult.error;
      }

      return {
        posts: postsResult.data.map(post => ({
          id: post.id,
          name: post.author_name,
          badge: post.badge,
          content: post.content,
          initialLikes: post.likes || 0,
          // If the join found a row for this user, length will be > 0
          hasLikedInitial: Array.isArray(post.user_liked) && post.user_liked.length > 0,
        })),
        totalCount: postsResult.count || 0,
        globalLikes: statsResult.data?.total_likes || 0,
        totalPosts: statsResult.data?.total_posts || 0,
        serverTimestamp: Date.now()
      };
    },
    staleTime: 1000 * 60 * 2,
  });
}