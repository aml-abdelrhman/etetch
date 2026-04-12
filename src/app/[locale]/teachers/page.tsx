"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Search, Mail, CheckCircle, 
  RefreshCw, AlertCircle, LayoutGrid, ArrowRight
} from "lucide-react";
import { useAppStore } from "@/store/useStore";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { teachersQueryOptions } from "@/queries";
import { Link } from "@/i18n/routing";

export default function InstructorsPage() {
  const t = useTranslations("Instructors");
  const locale = useLocale() as "en" | "ar";
  const darkMode = useAppStore((state) => state.darkMode);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: teachers, isLoading, isError, refetch } = useQuery(
    teachersQueryOptions()
  );

  const filteredTeachers = teachers?.filter((teacher: any) => {
    const name = typeof teacher.name === "object" ? teacher.name[locale] : teacher.name;
    const bio = typeof teacher.bio === "object" ? teacher.bio[locale] : teacher.bio;
    return (
      name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bio?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (isLoading) return <LoadingState darkMode={darkMode} />;
  if (isError) return <ErrorState darkMode={darkMode} onRetry={refetch} t={t} />;

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-700 pb-32 overflow-hidden",
      darkMode ? "bg-[#020617] text-white" : "bg-white text-slate-900"
    )}>
      
      {/* --- Elegant Background Decorations --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-500/10 blur-[150px] rounded-full" />
      </div>

      {/* --- Hero Section --- */}
      <section className="relative px-6 pt-32 pb-16 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <LayoutGrid size={14} />
            {t("certified_mentors")}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-10"
          >
            {t("learn_from")}<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 to-indigo-800">
               {t("the_titans")}
            </span>
          </motion.h1>

          <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
             className="w-full max-w-2xl mt-4"
          >
            <div className={cn(
              "group flex items-center p-1.5 rounded-2xl border transition-all duration-500 focus-within:ring-4",
              darkMode ? "bg-white/5 border-white/10 focus-within:ring-indigo-500/20" : "bg-slate-100 border-slate-200 focus-within:ring-indigo-500/10"
            )}>
              <div className="flex items-center flex-1 px-5">
                <Search className="opacity-40" size={20} />
                <input 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t("search_placeholder")}
                  className="w-full px-4 py-4 text-sm font-bold bg-transparent outline-none placeholder:opacity-50"
                />
              </div>
              <button className="px-8 py-3.5 text-xs font-black text-white uppercase transition-all bg-indigo-600 rounded-xl hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-600/20">
                {locale === "ar" ? "بحث" : "Search"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Instructors Grid --- */}
      <section className="container relative z-10 px-6 mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredTeachers?.map((teacher: any, index: number) => (
              <InstructorCard key={teacher.id} teacher={teacher} locale={locale} darkMode={darkMode} index={index} t={t} />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

function InstructorCard({ teacher, locale, darkMode, index, t }: any) {
  const teacherName = typeof teacher.name === "object" ? teacher.name[locale] : teacher.name;
  const teacherBio = typeof teacher.bio === "object" ? teacher.bio[locale] : teacher.bio;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-[3rem] border transition-all duration-500",
        darkMode 
          ? "bg-slate-900/40 border-white/5 hover:border-indigo-500/40 hover:bg-slate-900" 
          : "bg-white border-slate-200 hover:border-indigo-500/30 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)]"
      )}
    >
      <div className="p-10">
        {/* Header: Identity */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="relative mb-6">
            <div className={cn(
                "w-28 h-28 overflow-hidden rounded-[2rem] transition-all duration-700 p-1 border-2",
                darkMode ? "border-indigo-500/20 group-hover:border-indigo-500" : "border-slate-100 group-hover:border-indigo-500"
            )}>
              <img 
                src={teacher.avatar || `https://i.pravatar.cc/150?u=${teacher.id}`} 
                alt={teacherName} 
                className="object-cover w-full h-full rounded-[1.8rem] grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
              />
            </div>
            <div className="absolute p-2 bg-indigo-600 border-4 shadow-xl -bottom-2 -right-2 rounded-2xl border-slate-900">
              <CheckCircle size={16} className="text-white" />
            </div>
          </div>
          
          <h3 className="text-2xl font-black tracking-tighter transition-colors group-hover:text-indigo-500">
            {teacherName}
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mt-3 line-clamp-2 max-w-[200px]">
             {teacherBio}
          </p>
        </div>

        {/* Stats Row */}
        <div className={cn(
            "flex items-center justify-between p-6 mb-10 rounded-3xl transition-all border",
            darkMode ? "bg-white/5 border-white/5 group-hover:bg-indigo-500/5" : "bg-slate-50 border-slate-100 group-hover:bg-indigo-500/5"
        )}>
          <div className="flex-1 text-center border-r border-indigo-500/10">
            <p className="text-xl font-black">{teacher.stats?.totalCourses || teacher.myCourses?.length || 0}</p>
            <p className="text-[8px] font-black uppercase tracking-widest opacity-40">{t("courses")}</p>
          </div>
          <div className="flex-1 text-center">
            <p className="flex items-center justify-center gap-1 text-xl font-black">
              {teacher.stats?.rating || 5} <Star size={16} className="text-indigo-500 fill-indigo-500" />
            </p>
            <p className="text-[8px] font-black uppercase tracking-widest opacity-40">{t("rating")}</p>
          </div>
        </div>

        {/* Action Buttons */}
        {/* Action Buttons */}
<div className="flex items-center gap-4">
  {/* هنا التعديل: ربط الزر بصفحة الكورسات */}
  <Link href="/courses" className="flex-1">
    <button className="w-full py-5 rounded-2xl bg-indigo-600 text-white font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-indigo-700 shadow-xl shadow-indigo-600/30 active:scale-[0.95] flex items-center justify-center gap-2">
      {t("explore_courses")}
      <ArrowRight size={14} />
    </button>
  </Link>

  <button className={cn(
    "p-5 rounded-2xl transition-all border group/btn",
    darkMode ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-white border-slate-200 hover:bg-slate-50"
  )}>
    <Mail size={20} className="transition-opacity opacity-40 group-hover/btn:opacity-100" />
  </button>
</div>
      </div>
      
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 transition-all duration-700 rounded-full bg-indigo-600/5 blur-3xl group-hover:bg-indigo-600/10" />
    </motion.div>
  );
}

function LoadingState({ darkMode }: any) {
  return (
    <div className={cn("h-screen flex items-center justify-center", darkMode ? "bg-[#020617]" : "bg-white")}>
      <div className="relative">
        <RefreshCw size={48} className="text-indigo-600 animate-spin" />
        <div className="absolute inset-0 blur-xl bg-indigo-600/20 animate-pulse" />
      </div>
    </div>
  );
}

function ErrorState({ darkMode, onRetry, t }: any) {
  return (
    <div className={cn("h-screen flex flex-col items-center justify-center p-6 text-center", darkMode ? "bg-[#020617]" : "bg-white")}>
       <div className="p-6 mb-6 rounded-full bg-red-500/10">
          <AlertCircle size={64} className="text-red-500" />
       </div>
       <h2 className="mb-4 text-3xl font-black tracking-tighter uppercase">{t("error_title")}</h2>
       <button 
          onClick={onRetry} 
          className="px-10 py-4 text-xs font-black tracking-widest text-white uppercase transition-all bg-indigo-600 rounded-2xl hover:bg-indigo-700 active:scale-95"
       >
        {t("retry")}
       </button>
    </div>
  );
}