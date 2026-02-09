'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { EmailField } from "@/components/forms/email";
import z from "zod";
import { StringField } from "@/components/forms/string-field";
import { PhoneField } from "@/components/forms/phone-field";
import { TextField } from "@/components/forms/text-field";

const formSchema = z.object({
    email : z.email({error : "please enter the correct email"}),
    fullName : z.string().min(3, "hey").max(10,"heheh"),
    phone: z.string().optional(),
    content : z.string({error:'hey'})
})

export default function Page() {
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", fullName : "", phone : '', content : '' },
    
  });

  const onSubmit = (values) => {
    console.log("Form Submitted:", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <EmailField 
          control={form.control} 
          label="Your Email" 
          placeholder="hello@inclove.com"
        />
        <StringField
            control={form.control} 
          label="fullName"
          name = "fullName"
          placeholder="john doe"
        />
        <PhoneField
          control={form.control} 
  name="phone"
  label="Contact Number"
  placeholder="Enter phone number"
  description="We'll send a verification code to this number."
        />

        <TextField 
  control={form.control}
  name="content"
  label="Write a self-love note"
  placeholder="Today, I am proud of myself because..."
  description="Your post will be shared on the community wall."
/>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}