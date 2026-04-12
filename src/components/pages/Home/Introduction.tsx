"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const IntroSection = () => {
  const t = useTranslations("home.introduction");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <section className="w-full py-24 px-5 lg:px-16 bg-[#302C42]" dir={isRtl ? "rtl" : "ltr"}>
      <div className="container flex flex-col items-center justify-between gap-12 mx-auto lg:flex-row">
        
        {/* Left Side: Title & Arrow */}
        <div className="flex flex-col w-full gap-4 lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase leading-[1.2]">
            {t("title")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0B7E8] to-[#8176AF]">
              {t("subtitle")}
            </span>
          </h2>
          
          <div className="flex items-center gap-6 mt-4">
            <div className="hidden md:block h-px w-48 bg-gradient-to-r from-[#C0B7E8] to-transparent opacity-50" />
            <div className="w-12 h-12 rounded-full border border-[#C0B7E8]/50 flex items-center justify-center group cursor-pointer hover:bg-[#C0B7E8]/10 transition-colors">
              <ArrowRight className={`text-[#C0B7E8] w-6 h-6 transition-transform ${isRtl ? "rotate-180" : ""}`} />
            </div>
          </div>
        </div>

        {/* Right Side: Description */}
        <div className="w-full lg:w-1/2">
          <p className="text-lg font-light leading-relaxed text-slate-300 md:text-xl">
            {t("description")}
          </p>
        </div>

      </div>
    </section>
  );
};

export default IntroSection;