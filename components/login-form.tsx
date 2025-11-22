// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
// } from "@/components/ui/card";
// import {
//   Form, FormControl, FormField, FormItem, FormLabel, FormMessage
// } from "@/components/ui/form";
// import { cn } from "@/lib/utils";
// import { Input } from "@/components/ui/input";
// import { authClient } from "@/lib/auth-client";
// import { GithubIcon } from "lucide-react";
// import { useState } from "react";





// export function LoginForm() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);


// const onLogin = async()=>{
//   setIsLoading(true);
//   await authClient.signIn.social({
//     provider: "github",
//     callbackURL: "http://localhost:3000"
//   })
//   setIsLoading(false);
// }


//   return (
//     <div className="flex flex-col gap-6 justify-center items-center ">
//       <div className="flex flex-col items-center justify-center space-y-4">
//         <Image src={"/login.svg"} alt="Login" height={500} width={500}/>
//         <h1 className="text-6xl font-extrabold text-indigo-400">Welcome Back! to Cipher Cli</h1>
//         <p className="text-base font-medium text-zinc-400">Login to your account for allowing device flow</p>
//       </div>
//       <Card className="border-dashed border-2">
//         <CardContent>
//           <div className="grid gap-6">
//             <div className="flex flex-col gap-4">
//               <Button
//                 variant={"outline"}
//                 className="w-full h-full"
//                 type="button"
//                 onClick={() => authClient.signIn.social({
//                   provider: "github",
//                   callbackURL: "http://localhost:3000"
//                 })}
               
//               >
//                 <Image src={"/github.svg"} alt="Github" height={16} width={16} className="size-4 dark:invert" />
//                 Continue With GitHub
//               </Button>

//             </div>

//           </div>

//         </CardContent>
//       </Card>
//     </div>
//   )
// } 

"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onLogin = async () => {
    setIsLoading(true)
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "http://localhost:3000",
    })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center font-sans p-6 
      bg-[#F5F5F7] dark:bg-[#000000] transition-colors duration-700 ease-in-out">

      {/* Main container */}
      <div className="w-full max-w-[420px] space-y-10">

        {/* Top Section */}
        <div className="flex flex-col items-center text-center space-y-6">
       

          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Welcome Back to Cipher CLI
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Login to your account to activate secure device flow
          </p>
        </div>

        {/* Login Card */}
        <Card
          className="relative overflow-hidden rounded-[28px] 
            bg-white/60 dark:bg-[#1c1c1e]/60 
            backdrop-blur-[40px] backdrop-saturate-150
            border border-white/40 dark:border-white/10
            shadow-[0_20px_40px_rgba(0,0,0,0.1)] 
            dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent 
            dark:from-white/10 opacity-60 pointer-events-none" />

          <CardContent className="relative p-8">
            <div className="space-y-6">

              {/* Login Providers */}
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  disabled={isLoading}
                  onClick={onLogin}
                  className="w-full h-12 rounded-xl flex items-center justify-center gap-3 
                    bg-white/70 dark:bg-zinc-900/40 
                    border border-white/30 dark:border-white/10
                    backdrop-blur-md transition-all active:scale-[0.97]
                    text-zinc-700 dark:text-zinc-200"
                >
                  <Image
                    src="/github.svg"
                    alt="GitHub"
                    height={18}
                    width={18}
                    className="dark:invert"
                  />
                  Continue with GitHub
                </Button>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
