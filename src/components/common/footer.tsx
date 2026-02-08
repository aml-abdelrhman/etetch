import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  InstagramIcon,
  SnapchatIcon,
  TikTokIcon,
  XTwitterIcon,
  YoutubeIcon,
} from "@/icons";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations();
  return (
    <footer className="bg-main-600 py-[35svh]  sm:py-[10svh] relative overflow-hidden font-cairo text-primary-foreground">
      <img
        src="/footer-bg.svg"
        alt="footer-img"
        className="absolute bottom-0 end-0 z-5 pointer-events-none"
      />
      <img
        src="/footer-img.svg"
        alt="footer-img"
        className="absolute top-0 start-0 z-5 pointer-events-none"
      />
      <div className="absolute top-[28%] start-0 z-12 pointer-events-none w-full h-14 bg-linear-to-b from-transparent to-main-600 sm:hidden" />
      <div className="container">
        <div className="relative z-10 grid md:grid-cols-2 gap-3">
          <div className=""></div>
          <div className="space-y-7">
            <Image
              src="/logo.svg"
              alt="footer-logo"
              width={120}
              height={40}
              className="w-full h-auto max-w-30"
            />
            <p className="text-lg">{t("footer.description")}</p>
            <Button variant="link" size="lg" className="font-inter">
              {t("Register your interest")}
            </Button>
          </div>
        </div>
      </div>
      <div className="container absolute bottom-7 start-[1%] sm:start-[10%] w-full z-5 flex items-center justify-between text-sm flex-wrap max-sm:gap-5">
        <div className="flex items-center gap-3">
          <InstagramIcon className="size-7 text-transparent" />
          <XTwitterIcon className="size-7 text-transparent" />
          <YoutubeIcon className="size-7 text-transparent" />
          <SnapchatIcon className="size-7 text-transparent" />
          <TikTokIcon className="size-7 text-transparent" />
        </div>
        <p>{t("footer.copyright")}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <p>{t("Department/Service Number")}: 920014659</p>
          <Link className="underline" href="/privacy-policy">{t("Privacy Policy")}</Link>
          <Link className="underline" href="/terms-and-conditions">{t("Terms and Conditions")}</Link>
          <Link className="underline" href="/company-location">{t("Company location")}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
