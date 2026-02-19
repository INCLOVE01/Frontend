// components/celebration/SyncManager.jsx
'use client'
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useMilestones } from "./milestone";

export default function SyncManager() {
  const { triggerMilestone } = useMilestones();

  useEffect(() => {
    const syncUserStats = async () => {
      const token = localStorage.getItem("inclove_access_token");
      if (!token) return;

      // 1. Check if we have already synced likes
      const hasSynced = localStorage.getItem("inclove_synced_v1");
      
      if (!hasSynced) {
        // Fetch the user's internal ID
        const { data: identity } = await supabase
          .from('identities')
          .select('id')
          .eq('short_code', token)
          .single();

        if (identity) {
          // Fetch their historical likes from Supabase
          const { data: likedRows } = await supabase
            .from('post_likes')
            .select('post_id')
            .eq('identity_id', identity.id);

          const idList = likedRows?.map(r => r.post_id) || [];
          
          // Save to local storage
          localStorage.setItem("inclove_liked_posts", JSON.stringify(idList));
          localStorage.setItem("inclove_synced_v1", "true");
          
          // If they are returning with a history, welcome them back!
          if (idList.length > 0) {
            triggerMilestone('WELCOME');
          }
        }
      }
    };

    syncUserStats();
  }, [triggerMilestone]);

  return null; // This component doesn't render anything
}