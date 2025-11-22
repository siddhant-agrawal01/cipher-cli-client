// "use client"
// import { Button } from "@/components/ui/button"
// import { Spinner } from "@/components/ui/spinner"
// import { authClient } from "@/lib/auth-client"
// import { useRouter } from "next/navigation"

// export default function Home() {
//   const { data, isPending } = authClient.useSession()
//   const router = useRouter()

//   if (isPending) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <Spinner />
//       </div>
//     )
//   }

//   if (!data?.session && !data?.user) {
//     router.push("/sign-in")
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-background font-sans">
//       <div className="w-full max-w-md px-4">
//         <div className="space-y-8">
//           {/* Profile Header Card */}
//           <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-8 bg-zinc-900/50 backdrop-blur-sm">
//             {/* Avatar */}
//             <div className="flex justify-center mb-6">
//               <div className="relative">
//                 <img
//                   src={data?.user?.image || "/vercel.svg"}
//                   alt={data?.user?.name || "User"}
//                   width={120}
//                   height={120}
//                   className="rounded-full border-2 border-dashed border-zinc-600 object-cover"
//                 />
//                 <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-zinc-900"></div>
//               </div>
//             </div>

//             {/* User Info */}
//             <div className="space-y-3 text-center">
//               <h1 className="text-3xl font-bold text-zinc-50 truncate">Welcome, {data?.user?.name || "User"}</h1>
//               <p className="text-sm text-zinc-400">Authenticated User</p>
//             </div>
//           </div>

//           {/* User Details Card */}
//           <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-6 bg-zinc-900/50 backdrop-blur-sm space-y-4">
//             <div className="space-y-2">
//               <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Email Address</p>
//               <p className="text-lg text-zinc-100 font-medium break-all">{data?.user?.email}</p>
//             </div>
//           </div>

//           {/* Sign Out Button */}
//           <Button
//             onClick={() =>
//               authClient.signOut({
//                 fetchOptions: {
//                   onError: (ctx) => console.log(ctx),
//                   onSuccess: () => router.push("/sign-in"),
//                 },
//               })
//             }
//             className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
//           >
//             Sign Out
//           </Button>

//           {/* Decorative divider */}
//           <div className="flex items-center gap-3">
//             <div className="flex-1 h-px border-t border-dashed border-zinc-700"></div>
//             <span className="text-xs text-zinc-600">Session Active</span>
//             <div className="flex-1 h-px border-t border-dashed border-zinc-700"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun, LogOut, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  const [isDark, setIsDark] = useState(false);
  const [sessionId, setSessionId] = useState("");

  // Hydration-safe session ID
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionId(Math.random().toString(36).substr(2, 9).toUpperCase());
  }, []);

  // Theme toggle
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  // Handle auth redirect
  useEffect(() => {
    if (!isPending && !data?.session && !data?.user) {
      router.push("/sign-in");
    }
  }, [data, isPending, router]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-[#000000]">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-700 ease-in-out flex items-center justify-center p-6 font-sans ${
        isDark ? "bg-[#000000]" : "bg-[#F5F5F7]"
      }`}
    >
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-3 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-lg shadow-lg border border-white/20 dark:border-white/10 transition-transform active:scale-95"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-zinc-600" />
          )}
        </button>
      </div>

      <div className="w-full max-w-[400px]">
        <div
          className="relative overflow-hidden rounded-[32px] transition-all duration-500
          bg-white/60 dark:bg-[#1c1c1e]/60 
          backdrop-blur-[40px] backdrop-saturate-150
          border border-white/40 dark:border-white/10
          shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]
        "
        >
          {/* Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/40 to-transparent opacity-50 dark:opacity-10" />

          <div className="relative p-8 flex flex-col items-center">
            {/* Avatar */}
            <div className="relative mb-6 group cursor-default">
              <div className="relative z-10 w-28 h-28 p-1 rounded-full bg-white/20 dark:bg-white/5 backdrop-blur-md border border-white/30 shadow-xl">
                <img
                  src={data?.user?.image || "/placeholder.svg"}
                  alt={data?.user?.name || "User"}
                  className="w-full h-full rounded-full object-cover shadow-inner"
                />
              </div>

              {/* Status dot */}
              <div className="absolute bottom-2 right-2 z-20">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-white dark:border-[#2c2c2e]"></span>
                </span>
              </div>
            </div>

            {/* User */}
            <div className="text-center space-y-1 mb-8 w-full">
              <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                {data?.user?.name}
              </h1>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100/50 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10">
                <ShieldCheck className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                  Verified Account
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="w-full space-y-4 mb-8">
              <div className="group relative overflow-hidden rounded-2xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/5">
                <div className="p-4 flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">
                      Email Address
                    </p>
                    <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">
                      {data?.user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign Out */}
            <div className="w-full">
              <Button
                onClick={() =>
                  authClient.signOut({
                    fetchOptions: {
                      onError: (e) => console.log(e),
                      onSuccess: () => router.push("/sign-in"),
                    },
                  })
                }
                className="w-full h-12 rounded-2xl font-medium text-sm flex items-center justify-center gap-2
                  bg-[#FF3B30] hover:bg-[#FF3B30]/90 text-white
                  dark:bg-[#FF453A] dark:hover:bg-[#FF453A]/90
                  shadow-[0_4px_12px_rgba(255,59,48,0.3)]
                  active:scale-[0.98] transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>

              {/* <p className="mt-6 text-xs text-center text-zinc-400 dark:text-zinc-600 font-medium">
                Session ID: {sessionId}
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
