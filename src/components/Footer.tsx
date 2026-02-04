"use client";
import React from "react";
import { Button } from "./ui/button";
import { ChevronUp, ChevronsLeft } from "lucide-react";
import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { FilesIcon, MapPinIcon, PhoneIcon, SmsTrackingIcon } from "@/icons";
import { useStore } from "@/store";

const Footer = () => {
  const { user } = useStore((store) => store);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const programs = [
    { name: "قيادي", id: "leadership" },
    { name: "تربوي", id: "educational" },
    { name: "تقني", id: "technical" },
    { name: "تطويري", id: "development" },
    { name: "إعلامي", id: "media" },
    { name: "تعليمي", id: "learning" },
  ];

  const importantLinks = [
    { name: "من نحن", href: "/#about" },
    { name: "الأرقام والإحصائيات", href: "/#statistics" },
    { name: "الفعاليات", href: "/calendars" },
    { name: "البرامج", href: "/programs" },
    { name: "الداعمين والدعاة", href: "/#supporters" },
    { name: "الأسئلة الشائعة", href: "/#faq" },
    { name: "تواصل معنا", href: "/#contact" },
  ];

  return (
    <>
      {/* Back to Top Button */}
      <Button
        onClick={scrollToTop}
        className="fixed left-20 bottom-20 w-14 h-14 rounded-2xl bg-main-600 hover:bg-main-600/90 flex items-center justify-center p-0 z-[20]"
      >
        <div className="w-8 h-8 rounded-full bg-white/23 backdrop-blur-[17px] flex items-center justify-center">
          <ChevronUp className="w-4 h-4 text-white" />
        </div>
      </Button>
      <footer className="relative bg-[#2A1F3E] text-white overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* main gradient blur - top right */}
          <div
            className="absolute -top-32 right-0 w-[707px] h-[715px] rounded-full bg-main-600 opacity-33 blur-[100px]"
            style={{ transform: "translate(273px, -275px)" }}
          />

          {/* secondary gradient blur - bottom left */}
          <div
            className="absolute bottom-0 -left-28 w-[707px] h-[636px] rounded-full bg-secondary-800 opacity-43 blur-[100px]"
            style={{ transform: "translate(-113px, 160px)" }}
          />

          {/* Geometric decoration - bottom right */}
          <div className="absolute bottom-0 right-0 opacity-70">
            <svg width="345" height="280" viewBox="0 0 227 187" fill="none">
              <path
                d="M157.957 0L64.5311 0C63.4699 0 62.5157 0.679111 62.0869 1.74384C61.6505 2.80561 61.8259 4.03864 62.5263 4.91026L108.908 62.2177C109.423 62.8466 110.138 63.2044 110.91 63.208C111.681 63.2115 112.396 62.8613 112.914 62.2354L159.951 4.92797C160.658 4.05931 160.844 2.81919 160.408 1.75092C159.98 0.686194 159.015 0 157.957 0Z"
                fill="white"
                fillOpacity="0.1"
              />
              <path
                d="M106.294 75.4082H10.742C9.68435 75.4082 8.73361 76.0802 8.2978 77.1343C7.8614 78.189 8.01906 79.4149 8.7088 80.2936L152.998 263.232C153.824 264.283 155.207 264.562 156.305 263.894C157.42 263.225 157.959 261.803 157.606 260.47L108.879 77.5312C108.532 76.2733 107.485 75.4082 106.294 75.4082Z"
                fill="white"
                fillOpacity="0.1"
              />
              <path
                d="M170.675 4.61079C169.932 4.61787 169.217 4.97218 168.717 5.58633L121.398 63.2303C120.69 64.0949 120.505 65.3427 120.934 66.4038C121.37 67.4686 122.328 68.1548 123.396 68.1548H220.703C221.783 68.1548 222.747 67.4544 223.176 66.3678C223.594 65.2742 223.391 64.027 222.647 63.1689L172.662 5.52493C172.144 4.92967 171.426 4.59661 170.675 4.61079Z"
                fill="#732B4F"
              />
              <path
                d="M49.9775 4.61079C49.2269 4.61787 48.5195 4.97218 48.0187 5.58633L0.69303 63.2303C-0.0215115 64.0949 -0.200438 65.3427 0.235373 66.4038C0.664098 67.4686 1.6296 68.1548 2.68724 68.1548H99.9871C101.077 68.1548 102.042 67.4544 102.471 66.3678C102.897 65.2742 102.682 64.027 101.939 63.1689L51.9576 5.52493C51.4467 4.92967 50.7281 4.59661 49.9775 4.61079Z"
                fill="#732B4F"
              />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-20 py-[74px]">
          <div className="flex justify-between flex-wrap mb-[71px] gap-8">
            {/* Info Section */}
            <div className="flex flex-col gap-6 w-[422px]">
              <div className="flex flex-col justify-center gap-7 w-full">
                {/* Logo placeholder */}
                <Link href="/">
                  <Image
                    src="/footer-logo.svg"
                    alt="footer logo"
                    className="w-full max-w-28"
                    width={112}
                    height={79}
                  />
                </Link>

                {/* Description */}
                <p style={{ textAlign: "justify" }} className="text-base text-white text-right leading-[174%]"> 
                  "ماسة" هي منصة أُطلقت في 23 أبريل 2024، تهدف إلى جمع البرامج
                  والمناشط الخاصة بالفتيات على مستوى المملكة في مكان واحد. توفر
                  بيئة رقمية راقية وآمنة تُمكّن الفتاة من الوصول إلى كل ما يعزز
                  نموها وتفاعلها المجتمعي. تحتوي على فعاليات تعرض البرامج
                  الحالية والقادمة، بالإضافة إلى بنك البرامج الذي يوثق البرامج
                  السابقة ليكون مصدرًا للإلهام والاستفادة.
                </p>
              </div>

              {/* Social Media & Register Button */}
              <div className="flex justify-between items-center w-full flex-wrap gap-5">
                {/* Social Media Icons */}
                <div className="flex items-center gap-6">
                  <div className="w-[52px] h-[52px] rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <FaTwitter className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-[52px] h-[52px] rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <FaInstagram className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-[52px] h-[52px] rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <FaFacebookF className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Register Button */}
                {!user && (
                  <Link href="/auth/login">
                    <Button
                      endContent={<FilesIcon className="size-6" />}
                      variant="secondary"
                      size="lg"
                      className="text-sm"
                    >
                      سجلى دخولك
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Important Links Section */}
            <div className="flex flex-col gap-8">
              <h3 className="text-2xl font-bold text-center w-full">
                الروابط المهمة
              </h3>

              <div className="flex flex-col justify-center gap-7 w-full">
                {importantLinks.map((link, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <ChevronsLeft className="size-4 text-main-600" />
                    <a
                      href={link.href}
                      className="text-base text-white hover:text-main-600 transition-colors"
                    >
                      {link.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Programs Section */}
            {/* <div className="flex flex-col gap-8 w-[145px]">
              <h3 className="text-2xl font-bold text-center">البرامج</h3>

              <div className="flex flex-col justify-center gap-7">
                {programs.map((program) => (
                  <div key={program.id} className="flex items-center gap-2">
                    <ChevronsLeft className="size-4 text-main-600" />
                    <span className="text-base text-white">{program.name}</span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Contact Section */}
            <div className="flex flex-col gap-8 w-[278px]">
              <h3 className="text-2xl font-bold text-center">تواصل معنا</h3>

              <div className="flex flex-col justify-between gap-8 w-full">
                {/* Email */}
                <div className="flex items-center gap-4 w-full px-4">
                  <div className="w-[52px] h-[52px] rounded-xl bg-white/5 flex items-center justify-center">
                    <SmsTrackingIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-base font-bold">
                      البريد الإلكترونى
                    </span>
                    <span className="text-xs font-medium text-[#E8E8E8]">
                      C.C.G@majlis-ngos.org.sa
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/12"></div>

                {/* Phone */}
                <div className="flex items-center gap-4 w-full px-4">
                  <div className="w-[52px] h-[52px] rounded-xl bg-white/5 flex items-center justify-center">
                    <PhoneIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-base font-bold">هاتفيا</span>
                    <span className="text-xs font-medium text-[#E8E8E8] underline">
                      0557646788
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/12"></div>

                {/* Address */}
                <div className="flex items-center gap-4 w-full px-4">
                  <div className="w-[52px] h-[52px] rounded-xl bg-white/5 flex items-center justify-center">
                    <MapPinIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-base font-bold">العنوان</span>
                    <span className="text-xs font-medium text-[#E8E8E8]">
                     السعودية - الرياض - حي الياسمين

                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="flex flex-col justify-center items-center gap-6 pb-8">
            {/* Divider */}
            <div className="w-full max-w-[1280px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {/* Copyright */}
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <div className="flex items-center gap-2 text-sm md:text-base">
                <span className="text-white/90 font-medium">
                  جميع الحقوق محفوظة {new Date().getFullYear()}©
                </span>
                <span className="text-secondary-600 font-bold">لمنصة ماسة</span>
              </div>

 
              <div className="flex items-center gap-2 text-sm md:text-base">
                <span className="text-white/70">تم التطوير بواسطة</span>
                <Link
                  href="https://www.soft-lab-tech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative font-bold transition-all duration-300"
                >
                  <span
                    className="relative z-10 bg-gradient-to-r from-[#2A59A8FF] to-[#0D809CFF] bg-clip-text text-transparent"
                  >
                    سوفت لاب للتقنية
                  </span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#179DBD] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </div>



            </div>

            
            {/* Additional branding */}
            {/* <div className="flex items-center gap-2 text-xs text-white/50">
              <span>منصة رقمية متخصصة في برامج الفتيات</span>
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
              <span>المملكة العربية السعودية</span>
            </div> */}
          </div>
        </div>
      </footer>{" "}
    </>
  );
};

export default Footer;
