// @/components/Home/About.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const About = () => {
  const t = useTranslations("home.about");

  return (
    <section className="container flex flex-col items-center gap-16 px-5 py-24 mx-auto lg:px-16 lg:flex-row-reverse">
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-4xl font-bold text-purple-300 uppercase">
            {t("title")}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-800 to-purple-400" />
        </div>
        <p className="text-lg leading-relaxed text-slate-300">
          {t("description")}
        </p>

<button 
  onClick={() => {
    const element = document.getElementById('join-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  }}
  className="px-10 py-4 font-bold text-white transition-all rounded-full bg-gradient-to-r from-purple-600 to-purple-400 hover:shadow-lg hover:shadow-purple-700/50 active:scale-95"
>
  {t("button")}
</button>      </div>

      <div className="relative flex-1">
        <div className="relative bg-[#302C42] p-0 rounded-t-full rounded-bl-full border border-purple-800">
          <Image
            src="/about.svg"
            alt="ETECH AI Learning"
            width={600}
            height={500}
            className="object-cover rounded-t-full rounded-bl-full"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
