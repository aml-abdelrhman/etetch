"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useStore";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2, User, UserPlus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/queries";
import { toast } from "react-hot-toast";

const registerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterInput = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";
  const t = useTranslations("register");
  const darkMode = useAppStore((state) => state.darkMode);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success(isAr ? "مرحباً بك! تم إنشاء حسابك بنجاح 🎉" : "Welcome! Your account has been created. 🎉");
      router.push(`/${locale}/auth/login`);
    },
    onError: (err: any) => {
      toast.error(err?.message || (isAr ? "فشلت عملية التسجيل، حاول مجدداً" : "Registration failed. Try again."));
    }
  });

  const onSubmit = async (data: RegisterInput) => {
    mutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password
    });
  };

  return (
    <section className={cn(
      "relative flex items-center justify-center min-h-screen overflow-hidden px-4 py-20",
      darkMode ? "bg-[#020617] text-white" : "bg-slate-50 text-slate-900"
    )}>
      {/* AI Ambient Background */}
      <div className="absolute inset-0 z-0">
        <div className={cn(
          "absolute top-[-5%] right-[-5%] w-[45%] h-[45%] rounded-full blur-[120px] opacity-20 animate-pulse",
          darkMode ? "bg-blue-600" : "bg-blue-300"
        )} />
        <div className={cn(
          "absolute bottom-[-5%] left-[-5%] w-[45%] h-[45%] rounded-full blur-[120px] opacity-20 animate-pulse delay-700",
          darkMode ? "bg-indigo-600" : "bg-indigo-300"
        )} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className={cn(
          "p-8 md:p-10 rounded-[2.5rem] border backdrop-blur-2xl shadow-2xl transition-all duration-500",
          darkMode 
            ? "bg-white/5 border-white/10 shadow-blue-500/5" 
            : "bg-white/90 border-slate-200 shadow-slate-200/50"
        )}>
          
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-5 shadow-xl rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/40">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">{t("registerTitle")}</h1>
            <p className={cn("mt-2 text-sm font-medium", darkMode ? "text-slate-400" : "text-slate-500")}>
              {t("registerSubtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AnimatePresence mode="wait">
              {mutation.isError && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 text-xs font-bold text-center text-red-500 border border-red-500/20 rounded-2xl bg-red-500/5"
                >
                  {(mutation.error as any)?.message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name Input */}
            <div className="relative group">
              <User className={cn(
                "absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors z-10",
                darkMode ? "text-slate-500 group-focus-within:text-blue-400" : "text-slate-400 group-focus-within:text-blue-600"
              )} />
              <input
                type="text"
                placeholder={t("namePlaceholder")}
                {...register("name")}
                className={cn(
                  "w-full py-4 rounded-2xl border transition-all outline-none text-sm font-medium",
                  isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left",
                  darkMode
                    ? "bg-slate-900/40 border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10" 
                    : "bg-slate-50/50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5",
                  errors.name && "border-red-500 shadow-sm shadow-red-500/10"
                )}
              />
              {errors.name && <p className={cn("mt-1 text-[10px] text-red-500", isAr ? "mr-3 text-right" : "ml-3 text-left")}>{errors.name.message}</p>}
            </div>

            {/* Email Input */}
            <div className="relative group">
              <Mail className={cn(
                "absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors z-10",
                darkMode ? "text-slate-500 group-focus-within:text-blue-400" : "text-slate-400 group-focus-within:text-blue-600"
              )} />
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                {...register("email")}
                className={cn(
                  "w-full py-4 rounded-2xl border transition-all outline-none text-sm font-medium",
                  isAr ? "pr-12 pl-4 text-right" : "pl-12 pr-4 text-left",
                  darkMode
                    ? "bg-slate-900/40 border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10" 
                    : "bg-slate-50/50 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5",
                  errors.email && "border-red-500 shadow-sm shadow-red-500/10"
                )}
              />
              {errors.email && <p className={cn("mt-1 text-[10px] text-red-500", isAr ? "mr-3 text-right" : "ml-3 text-left")}>{errors.email.message}</p>}
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative group">
                <Lock className={cn("absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 z-10")} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("passwordPlaceholder")}
                  {...register("password")}
                  className={cn(
                    "w-full py-4 rounded-2xl border transition-all outline-none text-sm font-medium",
                    isAr ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left",
                    darkMode ? "bg-slate-900/40 border-white/10 focus:border-blue-500/50" : "bg-slate-50/50 border-slate-200 focus:border-blue-500"
                  )}
                />
              </div>
              <div className="relative group">
                <Lock className={cn("absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 z-10")} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("confirmPasswordPlaceholder")}
                  {...register("confirmPassword")}
                  className={cn(
                    "w-full py-4 rounded-2xl border transition-all outline-none text-sm font-medium",
                    isAr ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left",
                    darkMode ? "bg-slate-900/40 border-white/10 focus:border-blue-500/50" : "bg-slate-50/50 border-slate-200 focus:border-blue-500"
                  )}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between px-2">
              <div className="flex-1">
                {(errors.password || errors.confirmPassword) && (
                  <p className={cn("text-[10px] text-red-500 leading-tight", isAr ? "text-right" : "text-left")}>
                    {errors.password?.message || errors.confirmPassword?.message}
                  </p>
                )}
              </div>
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs font-bold text-slate-500 hover:text-blue-500 transition-colors flex items-center gap-1.5 shrink-0"
              > 
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />} 
                {showPassword ? t("hidePassword") : t("showPassword")}
              </button>
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className={cn(
                "group relative w-full py-4 mt-4 rounded-2xl font-black text-sm transition-all overflow-hidden shadow-2xl shadow-blue-500/20",
                "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
                "hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
              )}
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {mutation.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin text-white/80" />
                ) : (
                  <>
                    {t("registerButton")}
                    <ArrowRight size={18} className={cn("transition-transform", isAr ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1")} />
                  </>
                )}
              </div>
              <div className="absolute inset-0 z-0 transition-opacity opacity-0 bg-white/10 group-hover:opacity-100" />
            </button>

            <p className={cn("text-center text-xs pt-6", darkMode ? "text-slate-500" : "text-slate-400")}>
              {t("alreadyHaveAccount")} 
              <Link href={`/${locale}/auth/login`} className={cn("font-bold text-blue-500 hover:text-blue-400 hover:underline transition-colors", isAr ? "mr-1.5" : "ml-1.5")}>
                {t("loginLink")}
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  );
} 
