'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { EmailField } from "../forms/email"
import { PasswordField } from "../forms/password-field"
import { supabase } from "@/lib/supabase" // Import your client

const formSchema = z.object({
  email: z.email({error:"Please enter a valid email"}),
  password: z.string().min(8, "Password must be at least 8 characters")
})

export function LoginForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = async (formData) => {
    setIsLoading(true)
    
    // Using Supabase Auth directly on the client for the MVP
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      toast.error(error.message, { position: 'top-center' })
      setIsLoading(false)
      return
    }

    toast.success('Welcome back!', { position: 'top-center' })
    router.push('/home')
  }

  const handleOAuthLogin = async (provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                <p className="text-muted-foreground">Login to your Inclove account</p>
              </div>

              <div className="space-y-4">
                <EmailField control={form.control} placeholder="name@example.com" />
                <PasswordField control={form.control} />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? "Signing in..." : "Login"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" onClick={() => handleOAuthLogin('google')}>
                   {/* Google SVG from your original code */}
                   Google
                </Button>
                <Button variant="outline" type="button" onClick={() => handleOAuthLogin('github')}>
                   Github
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href='/auth/sign-up' className="underline underline-offset-4 text-primary font-medium hover:text-indigo-500">
                  Sign up
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}