"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { trendingCoursesQueryOptions } from "@/queries";
import { Link } from "@/i18n/routing";

const TrendingCourses = () => {
  const t = useTranslations();
  const h = useTranslations("home.trending");
  const locale = useLocale() as "en" | "ar";

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery(trendingCoursesQueryOptions());

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="py-10 font-bold text-center text-red-500">
        Error Loading
      </div>
    );

  return (
    <section
      className="container px-5 py-24 mx-auto lg:px-16"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-4xl font-bold text-white uppercase">
          {/* تأكدي من المسار الكامل أو نص ثابت كاحتياط */}
          {h.raw("title") ? h("title") : "Trending Courses"}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-purple-800 to-purple-400" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {courses?.map((course: any) => {
          // تأمين النصوص القادمة من الـ API
          const courseTitle =
            course.title?.[locale] || course.title?.en || "Course";
          const courseDesc =
            course.description?.[locale] || course.description?.en || "";

          return (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="block"
            >
              <div className="bg-[#211E2E] p-6 rounded-[40px] border border-purple-800/30 transition-all hover:border-purple-500 group flex flex-col items-center text-center cursor-pointer">
                <div className="relative w-40 h-40 rounded-full border-[10px] border-[#00000040] overflow-hidden mb-6 shrink-0">
                  <Image
                    src={course.image || "/etech.png"}
                    alt={courseTitle}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <h3 className="mb-3 text-xl font-bold text-white min-h-[56px] flex items-center justify-center">
                  {courseTitle}
                </h3>

                <p className="mb-6 text-sm text-slate-400 line-clamp-3 h-[60px]">
                  {courseDesc}
                </p>

                {/* بدل button */}
                <div className="w-full mt-auto px-8 py-3 font-bold text-white rounded-full bg-gradient-to-r from-[#8176AF] to-[#BC10D8] uppercase text-center">
                  {h.raw("button") ? h("button") : "Enroll Now"}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default TrendingCourses;
