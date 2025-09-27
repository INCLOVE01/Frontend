'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { useState } from "react"
import { CalendarIcon, Eye, LoaderCircle, Lock } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { Checkbox } from "./ui/checkbox"
import { toast } from "sonner"

//rules to validate password strength
const passwordRules = [
  { regex: /.{8,}/, label: "minLength" },
  { regex: /[A-Z]/, label: "uppercase" },
  { regex: /[0-9]/, label: "number" },
  { regex: /[!@#$%^&*(),.?":{}|<>]/, label: "specialChar" },
];

// formschema object
const formSchema = z.object({
    email : z.email({error:'email is required'}),
    userId : z.string({error:'user id is required'}).min(6,{error:'min 6 character'}),
    password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { error: "Include an uppercase letter" })
    .regex(/[0-9]/, { error: "Include a number" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { error: "Include a special character" }),
    code : z.coerce .number().min(6,{error : 'min 6 digits'}),
    username : z.string().min(3,{error:'min 3 characters'}).max(27,{error:'max 27 characters'}),
    dob : z.date().default(() => new Date()),
    gender : z.string(),
    bio : z.string().min(5, {error : 'min 5 characters'}),
    disable : z.boolean(),
    disability : z.string().optional(),
    location : z.string({error:'Location required'})
})
// form validation object for sign-up
const step1Schema = formSchema.pick({
  email : true, password : true, userId : true
})
// form validation object for code
const step2Schema = formSchema.pick({
  code : true
})
// form validation object for account info
const step3Schema = formSchema.pick({
  username : true, dob : true, gender : true, bio : true, disability : true, disable : true, location : true
}).superRefine((data, ctx) => {
   console.log("Disable:", data.disable, "Disability:", data.disability);
    if (data.disable && (!data.disability || data.disability.trim() === "")) {
      ctx.addIssue({
        code: "custom",
        message: "Disability is required if disable is true",
        path: ["disability"],
      });
    }
})

// Function to calculate password strength score (0-100)
function calculatePasswordStrength(password) {
  let score = 0;
  passwordRules.forEach(rule => {
    if (rule.regex.test(password)) score += 25;
  });
  return score;
}

//main function
export function SignUp({className, ...props}) {

  let [formStep, setFormStep] = useState(1)

  return (
    <>
        <div className={cn("w-full max-w-md flex flex-col gap-6 md:p-1", className)} {...props}>
            {formStep == 1 ? <Step1 setFormStep={setFormStep} />: formStep == 2 ? <Step2 setFormStep={setFormStep}/> : <Step3/> }
        </div>
    </>
  );
}


// sign-up form
export function Step1({setFormStep}){

  let [formSubmit, setFormSubmit] = useState(false)
  let [passVisible, setPassVisible] = useState('password')
  const form = useForm({
      resolver : zodResolver(step1Schema),
      defaultValues : {
          email : '',
          password : '',
          userId : ''
      }
  })

  const onSubmit = async (formData) => {
    const {email, password, userId} = formData
    if(email && password && userId){
      try{
          setFormSubmit = true
          const formData = new FormData();
          formData.append("email", email);
          formData.append("password", password);
          formData.append("userId", userId);

          const req = await fetch(`/api/signup`, {
          method: "POST",
          body: formData, 
          });

          const resp = await req.json()
          setFormSubmit = false
          if(resp.status == 200){
            setFormSubmit(false)
            setFormStep(2)
          } else{
              toast.error(resp.message,{position:"top-center", style:{color:'red'}})

          }
      } catch(e){
        toast.error('Server Error',{position:"top-center", style:{color:'red'}})
      }
    }
    
  }
  function setPasswordType(){
    if(passVisible == 'string') setPassVisible('password')
    else setPassVisible('string')
  }

const passwordValue = form.watch("password") || ""
let strength = calculatePasswordStrength(passwordValue)


  return(
    <>
      <div className="w-full h-fit flex flex-col gap-6 ">
        <Card className="overflow-hidden p-6 shadow-none border-none ">
                <CardHeader>
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold">Welcome To Inclove</h1>
                        <p className="text-muted-foreground text-balance">
                        Get started by creating an account
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col p-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                            <FormField
                                control = {form.control}
                                name = "email"
                                render = {({field})=>(
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="your email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control = {form.control}
                                name = "userId"
                                render = {({field})=>(
                                    <FormItem>
                                        <FormLabel>UserId</FormLabel>
                                        <FormControl>
                                            <Input placeholder="your userId" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control = {form.control}
                                name = "password"
                                render = {({field})=>(
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                          <div className="relative w-full h-fit flex">
                                            <Input placeholder="your password" {...field}  type={passVisible} />
                                            <button type="button" onClick={setPasswordType} className={`absolute z-10 right-2 aspect-square h-full grid place-items-center before:h-0.5 before:bg-neutral-700 before:rounded-full before:-rotate-45 before:absolute before:duration-100 ${passVisible == 'password' ? 'before:w-7' : 'before:w-0' }`}>
                                              <Eye color="#404040"/>
                                            </button>
                                          </div>
                                        </FormControl>
                                        <div style={{ width: `${strength}%` }} className={` h-1 rounded-full -mt-1 transition-all duration-300 ${strength < 50 ? "bg-red-500" : strength < 75 ? "bg-yellow-400" : "bg-green-500" }`}></div>
                                        <FormMessage />                                        
                                    </FormItem>
                                )}
                            />
                            <div className="w-full h-10 bg-foreground rounded-md overflow-hidden mt-2">
                                {formSubmit != true ? <Button type = "submit" className="w-full h-full bg-none">Create my account</Button>
                                : <div className="w-full h-full grid place-items-center"> <span className="w-fit h-fit animate-spin"> <LoaderCircle stroke="white"/> </span> </div> 
                                }                                

                            </div>
                            
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="w-full h-fit flex flex-col gap-3">
                    <div className="w-full h-fit flex items-center gap-1">
                        <div className="flex-1 h-0.5 bg-muted"></div>
                <div className="w-fit bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </div>
                        <div className="flex-1 h-0.5 bg-muted"></div>

              </div>
              <div className="w-full grid grid-cols-3 gap-4">
                <Button variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor" />
                  </svg>
                  <span className="sr-only">Login with Apple</span>
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor" />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                      fill="currentColor" />
                  </svg>
                  <span className="sr-only">Login with Meta</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Already a member?{" "}
                <a href="#" className="underline underline-offset-4 text-blue-600">
                  Sign-in
                </a>
              </div>
                </CardFooter>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 px-4" >
                By clicking continue, you agree to our <a href="#" className="text-blue-600">Terms of Service</a>{" "}
                and <a href="#" className="text-blue-600">Privacy Policy</a>.
            </div>
      </div>
    </>
  )
}


// confirmation code form
export function Step2({setFormStep}){
  let [formSubmit, setFormSubmit] = useState(false)
  const form = useForm({
    resolver : zodResolver(step2Schema),
  })

// function to submit code
  async function codeSubmit({code}){
    if(!code){
      return
    }
    const element = document.getElementById('code-input')
    const element1 = document.getElementById('code-error')

    try{
      setFormSubmit(true)
      const formData = new FormData();
      formData.append("code", code);
      const req = await fetch("/api/code", {
        method: "POST",
        body: formData, // do not set Content-Type, browser sets it automatically
      });
      const resp = await req.json()
      setFormSubmit(false)
      if(resp.status == 200){
        element.style.borderColor = 'transparent'
        element1.style.display = 'none'
        toast.success('Account Verified',{position:'top-center', style:{color:'green'}})
        // setFormStep(3)
      } else if(resp.status == 400){
        toast.error(resp.message, {position:'top-center', style:{color:'red'}})
      }
       else{
        element.style.borderColor = 'red'
        element1.style.display = 'block'
        toast.error(resp.message, {position:'top-center', style:{color:'red'}})
      }

    }catch(e){
      toast.error('Server error', {position:'top-center', style:{color:'red'}})
    }

  }
  
  return(
    <>
      <div className="w-full h-fit flex flex-col gap-6 px-6">
          <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Code confirmation</h1>
              <p className="text-muted-foreground text-balance">
                We have sent you a confirmation code in your email
              </p>
          </div>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(codeSubmit)} className="flex flex-col gap-6">
                <FormField 
                  control = {form.control}
                  name = "code"
                  render = {({field})=>(
                    <FormItem>
                      <FormLabel>Confirmation Code</FormLabel>
                      <FormControl>
                        <Input id="code-input" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                      <div id="code-error" className="text-sm text-red-500 hidden">invalid code</div>
                    </FormItem>
                  )}
                />
                <div className="w-full h-10 bg-foreground rounded-md overflow-hidden">
                    {formSubmit != true ? <Button type = "submit" className="w-full h-full bg-none">Submit</Button>
                    : <div className="w-full h-full grid place-items-center"> <span className="w-fit h-fit animate-spin"> <LoaderCircle stroke="white"/> </span> </div> 
                    }                                

                </div>
              </form>
            </Form>
          </div>
            <a href="#" className=" text-sm">Resend code</a>
      </div>
    </>
  )
}


// account setup form
export function Step3(){
  let [formSubmit, setFormSubmit] = useState(false)
  const router = useRouter()
  const form = useForm({
    resolver : zodResolver(step3Schema),
    defaultValues : {
      username : '',
      gender : '',
      bio : '',
      disability : '',
      disable : false,
      location : '',
    }
  })


const disable = form.watch('disable') || false

async function handleaccount({username,dob,gender,bio, disable,disability}){
  if(!username && !dob && !gender && !bio) return
  if(disable && !disability) return
  try{
    setFormSubmit(true)

    const formData = new FormData();
    formData.append("username", username)
    formData.append("dob", dob)
    formData.append("gender", gender)
    formData.append("bio", bio)
    formData.append("disable", disable)
    formData.append("disability", disability)
    formData.append("location", location)


    const req = await fetch("/api/account/create", {
      method: "POST",
      body: formData, // do not set Content-Type, browser sets it automatically
    });
    const resp = await req.json()
    setFormSubmit(false)

    if(resp.status == 200){
        toast.success('Account Success', {position : 'top-center' , style : {color : 'green'}})
        setTimeout(() => {
          router.push('/home')          
        }, 1000);
    } else{
        toast.error(resp.message, {position : 'top-center' , style : {color : 'red'}})
    }
  }catch(e){
    toast.error('Server error', {position : 'top-center' , style : {color : 'red'}})
  }
}
  
  return(
    <>
      <div className="w-full h-fit flex flex-col gap-6 px-6">
          <div className="flex flex-col items-center text-center ">
              <h1 className="text-2xl font-bold">Account</h1>
              <p className="text-muted-foreground text-balance">
                Finish setting up your account
              </p>
          </div>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleaccount)} className="flex flex-col gap-6">
                <FormField 
                  control = {form.control}
                  name = "username"
                  render = {({field})=>(
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="your username" {...field} />
                      </FormControl>
                      <FormMessage>{field.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField 
                  control = {form.control}
                  name = "dob"
                  render = {({field})=>(
                    <FormItem>
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                                <Button variant={"outline"} className={cn( "w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-slate-50" align="start">
                          <Calendar 
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                    control = {form.control}
                    name = "gender"
                    render = {({field})=>(
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                                <Input placeholder="your gender" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                  control = {form.control}
                  name = "bio"
                  render = {({field})=>(
                      <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                              <Input placeholder="intoduce yourself" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
                />
                <FormField
                    control = {form.control}
                    name = "location"
                    render = {({field})=>(
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="your location" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                  />
                <FormField
                  control={form.control}
                  name="disable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked === true)}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        I have a disability
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />         
                  <div className={`${disable ? 'block' : 'hidden'} w-full`}>
                  <FormField
                    control = {form.control}
                    name = "disability"
                    render = {({field})=>(
                        <FormItem>
                            <FormLabel>describe your disability</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                  />
                  </div>
        
               

                {
                  formSubmit ? <div className="w-full h-10 bg-foreground grid place-items-center rounded-md"> <span className="animate-spin"> <LoaderCircle stroke="white"/> </span> </div>
                  : <Button type = "submit" className="w-full h-10">Submit</Button>
                }
                
              </form>
            </Form>
          </div>
      </div>
    </>
  )
}