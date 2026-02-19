'use server'

import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";


export async function handlePostSubmission(values) {
  const { accessToken, content, badge } = values;

  try {
    if (!accessToken) return { success: false, error: "MISSING_TOKEN" };

    // USE .rpc() INSTEAD OF .insert()
    const { data, error } = await supabase.rpc('submit_post_with_token', {
      t_token: accessToken,   // This matches the parameter name in your SQL
      t_content: content,
      t_badge: badge
    });

    if (error) {
      console.error("Database Error:", error.message);
      return { success: false, message: error.message };
    }

    revalidatePath('/wall'); 
    return { success: true, data };
  } catch (err) {
    console.error("Server Crash:", err);
    return { success: false, error: 'SERVER_ERROR' };
  }
}

export async function toggleLike(postId, accessToken) {
  // Use the 'supabase' instance imported at the top of the file
  if (!postId || !accessToken) {
    return { success: false, error: "MISSING_PARAMS" };
  }

  try {
    const { data, error } = await supabase.rpc('toggle_post_like', {
      p_post_id: postId,
      p_token: accessToken
    });

    if (error) {
      console.error("Supabase RPC Error:", error);
      return { success: false, message: error.message };
    }

    // Since RPC returns an array/table, we grab the first row
    const result = Array.isArray(data) ? data[0] : data;
    
    revalidatePath('/wall');
    return { 
      success: true, 
      action: result?.action, // 'liked' or 'unliked'
      new_count: result?.new_count 
    };
  } catch (err) {
    console.error("Server Action Crash:", err);
    return { success: false, error: "SERVER_ERROR" };
  }
}

export async function banUser(email, reason = "Violated community guidelines") {
  try {
    const { error } = await supabaseAdmin
      .from('banned_users')
      .insert([{ email, reason }]);

    if (error) throw error;

    // Optional: Delete all existing posts from this user automatically
    // await supabase.from('posts').delete().eq('email', email);

    revalidatePath('/admin/wall');
    revalidatePath('/wall');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}


export async function deletePost(postId) {
  try {
    // 1. Fetch post data first for the audit log
    const { data: postToLog } = await supabaseAdmin
      .from('posts')
      .select('email, content')
      .eq('id', postId)
      .single();

    if (postToLog) {
      // 2. Log the deletion
      await supabaseAdmin.from('post_audit_log').insert({
        post_id: postId,
        author_email: postToLog.email,
        content_preview: postToLog.content?.substring(0, 50),
        action_type: 'DELETE'
      });
    }

    // 3. Perform actual delete
    const { error } = await supabaseAdmin.from('posts').delete().eq('id', postId);
    if (error) throw error;

    revalidatePath('/wall');
    revalidatePath('/admin/wall');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}