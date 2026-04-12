"use client";

import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const ContactInfoBar = () => {
  const t = useTranslations("home.stats");

  const infoItems = [
    { 
      icon: MapPin, 
      title: t("location"), 
      sub: "Union St, Seattle, WA 98101", 
      link: "https://maps.google.com" 
    },
    { 
      icon: Phone, 
      title: t("call"), 
      sub: "(110) 1111-1010", 
      link: "tel:11011111010" 
    },
    { 
      icon: Mail, 
      title: t("message"), 
      sub: "Contact@HydraVTech.com", 
      link: "mailto:Contact@HydraVTech.com" 
    },
  ];

  return (
    <section className="w-full py-10 px-5 lg:px-16 bg-[#302C42]">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-[#343045] via-[#C0B7E8]/10 to-[#343045] rounded-full p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-10 border border-white/5 shadow-2xl backdrop-blur-sm">
          {infoItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 transition-all cursor-pointer group hover:opacity-80"
              >
                <item.icon className="text-[#C0B7E8] w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-white md:text-2xl">{item.title}</h3>
                  <p className="text-sm font-light text-slate-300 md:text-base">{item.sub}</p>
                </div>
              </a>
              {idx !== infoItems.length - 1 && (
                <div className="hidden w-px h-16 lg:block bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoBar;