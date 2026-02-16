"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { newsByIdQueryOptions } from "@/queries";
import { useLocale, useTranslations } from "next-intl";
import moment from "moment";
import { useParams } from "next/navigation";
import { FacebookIcon, LinkedinIcon, MailIcon, TwitchIcon } from "lucide-react";
import { WhatsAppIcon, XTwitterIcon } from "@/icons";

const NewsDetail = () => {
  const { id } = useParams() as { id: string };
  const t = useTranslations();
  const locale = useLocale();
  const { data: item } = useSuspenseQuery(newsByIdQueryOptions(id));

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
        <div className="container">
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

      <div className="container mt-7 space-y-3">
        <img
          src={item.image}
          alt={item.title[locale as keyof typeof item.title]}
          className="w-full aspect-video object-cover rounded-2xl"
        />
        <div className="py-3 border-y border-border flex items-center justify-between flex-wrap gap-5">
          <p>
            {t("Published on")}:{" "}
            <span className="text-muted-foreground">
              {moment(item.created_at).locale(locale).format("DD MMMM YYYY")}
            </span>
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="">
              <FacebookIcon className="size-6 text-blue-500" />
            </a>
            <a href="#" className="">
              <XTwitterIcon className="size-6 text-black" />
            </a>
            <a href="#" className="">
              <LinkedinIcon className="size-6 text-sky-600" />
            </a>
            <a href="#" className="">
              <WhatsAppIcon className="size-6 text-green-600" />
            </a>
            <a
              href={`mailto:?subject=${item.title[locale as keyof typeof item.title]}`}
              className=""
            >
              <MailIcon className="size-6" />
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto py-12 lg:py-20">
          <div className="prose prose-cyan lg:prose-xl max-w-none leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetail;
