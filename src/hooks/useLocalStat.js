'use client'

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";

/**
 * @param {number} serverLikes - The globalLikes from useWall
 * @param {number} serverPosts - The totalCount from useWall
 */
export function useLocalStats(serverLikes = 0, serverPosts = 0) {
  return useLiveQuery(async () => {
    // 1. Get the current session user
    const activeUser = await db.identities.where('isActive').equals(1).first();
    
    // 2. Count how many likes this user has created locally 
    // This allows us to show immediate jumps in the header
    const localLikesCount = await db.local_likes.count();
    
    // 3. Count posts currently cached in Dexie (optional)
    const localPostCount = await db.posts.count();

    return {
      // Use the server count as the baseline, 
      // but you can add logic here to "shim" the number until a refetch happens
      displayLikes: serverLikes,
      displayPosts: serverPosts,
      personalLikes: localLikesCount,
      personalPosts: localPostCount
    };
  }, [serverLikes, serverPosts]); // Re-runs when server data updates
}