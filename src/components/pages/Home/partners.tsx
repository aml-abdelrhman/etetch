"use client";

import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Globe, Laptop, Award } from "lucide-react";

export default function DistanceLearningProcess() {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("distance_learning");
  const darkMode = useAppStore((state) => state.darkMode);
  const isAr = locale === "ar";

  const processSteps = [
    { id: "01", key: "step1", icon: Laptop },
    { id: "02", key: "step2", icon: Globe },
    { id: "03", key: "step3", icon: BookOpen },
    { id: "04", key: "step4", icon: Award },
  ];

  return (
    <div className={cn(
      "py-24 space-y-20 overflow-hidden min-h-screen flex flex-col justify-center transition-colors duration-500",
      darkMode ? "bg-[#1A1723] text-white" : "bg-white text-slate-900"
    )}>
      
      <section className={cn("max-w-7xl mx-auto px-8 relative", isAr ? "rtl text-right" : "ltr text-left")}>
        
        <div className="grid items-start grid-cols-1 gap-12 mb-32 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className={cn(
                "text-4xl font-black tracking-tighter uppercase md:text-6xl",
                darkMode ? "text-white" : "text-[#211E2E]"
              )}>
                {t("main_title")}
              </h2>
              <div className="flex items-center gap-4">
                 <span className={cn(
                   "text-2xl md:text-3xl font-extralight tracking-[0.4em] uppercase",
                   darkMode ? "text-[#C0B7E8]" : "text-[#8176AF]"
                 )}>
                   {t("sub_title")}
                 </span>
                 <ArrowRight className={cn("w-12 md:w-24 h-8", darkMode ? "text-[#C0B7E8]" : "text-[#8176AF]", isAr && "rotate-180")} />
              </div>
            </div>
            
            <p className={cn(
              "max-w-xl text-lg font-light leading-relaxed",
              darkMode ? "text-white/60" : "text-slate-600"
            )}>
              {t("detailed_description_1")}
            </p>
          </div>

          <div className={cn(
            "space-y-6 p-8 rounded-[2rem] backdrop-blur-sm border transition-all",
            darkMode ? "bg-[#211E2E]/60 border-white/5" : "bg-slate-100 border-slate-200"
          )}>
            <p className={cn(
              "font-normal leading-loose text-md",
              darkMode ? "text-white/80" : "text-slate-700"
            )}>
              {t("detailed_description_2")}
            </p>
            <div className={cn(
              "flex gap-4 items-center font-bold",
              darkMode ? "text-[#C0B7E8]" : "text-[#8176AF]"
            )}>
              <div className={cn("h-[2px] w-12", darkMode ? "bg-[#C0B7E8]" : "bg-[#8176AF]")} />
              <span>{t("efficiency_tag")}</span>
            </div>
          </div>
        </div>

        <div className="relative px-8 mx-auto my-10 max-w-7xl">
          <div className={cn(
            "h-[1px] w-full bg-gradient-to-r from-transparent to-transparent opacity-40",
            darkMode ? "via-[#C0B7E8]" : "via-[#8176AF]"
          )} />
          <div className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-[2px] blur-[2px] opacity-50",
            darkMode ? "bg-[#C0B7E8]" : "bg-[#8176AF]"
          )} />
        </div>

        <div className="relative flex flex-col items-center justify-between gap-20 mt-20 md:flex-row md:gap-4">
          
          <div className="absolute inset-0 z-0 hidden pointer-events-none md:block" dir="ltr">
            <svg width="100%" height="100%" viewBox="0 0 1000 100" fill="none">
              <path 
                d="M50,50 Q250,-50 500,50 T950,50" 
                stroke={darkMode ? "#C0B7E8" : "#8176AF"} 
                strokeWidth="2" 
                strokeDasharray="12 12" 
                className="opacity-20"
              />
            </svg>
          </div>

          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className={cn(
                "relative z-10 flex flex-col items-center group md:w-1/4 transition-all duration-700",
                idx % 2 === 0 ? "md:translate-y-10" : "md:-translate-y-10"
              )}>
                <div className="relative flex items-center justify-center w-32 h-32 mb-10 md:w-36 md:h-36">
                  <div className={cn(
                    "absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    darkMode ? "bg-[#C0B7E8]/20" : "bg-[#8176AF]/10"
                  )} />
                  
                  <div className={cn(
                    "absolute inset-0 rounded-full p-[4px] shadow-xl transition-all",
                    darkMode 
                      ? "bg-gradient-to-br from-[#8176AF] to-[#C0B7E8] shadow-[0_0_40px_rgba(129,118,175,0.2)]" 
                      : "bg-gradient-to-br from-[#343045] to-[#8176AF] shadow-lg"
                  )}>
                    <div className={cn(
                      "w-full h-full rounded-full flex flex-col items-center justify-center transition-colors",
                      darkMode ? "bg-[#1A1723]" : "bg-white"
                    )}>
                      <Icon className={cn(
                        "w-6 h-6 mb-1 transition-colors",
                        darkMode ? "text-[#C0B7E8]/50 group-hover:text-[#C0B7E8]" : "text-slate-400 group-hover:text-[#8176AF]"
                      )} />
                      <span className={cn(
                        "text-4xl font-black transition-transform md:text-5xl group-hover:scale-110",
                        darkMode ? "text-white" : "text-[#211E2E]"
                      )}>
                        {step.id}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 space-y-3 text-center">
                  <h4 className={cn(
                    "text-xl font-bold transition-colors",
                    darkMode ? "text-white group-hover:text-[#C0B7E8]" : "text-[#211E2E] group-hover:text-[#8176AF]"
                  )}>
                    {t(`steps.${step.key}.title`)}
                  </h4>
                  <p className={cn(
                    "text-sm font-light leading-relaxed max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    darkMode ? "text-white/50" : "text-slate-500"
                  )}>
                    {t(`steps.${step.key}.desc`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}