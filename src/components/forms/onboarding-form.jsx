'use client'

import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { StringField } from "../forms/string-field"
import { TextField } from "../forms/text-field"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"

export default function OnboardingForm({ user }) {
  const supabase = createClient();
  
  const form = useForm({
    defaultValues: {
      fullName: "",
      bio: "",
      // Add more default values here as you expand
    }
  });

  const saveProfile = async (values) => {
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: values.fullName,
        about: values.bio,
        onboarding_completed: true,
      })
      .eq('id', user.id);

    if (error) {
      toast.error("Error saving profile");
    } else {
      window.location.href = "/home";
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tell us about you</h1>
        <p className="text-muted-foreground">Help the community get to know you.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(saveProfile)} className="space-y-4">
          <StringField control={form.control} name="fullName" label="Full Name" placeholder="Display Name" />
          
          {/* Easily expand here by adding more custom components we built */}
          <TextField control={form.control} name="bio" label="About Me" showCount="char" maxLength={150} />

          <Button type="submit" className="w-full">Complete Profile</Button>
        </form>
      </Form>
    </div>
  );
}