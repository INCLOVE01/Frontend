'use client'

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useWall(sortBy = 'recent') {
  return useQuery({
    // The key depends on the filter; when filter changes, it fetches new data
    queryKey: ['posts', sortBy], 
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select('id, name, badge, content, likes, created_at');

      if (sortBy === 'likes') {
        query = query.order('likes', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data;
    },
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
  });
}