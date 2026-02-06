'use server'

import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { revalidatePath } from "next/cache";

/**
 * Controller: handlePostSubmission
 * Logic: Checks waitlist -> Checks duplicate post -> Saves thought
 */
export async function handlePostSubmission(formData) {
  // 1. Extract Data
  const email = formData.get("email")?.toLowerCase().trim();
  const content = formData.get("content");
  const badge = formData.get("badge") || "Self Love";

  if (!email || !content) {
    return { error: "VALIDATION_FAILED", message: "Email and content are required." };
  }

  try {
    // 2. Service: Waitlist Verification
    // We check the waitlist table for this email
    const { data: waitlistEntry, error: waitError } = await supabase
      .from('waitlist')
      .select('full_name')
      .eq('email', email)
      .single();

    if (waitError || !waitlistEntry) {
      return { 
        error: "NOT_ON_WAITLIST", 
        message: "Oops! You need to join the waitlist first to post a thought." 
      };
    }

    // 3. Service: Post Creation
    // The 'email' column in 'posts' is UNIQUE, so Supabase will 
    // automatically block a second post from the same person.
    const { error: postError } = await supabase
      .from('posts')
      .insert([
        { 
          email: email, 
          name: waitlistEntry.full_name, // Use the name from their waitlist signup
          content: content,
          badge: badge
        }
      ]);

    if (postError) {
      // Catch the "Unique Constraint" error (code 23505)
      if (postError.code === '23505') {
        return { error: "ALREADY_POSTED", message: "You've already shared a thought on the wall!" };
      }
      throw postError;
    }

    // 4. Success: Revalidate the UI
    // This tells Next.js to clear the cache for the wall page so the new post appears.
    revalidatePath('/wall');
    return { success: true };

  } catch (err) {
    console.error("Wall Action Error:", err);
    return { error: "SERVER_ERROR", message: "Something went wrong. Please try again later." };
  }
}

/**
 * Admin Controller: deletePost
 * Logic: Only uses the Secret Key (Admin Client) to bypass RLS
 */
export async function deletePost(postId) {
  try {
    // In a real app, you'd check a password or session here
    const { error } = await supabaseAdmin
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) throw error;

    revalidatePath('/admin/wall');
    revalidatePath('/wall'); // Refresh the public wall too
    return { success: true };
  } catch (err) {
    return { error: "Failed to delete post." };
  }
}