"use client";

import { useQuery } from "@tanstack/react-query";
import { newsByIdQueryOptions } from "@/queries";
import { useLocale, useTranslations } from "next-intl";
import moment from "moment";
import { useParams } from "next/navigation";
import { FacebookIcon, LinkedinIcon, MailIcon, TwitchIcon } from "lucide-react";
import { WhatsAppIcon, XTwitterIcon } from "@/icons";
import EmptyState from "@/components/EmptyState";

const NewsDetail = () => {
  const { id } = useParams() as { id: string };
  const t = useTranslations();
  const locale = useLocale();
  const { data: item, isError } = useQuery(newsByIdQueryOptions(id));

  if (isError) {
    return (
      <div className="container py-20">
        <EmptyState type="error" title={t("Error fetching article")} />
      </div>
    );
  }

  const shareTitle = item?.title[locale as keyof typeof item.title] || "";
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://x.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`,
  };

  if (!item) return null;

  return (
    <section className="bg-white min-h-screen pb-20">
      <div className="bg-main-200 py-[20svh] relative">
        <img
          src="/section-bg-dark-caramel.svg"
          alt="Section Background"
          className="absolute top-0 start-0 w-fit z-5 pointer-events-none"
          width={898}
          height={459}
        />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <p className="text-cyan-950 font-medium tracking-wide uppercase text-lg">
              {t("Articles")}
            </p>
            <h1 className="section-title">
              {item.title[locale as keyof typeof item.title]}
            </h1>
          </div>
        </div>
      </div>

      <div className="container -mt-[9svh] space-y-3 z-30 relative">
        <img
          src={item.image}
          alt={item.title[locale as keyof typeof item.title]}
          className="w-full aspect-video object-cover rounded-2xl"
        />
        <div className="py-3 border-y border-border flex items-center justify-between  sm:gap-5">
          <p className="text-sm">
            {t("Published on")}:{" "}
            <span className="text-muted-foreground">
              {moment(item.created_at).locale(locale).format("DD MMMM YYYY")}
            </span>
          </p>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href={shareLinks.facebook}
              target="_blank"
              className="size-7 sm:size-9 rounded-full flex items-center justify-center bg-blue-500 text-white"
              rel="noopener noreferrer"
            >
              <FacebookIcon className="size-4 sm:size-5" />
            </a>
            <a
              href={shareLinks.twitter}
              target="_blank"
              className="size-7 sm:size-9 rounded-full flex items-center justify-center bg-black"
              rel="noopener noreferrer"
            >
              <XTwitterIcon className="size-4 sm:size-5" />
            </a>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              className="size-7 sm:size-9 rounded-full flex items-center justify-center bg-sky-600 text-white"
              rel="noopener noreferrer"
            >
              <LinkedinIcon className="size-4 sm:size-5" />
            </a>
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              className="size-7 sm:size-9 rounded-full flex items-center justify-center bg-green-600 text-white"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-4 sm:size-5" />
            </a>
            <a
              href={shareLinks.email}
              className="size-7 sm:size-9 rounded-full flex items-center justify-center bg-primary text-white"
            >
              <MailIcon className="size-4 sm:size-5" />
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto py-9 lg:py-14">
          <article className="article prose prose-cyan lg:prose-xl max-w-none leading-relaxed prose-img:rounded-lg! dark:prose-invert">
            <div
              dangerouslySetInnerHTML={{
                __html: item.content[locale as keyof typeof item.content],
              }}
            />
          </article>
        </div>
      </div>
    </section>
  );
};

export default NewsDetail;
