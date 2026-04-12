"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useStore";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2, Sparkles, ArrowRight, AlertCircle } from "lucide-react";

const createLoginSchema = (t: any) =>
  z.object({
    email: z.string()
      .min(1, t("validation.emailRequired"))
      .email(t("validation.emailInvalid")),
    password: z.string()
      .min(1, t("validation.passwordRequired"))
      .min(1, t("validation.passwordMinLength")), // تم تعديله ليتناسب مع كلمة سر mock (مثل student)
  });

interface LoginCredentials {
  email: string;
  password: string;
}

export default function LoginPage() {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("login");
  const darkMode = useAppStore((state) => state.darkMode);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loginSchema = createLoginSchema(t);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberEmail");
    if (rememberedEmail) {
      setValue("email", rememberedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  const handleLogin = useCallback(async (data: LoginCredentials) => {
    if (loading) return;
    
    // تصفير الحالات قبل البدء
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      // التحقق من فشل تسجيل الدخول
      if (result?.error || !result?.ok) {
        setLoading(false);
        // إظهار رسالة خطأ محددة
        setError(t("errors.invalidCredentials") || "بيانات الدخول غير صحيحة");
        return; // التوقف هنا وعدم التكملة للنجاح
      }

      // إذا وصلنا هنا، يعني تسجيل الدخول نجح
      const session = await getSession();
      const userRole = (session?.user as any)?.role?.toLowerCase();

      if (rememberMe) {
        localStorage.setItem("rememberEmail", data.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      setSuccess(t("successMessage") || "تم تسجيل الدخول بنجاح! جاري التوجيه...");

      // تحديد المسار بناءً على الـ Role
      let targetPath = `/${locale}/dashboard`;
      if (userRole === "admin") targetPath += "/admin";
      else if (userRole === "teacher") targetPath += "/teacher";
      else targetPath += "/student";

      setTimeout(() => {
        router.refresh();
        router.push(targetPath);
      }, 1500);

    } catch (err) {
      console.error("Login logical error:", err);
      setError(t("errors.unexpectedError"));
      setLoading(false);
    }
  }, [locale, router, rememberMe, t, loading]);

  return (
    <section className={cn(
      "relative flex items-center justify-center min-h-screen overflow-hidden px-4 py-12",
      darkMode ? "bg-[#020617] text-white" : "bg-slate-50 text-slate-900"
    )}>
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={cn("absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20", darkMode ? "bg-purple-600" : "bg-purple-300")} />
        <div className={cn("absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20", darkMode ? "bg-blue-600" : "bg-blue-300")} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
        <div className={cn("p-8 rounded-[2.5rem] border backdrop-blur-xl shadow-2xl transition-all duration-500", darkMode ? "bg-white/5 border-white/10 shadow-purple-500/10" : "bg-white/90 border-slate-200 shadow-slate-300/20")}>
          
          <div className="flex flex-col items-center mb-8 text-center">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex items-center justify-center w-16 h-16 mb-4 shadow-xl rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500">
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="mb-1 text-3xl font-black tracking-tight">{t("title")}</h1>
            <p className={cn("text-sm font-medium", darkMode ? "text-slate-400" : "text-slate-500")}>{t("subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5" noValidate>
            <AnimatePresence mode="wait">
              {error && (
                <motion.div key="error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex gap-3 p-4 text-sm font-bold text-red-600 border border-red-200 rounded-2xl bg-red-50 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
                  <AlertCircle className="flex-shrink-0 w-5 h-5" />
                  <span>{error}</span>
                </motion.div>
              )}
              {success && (
                <motion.div key="success" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex gap-3 p-4 text-sm font-bold border text-emerald-600 border-emerald-200 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
                  <Sparkles className="flex-shrink-0 w-5 h-5" />
                  <span>{success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <InputField 
                label={t("email")} 
                type="email" 
                placeholder={t("emailPlaceholder")} 
                icon={<Mail size={20} />} 
                register={register("email")} 
                error={errors.email?.message} 
                darkMode={darkMode} 
                disabled={loading} 
            />

            <InputField 
                label={t("password")} 
                type={showPassword ? "text" : "password"} 
                placeholder={t("passwordPlaceholder")} 
                icon={<Lock size={20} />} 
                register={register("password")} 
                error={errors.password?.message} 
                darkMode={darkMode} 
                disabled={loading} 
                isPassword 
                showPassword={showPassword} 
                togglePassword={() => setShowPassword(!showPassword)} 
            />

            <div className="flex items-center justify-between px-1">
              <RememberMe checked={rememberMe} onChange={setRememberMe} label={t("rememberMe")} darkMode={darkMode} disabled={loading} />
              <a href={`/${locale}/auth/forgot-password`} className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400">{t("forgotPassword")}</a>
            </div>

            <button type="submit" disabled={loading} className={cn("group relative w-full py-4 rounded-2xl font-black text-sm transition-all overflow-hidden", "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] hover:bg-right text-white shadow-lg", "active:scale-[0.98] disabled:opacity-70 transition-all duration-500")}>
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /><span>{t("loggingIn")}...</span></> : <><span className="font-bold tracking-widest uppercase">{t("loginButton")}</span><ArrowRight className={cn("w-4 h-4", locale === "ar" && "rotate-180")} /></>}
              </div>
            </button>
          </form>
          {/* رابط إنشاء حساب جديد */}
<div className="mt-8 text-center">
  <p className={cn(
    "text-sm font-medium transition-colors duration-300",
    darkMode ? "text-slate-400" : "text-slate-500"
  )}>
    {t("noAccount")}{" "}  
    <a 
      href={`/${locale}/auth/register`} 
      className={cn(
        "font-black underline-offset-4 underline transition-all",
        darkMode ? "text-purple-400 hover:text-purple-300" : "text-blue-600 hover:text-blue-700"
      )}
    >
      {t("registerNow")}
    </a>
  </p>
</div>
        </div>
      </motion.div>
    </section>
  );
}

// --- مكونات فرعية محسنة ---
function InputField({ label, type, placeholder, icon, register, error, darkMode, disabled, isPassword, showPassword, togglePassword }: any) {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="space-y-2 text-left">
      {/* لجعل الليبل يتماشى مع اتجاه النص */}
      <label className={cn(
        "block text-[11px] font-black tracking-widest uppercase opacity-50",
        isAr ? "text-right mr-1" : "text-left ml-1"
      )}>
        {label}
      </label>
      
      <div className="relative group">
        {/* تم تغيير left-4 إلى start-4 لتدعم الاتجاهين */}
        <div className={cn(
          "absolute inset-y-0 start-4 flex items-center z-10 pointer-events-none",
          darkMode ? "text-slate-500 group-focus-within:text-purple-400" : "text-slate-400 group-focus-within:text-purple-600"
        )}>
          {icon}
        </div>

        <input 
          type={type} 
          placeholder={placeholder} 
          disabled={disabled} 
          {...register} 
          className={cn(
            "w-full py-4 rounded-2xl border-2 transition-all outline-none text-sm font-bold",
            // Padding الحقول يتغير حسب اللغة
            isAr ? "pr-12 pl-12 text-right" : "pl-12 pr-12 text-left",
            darkMode 
              ? "bg-slate-900/50 border-white/5 focus:border-purple-500/50 text-white" 
              : "bg-slate-50 border-slate-100 focus:border-purple-500 text-slate-900", 
            error && "border-red-500/50"
          )} 
        />

        {isPassword && (
          <button 
            type="button" 
            onClick={togglePassword} 
            // زر العين يتم وضعه في الجهة المقابلة للأيقونة (end-4)
            className="absolute inset-y-0 z-10 flex items-center end-4 text-slate-500 hover:text-purple-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p className={cn("text-[10px] font-bold text-red-500 uppercase", isAr ? "text-right mr-2" : "text-left ml-2")}>
          {error}
        </p>
      )}
    </div>
  );
}
function RememberMe({ checked, onChange, label, darkMode, disabled }: any) {
  return (
    <label className={cn("flex items-center gap-3 cursor-pointer group", disabled && "opacity-50")}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} disabled={disabled} className="sr-only" />
      <div className={cn("w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all", checked ? "bg-purple-600 border-purple-600" : "border-slate-300 dark:border-slate-700")}>
        {checked && <div className="w-2 h-2 bg-white rounded-sm" />}
      </div>
      <span className="text-[11px] font-black uppercase opacity-60 group-hover:opacity-100">{label}</span>
    </label>
  );
}