'use client'

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handlePostSubmission } from "@/app/actions/wallActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, Loader2 } from "lucide-react";

export default function CreatePostDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData) => handlePostSubmission(formData),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries(['posts']);
        setOpen(false); // Close dialog on success
      }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-rose-500 hover:bg-rose-600 gap-2">
          <Heart size={16} fill="white" /> Share a Thought
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to the Self Love Wall</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Waitlist Email</label>
            <Input 
              name="email" 
              type="email" 
              placeholder="The email you used for Inclove waitlist" 
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Badge</label>
            <Input name="badge" placeholder="e.g. Survivor, Believer, Loved" required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Thought</label>
            <Textarea 
              name="content" 
              placeholder="What does self-love mean to you?" 
              className="resize-none h-32"
              required 
            />
          </div>

          {/* Error Handling Logic */}
          {mutation.data?.error === "NOT_ON_WAITLIST" && (
            <Alert variant="destructive">
              <AlertDescription className="flex flex-col gap-2">
                <span>You aren't on our waitlist yet! Join to post.</span>
                <Button variant="outline" size="sm" asChild>
                  <a href="/join-waitlist">Join Waitlist Now</a>
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {mutation.data?.error === "ALREADY_POSTED" && (
            <Alert variant="destructive">
              <AlertDescription>
                You have already shared a thought! One post per person.
              </AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full bg-rose-500" 
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <Loader2 className="animate-spin" /> : "Post Thought"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}