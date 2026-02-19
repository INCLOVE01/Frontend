'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useLiveQuery } from "dexie-react-hooks";
import { 
  Plus, UserCircle2, Sparkles, Loader2 
} from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextField } from "../forms/text-field";
import { SelectField } from "../forms/select-field";

import { db } from "@/db/db";
import { isDbReady } from "@/db/guard";
import { supabase } from "@/lib/supabase";
import WaitlistForm from "../waitlist/waitlist-form";
import { handlePostSubmission } from "@/app/actions/wallActions";
import { useMilestones } from "../celebration/milestone";

const postSchema = z.object({
  email: z.string().email("Please use a valid email"),
  content: z.string()
    .min(10, "Share a bit more (min 10 chars)")
    .max(1000, "Keep it under 200 words"), 
  badge: z.string().default("Self Love")
});

export default function CreatePostDialog() {
  const [open, setOpen] = useState(false);
  const [isWaitlistMode, setIsWaitlistMode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const queryClient = useQueryClient();
  const { triggerMilestone } = useMilestones();

  // 1. Reactive Hook for UI
  const activeIdentity = useLiveQuery(() => 
    db.identities.where('isActive').equals(1).first()
  );

  const form = useForm({
    resolver: zodResolver(postSchema),
    values: { 
      email: activeIdentity?.email || "",
      content: "",
      badge: "Self Love"
    }
  });

  // --- IDENTITY SYNC WORKER (FIXED CONSTRAINT LOGIC) ---
  const checkAndSyncIdentity = async (inputEmail) => {
    const ready = await isDbReady();
    if (!ready || !inputEmail) return null;

    const email = inputEmail.toLowerCase().trim();

    try {
      // Step A: Check local Dexie
      const local = await db.identities.get({ email });
      
      if (local?.inclove_token) {
        await db.transaction('rw', db.identities, async () => {
          await db.identities.toCollection().modify({ isActive: 0 });
          await db.identities.update(local.id, { 
            isActive: 1, 
            lastUsed: Date.now() 
          });
        });
        return local.inclove_token;
      }

      // Step B: Check Supabase
      const { data: cloudUser, error: cloudError } = await supabase
        .from('waitlist')
        .select('identities(inclove_token)')
        .eq('email', email)
        .maybeSingle();

      if (cloudError) throw cloudError;

      const identities = cloudUser?.identities;
      const sc = Array.isArray(identities) ? identities[0]?.inclove_token : identities?.inclove_token;

      if (sc) {
        // Step C: Robust Upsert logic to avoid ConstraintError
        await db.transaction('rw', db.identities, async () => {
          await db.identities.toCollection().modify({ isActive: 0 });
          
          const existing = await db.identities.get({ email });
          if (existing) {
            await db.identities.update(existing.id, {
              inclove_token: sc,
              isActive: 1,
              lastUsed: Date.now()
            });
          } else {
            await db.identities.add({
              email,
              inclove_token: sc,
              isActive: 1,
              lastUsed: Date.now(),
              createdAt: Date.now()
            });
          }
        });
        return sc;
      }

      return null; 
    } catch (err) {
      console.error("Identity Verification Failed:", err);
      return null;
    }
  };

  const onSubmit = async (values) => {
    setIsSyncing(true);
    try {
      const incloveToken = await checkAndSyncIdentity(values.email);

      if (!incloveToken) {
        setIsWaitlistMode(true);
        return;
      }

      const result = await handlePostSubmission({ 
        ...values, 
        accessToken: incloveToken 
      });
      
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        
        const count = await db.posts.where('identity_id').equals(incloveToken).count();
        if (count === 0) triggerMilestone('FIRST_POST');
        
        await db.posts.add({
          identity_id: incloveToken,
          content: values.content,
          createdAt: Date.now()
        });

        toast.success("Thought shared with the world!");
        setOpen(false);
        setTimeout(() => form.reset({ content: "" }), 300);
      } else {
        console.log(result)
        toast.error(result.message || "Failed to post");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) setIsWaitlistMode(false);
    }}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-rose-600 hover:bg-rose-700 shadow-lg gap-2 px-6 py-6 text-lg transition-transform active:scale-95">
          <Plus size={22} />
          <span>Share a Thought</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-rose-500 p-6 text-white">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 backdrop-blur-md bg-white/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-rose-100" />
              </div>
              <DialogTitle className="text-xl font-semibold">
                {isWaitlistMode ? "Join the Family" : "Post a Reflection"}
              </DialogTitle>
            </div>
            <DialogDescription className="text-rose-100 text-start leading-relaxed">
              {isWaitlistMode 
                ? "We couldn't verify your access key. Let's get you registered!" 
                : "Your perspective is unique. Sharing it helps build a kinder world."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 bg-white">
          {isWaitlistMode ? (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <WaitlistForm onSignupSuccess={() => setIsWaitlistMode(false)} />
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <UserCircle2 size={14} /> Posting As
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-slate-50 border-slate-200 focus:ring-rose-500 rounded-xl"
                          placeholder="email@example.com"
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] italic" />
                    </FormItem>
                  )}
                />

                <SelectField 
                  control={form.control} 
                  name="badge"
                  label={'Mood Tag'}
                  options={[
                    { label: "Self Love", value: "Self Love" },
                    { label: "Gratitude", value: "Gratitude" },
                    { label: "Victory", value: "Victory" }
                  ]}
                />

                <TextField 
                  control={form.control} 
                  name="content" 
                  label="Your Thought" 
                  placeholder="Today, I am proud of myself because..."
                  maxWords={200} 
                  showCount={"word"}
                />

                <Button 
                  type="submit" 
                  disabled={isSyncing}
                  className="w-full h-max bg-rose-600 hover:bg-rose-700 text-white text-lg font-medium rounded-2xl transition-all shadow-md shadow-rose-200"
                >
                  {isSyncing ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    "Share with the Community"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}