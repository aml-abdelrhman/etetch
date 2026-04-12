"use client";

import React, { useState } from "react"; 
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing"; 
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { BrainCircuit, Sparkles, PlayCircle, ArrowRight, X } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";

export const Hero = () => {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const darkMode = useAppStore((state) => state.darkMode);
  
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden pt-20",
        darkMode ? "bg-[#020617]" : "bg-white",
      )}
    >
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div
          className={cn(
            "absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 animate-pulse",
            darkMode ? "bg-purple-600" : "bg-purple-300",
          )}
        />
        <div
          className={cn(
            "absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 animate-pulse delay-700",
            darkMode ? "bg-blue-600" : "bg-blue-300",
          )}
        />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 mb-8 rounded-full border backdrop-blur-md shadow-sm",
              darkMode
                ? "bg-white/5 border-white/10 text-purple-400"
                : "bg-purple-50 border-purple-100 text-purple-600",
            )}
          >
            <Sparkles size={16} />
            <span className="text-sm font-bold tracking-wide uppercase">
              {t("Powered_by_AI")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "max-w-4xl mb-8 text-5xl font-black leading-[1.1] tracking-tight md:text-7xl lg:text-8xl",
              darkMode ? "text-white" : "text-slate-900",
            )}
          >
            {t("Learn_Faster_with")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              ETECH AI
            </span>
          </motion.h1>

          <motion.p
            className={cn(
              "max-w-2xl mb-12 text-lg font-medium leading-relaxed md:text-xl",
              darkMode ? "text-slate-400" : "text-slate-600",
            )}
          >
            {t("desc_1")}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center w-full gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/auth/register">
              <Button className="h-16 px-10 text-lg font-black transition-all bg-purple-600 shadow-xl rounded-2xl hover:bg-purple-700 hover:scale-105 active:scale-95 shadow-purple-500/25">
                {t("Get_Started_Now")}
                <ArrowRight
                  className={cn(
                    locale === "ar" ? "mr-2 rotate-180" : "ml-2"
                  )}
                />
              </Button>
            </Link>

            <Button
              onClick={() => setShowVideo(true)}
              variant="ghost"
              className={cn(
                "h-16 px-10 text-lg font-bold rounded-2xl transition-all border-2",
                darkMode
                  ? "border-slate-800 text-white hover:bg-white/5"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50",
              )}
            >
              <PlayCircle className={cn(locale === "ar" ? "ml-2" : "mr-2")} />
              {t("Watch_Demo")}
            </Button>
          </motion.div>

          {/* Floating Icons */}
          <div className="absolute inset-0 hidden pointer-events-none lg:block">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute p-4 border shadow-2xl top-1/3 left-10 rounded-2xl bg-white/5 backdrop-blur-xl border-white/10"
            >
              <BrainCircuit className="w-12 h-12 text-purple-500" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute p-5 border shadow-2xl bottom-1/4 right-20 rounded-3xl bg-white/5 backdrop-blur-xl border-white/10"
            >
              <Sparkles className="w-10 h-10 text-blue-500" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Modal (نافذة الفيديو المنبثقة) */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl overflow-hidden shadow-2xl aspect-video rounded-3xl bg-slate-900"
              onClick={(e) => e.stopPropagation()} // منع إغلاق النافذة عند الضغط على الفيديو نفسه
            >
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute z-10 p-2 text-white transition-colors rounded-full top-4 right-4 bg-white/10 hover:bg-white/20"
              >
                <X size={24} />
              </button>
              
              {/* فيديو يوتيوب عن المنصات التعليمية والذكاء الاصطناعي */}
              <iframe
                className="w-full h-full"
src="https://www.youtube.com/embed/hJP5GqnTrNo?autoplay=1"                title="ETECH Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t",
          darkMode ? "from-[#020617] to-transparent" : "from-white to-transparent",
        )}
      />
    </section>
  );
};