"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { newsByIdQueryOptions } from "@/queries";
import { useLocale, useTranslations } from "next-intl";
import moment from "moment";
import { useParams } from "next/navigation";

const NewsDetail = () => {
  const { id } = useParams() as { id: string };
  const t = useTranslations();
  const locale = useLocale();
  const { data: item } = useSuspenseQuery(newsByIdQueryOptions(id));

  if (!item) return null;

  return (
    <section className="bg-white min-h-screen pb-20">
      <div className="bg-main-200 py-20 lg:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <p className="text-main-900 font-medium tracking-wide uppercase text-sm">
              {t("Articles")}
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-cyan-950 leading-tight">
              {item.title[locale as keyof typeof item.title]}
            </h1>
            <div className="flex items-center justify-center gap-3 text-cyan-950/40 text-sm">
              <span>
                {moment(item.created_at).locale(locale).format("DD MMMM YYYY")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container -mt-10 lg:-mt-16">
        <div className="max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-xl border border-gray-100">
          <img
            src={item.image}
            alt={item.title[locale as keyof typeof item.title]}
            className="w-full aspect-video object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto py-12 lg:py-20">
          <div className="prose prose-cyan lg:prose-xl max-w-none text-cyan-950/80 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetail;
