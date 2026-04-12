"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { coursesQueryOptions } from "@/queries";
import type { IProfessionalLMS } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import { useAppStore } from "@/store/useStore";
import clsx from "clsx";
import Link from "next/link";

export default function CoursesPage() {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations();
  const darkMode = useAppStore((state) => state.darkMode);

  const pageSize = 6;
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const levels = {
    en: {
      All: "All",
      Beginner: "Beginner",
      Intermediate: "Intermediate",
      Advanced: "Advanced",
    },
    ar: {
      All: "الكل",
      Beginner: "مبتدئ",
      Intermediate: "متوسط",
      Advanced: "متقدم",
    },
  };
  const [level, setLevel] = useState<
    "All" | "Beginner" | "Intermediate" | "Advanced"
  >("All");
  const [category, setCategory] = useState<
    "All" | "Trending" | "New" | "Popular"
  >("All");

  // Fetch all courses
  const {
    data: allCourses,
    isLoading,
    isError,
  } = useQuery<IProfessionalLMS[]>(coursesQueryOptions());

  // Filter courses on the front-end
  const filteredCourses = useMemo(() => {
    if (!allCourses) return [];

    return allCourses.filter((course) => {
      const matchesSearch =
        !searchInput ||
        course.title[locale]?.toLowerCase().includes(searchInput.toLowerCase()) ||
        course.subject[locale]?.toLowerCase().includes(searchInput.toLowerCase());

      // التصفية بناءً على المستوى (Level)
      const matchesLevel = 
        level === "All" || 
        course.level.en === level;

      // التصفية بناءً على التصنيف (Category/Flags)
      const matchesCategory = 
        category === "All" || 
        (category === "Trending" && course.isTrending) ||
        (category === "New" && course.isNew) ||
        (category === "Popular" && course.isPopular);

      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [allCourses, searchInput, level, category, locale]);

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / pageSize);
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <div
      className={clsx(
        "min-h-screen pb-20 transition-colors duration-500",
        darkMode ? "bg-slate-950 text-white" : "bg-white text-gray-900",
      )}
    >
      <div className="container px-6 py-12 mx-auto">
        {/* Filters */}
        <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row">
          <input
            placeholder={t("Search courses")}
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setPage(1);
            }}
            className={clsx(
              "flex-1 p-4 rounded-3xl outline-none focus:ring-2 focus:ring-purple-600 transition-colors",
              darkMode
                ? "bg-slate-900 border-white/10 text-white"
                : "bg-gray-100 border-gray-300 text-gray-900",
            )}
          />

          <select
            value={level}
            onChange={(e) => {
              setLevel(e.target.value as any);
              setPage(1);
            }}
            className={clsx(
              "p-4 rounded-3xl outline-none focus:ring-2 focus:ring-purple-600 transition-colors",
              darkMode
                ? "bg-slate-900 border-white/10 text-white"
                : "bg-gray-100 border-gray-300 text-gray-900",
            )}
          >
            {["All", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
              <option key={lvl} value={lvl}>
                {t(lvl)}
              </option>
            ))}
          </select>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as any);
              setPage(1);
            }}
            className={clsx(
              "p-4 rounded-3xl outline-none focus:ring-2 focus:ring-purple-600 transition-colors",
              darkMode
                ? "bg-slate-900 border-white/10 text-white"
                : "bg-gray-100 border-gray-300 text-gray-900",
            )}
          >
            {["All", "Trending", "New", "Popular"].map((cat) => (
              <option key={cat} value={cat}>
                {t(cat)}
              </option>
            ))}
          </select>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[...Array(pageSize)].map((_, i) => (
              <div
                key={i}
                className={clsx(
                  "h-64 rounded-2xl animate-pulse",
                  darkMode ? "bg-slate-900" : "bg-gray-200",
                )}
              />
            ))}
          </div>
        ) : isError ? (
          <div className="mt-20 text-center text-red-500">
            {t("Failed to load courses")}
          </div>
        ) : paginatedCourses.length ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {paginatedCourses.map((course) => (
                <Link href={`/courses/${course.id}`}>
                  <div
                    key={course.id}
                    className={clsx(
                      "flex flex-col overflow-hidden transition-shadow duration-300 rounded-2xl shadow-lg hover:shadow-xl",
                      darkMode ? "bg-slate-900" : "bg-gray-100",
                    )}
                  >
                    <div className="relative w-full h-60">
                      <img
                        src={course.image}
                        alt={course.title[locale]}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex flex-col justify-between p-4 h-55">
                      <div>
                        <h2 className="mb-1 font-semibold text-md">
                          {course.title[locale]}
                        </h2>
                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-300">
                          {course.subject[locale]}
                        </p>
                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                          {t("Category")}: {course.category[locale]}
                        </p>
                        <div
                          className="flex justify-between mb-2 text-sm text-gray-500 dark:text-gray-400"
                          dir="ltr"
                        >
                          <span>
                            {t("Duration")}:       
                                       {typeof course.duration === 'string' 
                    ? course.duration 
                    : course.duration?.[locale]}
                          </span>
                          <span>
                            {t("Level")}: {course.level[locale]}
                          </span>
                        </div>
                      </div>

                      <hr className="my-2 border-gray-300 dark:border-gray-600" />

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <img
                            src={course.teacherImage || course.image}
                            alt={course.teacher[locale]}
                            className="object-cover rounded-full w-7 h-7"
                          />
                          <span className="text-sm">
                            {course.teacher[locale]}
                          </span>
                        </div>
                        <div className="text-sm font-bold">${course.price}</div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="font-semibold text-yellow-400">
                          {course.rating ?? "-"}⭐
                        </div>

                        {course.videoUrl ? (
                          <a
                            href={course.videoUrl} // يفتح رابط الفيديو للكورس
                            target="_blank" // يفتح في تاب جديد
                            rel="noopener noreferrer"
                            className={clsx(
                              "px-3 py-1 text-sm rounded-lg transition-colors",
                              darkMode
                                ? "bg-purple-600 text-white hover:bg-purple-700"
                                : "bg-purple-200 text-purple-900 hover:bg-purple-300",
                            )}
                          >
                            {t("Watch")}
                          </a>
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {t("No video")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={clsx(
                    "px-4 py-2 rounded-full transition-colors",
                    page === i + 1
                      ? "bg-purple-600 text-white"
                      : darkMode
                        ? "bg-slate-700 text-white hover:bg-slate-600"
                        : "bg-gray-200 text-gray-900 hover:bg-gray-300",
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-20 text-center text-gray-500 dark:text-gray-400">
            {t("No courses found")}
          </div>
        )}
      </div>
    </div>
  );
}
