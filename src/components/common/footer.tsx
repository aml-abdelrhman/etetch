"use client";

import { useTranslations, useLocale } from "next-intl";
import { Button } from "../ui/button";
import { Link } from "@/i18n/navigation";
import { 
  InstagramIcon, 
  SnapchatIcon, 
  TikTokIcon, 
  XTwitterIcon, 
  YoutubeIcon 
} from "@/icons";
// استيراد الأيقونات من lucide-react لروابط التنقل
import { 
  BookOpen, 
  User, 
  GraduationCap 
} from "lucide-react"; 
import { useAppStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

const Footer = () => {
  const t = useTranslations("footer");
  const locale = useLocale();
  const { darkMode } = useAppStore();

  // مصفوفة الروابط الجديدة المطلوبة مع أيقوناتها
  const navigationLinks = [
    { 
      label: locale === "ar" ? "الدورات" : "Courses", 
      href: "/courses", 
      Icon: BookOpen 
    },
    { 
      label: locale === "ar" ? "عن المنصة" : "About", 
      href: "/about", 
      Icon: User 
    },
    { 
      label: locale === "ar" ? "المدرسون" : "Teachers", 
      href: "/teachers", 
      Icon: GraduationCap 
    },
  ];

  const socialIcons = [
    { Icon: InstagramIcon, href: "https://instagram.com" },
    { Icon: XTwitterIcon, href: "https://twitter.com" },
    { Icon: YoutubeIcon, href: "https://youtube.com" },
    { Icon: SnapchatIcon, href: "https://snapchat.com" },
    { Icon: TikTokIcon, href: "https://tiktok.com" },
  ];

  return (
    <footer
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cn(
        "relative overflow-hidden antialiased border-t",
        darkMode ? "bg-slate-900 text-white border-white/5" : "bg-white text-slate-900 border-slate-200"
      )}
    >
      <div className="container relative z-10 grid gap-8 px-16 py-16 mx-auto lg:py-24 lg:grid-cols-3">
        
        {/* Logo & Description */}
        <div className="space-y-6">
          <h1 className="text-3xl font-black tracking-tighter text-purple-600">ETECH</h1>
          <p className="text-base leading-relaxed opacity-80 md:text-lg">
            {t("description")}
          </p>
          <Link href="/register-interest" className="inline-block">
            <Button
              className={cn(
                "px-8 py-6 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95",
                "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/20"
              )}
            >
              {t("registerYourInterest")}
            </Button>
          </Link>
        </div>

        {/* Navigation - No Blog, With Icons Side-by-Side */}
        <div className="flex flex-col gap-4 mt-6 lg:mt-0 lg:items-center">
          <div>
            <h3 className="mb-4 text-lg font-bold tracking-widest text-purple-600 uppercase">
              {locale === "ar" ? "التنقل" : "Navigation"}
            </h3>
            <div className="flex flex-col gap-3">
              {navigationLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.href as any} 
                  className="flex items-center gap-2.5 transition-colors hover:text-purple-500"
                >
                  {/* الأيقونة بجوار النص مباشرة كما طلبتِ */}
                  <link.Icon size={18} className="text-purple-600" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col gap-6 lg:items-end">
          <div className={cn("flex flex-col gap-4", locale === "ar" ? "lg:items-start" : "lg:items-end")}>
            <h3 className="text-lg font-bold tracking-widest text-purple-600 uppercase">
              {locale === "ar" ? "تابعنا" : "Follow Us"}
            </h3>
            <div className="flex gap-4">
              {socialIcons.map(({ Icon, href }, idx) => (
                <Link key={idx} href={href} target="_blank" rel="noopener noreferrer" className="transition-transform hover:-translate-y-1">
                  <Icon
                    className={cn(
                      "w-6 h-6",
                      darkMode ? "text-slate-400 hover:text-purple-400" : "text-slate-600 hover:text-purple-600"
                    )}
                  />
                </Link>
              ))}
            </div>
            
            <div className={cn("space-y-2 mt-4", locale === "ar" ? "text-right" : "text-left")}>
              <p className="text-sm font-medium opacity-70">{t("contactUs")}: 920014659</p>
              <div className="flex flex-wrap gap-4 text-xs font-bold">
                <Link href="/privacy-policy" className="hover:text-purple-500 underline-offset-4 hover:underline">{t("privacyPolicy")}</Link>
                <Link href="/terms-and-conditions" className="hover:text-purple-500 underline-offset-4 hover:underline">{t("termsAndConditions")}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className={cn(
        "border-t py-8 text-center",
        darkMode ? "border-white/5 bg-slate-950/50" : "border-slate-100 bg-slate-50"
      )}>
        <p className="text-xs font-medium tracking-wide opacity-60">
          {t('copyright')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;