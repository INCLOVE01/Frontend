'use client'

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handlePostSubmission } from "@/app/actions/wallActions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WaitlistForm from "../waitlist/waitlist-form";


// ... other imports (Input, Textarea, Select, etc.)

export default function CreatePostDialog() {
  const [open, setOpen] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [emailAttempt, setEmailAttempt] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData) => handlePostSubmission(formData),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries(['posts']);
        setOpen(false);
      } else if (data.error === "NOT_ON_WAITLIST") {
        setShowWaitlist(true); // TRIGGER: User not found, show waitlist form
      }
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setEmailAttempt(formData.get("email"));
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if(!val) setShowWaitlist(false); }}>
      <DialogTrigger asChild>
        <Button className="bg-rose-500">Share a Thought</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {showWaitlist ? "Join the Waitlist" : "Add to the Self Love Wall"}
          </DialogTitle>
        </DialogHeader>

        {!showWaitlist ? (
          <form onSubmit={handleSubmit} className="space-y-4">
             {/* ... (Existing Email, Badge Select, and Content Textarea fields) ... */}
             <Button type="submit" className="w-full">
               {mutation.isPending ? "Checking..." : "Post Thought"}
             </Button>
             {mutation.data?.error === "ALREADY_POSTED" && (
                <p className="text-red-500 text-sm text-center">One post per person!</p>
             )}
          </form>
        ) : (
          // <WaitlistForm defaultEmail={emailAttempt} />
          <span>hello</span>
        )}
      </DialogContent>
    </Dialog>
  );
}