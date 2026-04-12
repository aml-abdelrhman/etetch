"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { courseQueryOptions, userQueryOptions } from "@/queries";
import clsx from "clsx";
import { useAppStore } from "@/store/useStore";
import { useLocale, useTranslations } from "next-intl";
import { Course, User } from "@/types";
import toast, { Toaster } from "react-hot-toast";
import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CourseSyllabusPDF from "@/components/pdf/course-syllabus";

import {
  PlayCircle,
  Clock,
  BookOpen,
  Star,
  CheckCircle,
  Download,
  ChevronRight,
  Award,
  Layers,
  User as UserIcon,
} from "lucide-react";

export default function CourseDetails() {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations();
  const darkMode = useAppStore((state) => state.darkMode);
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const userId = session?.user?.id;

  // جلب بيانات المستخدم المحدثة من السيرفر للتأكد من حالة الاشتراك الحقيقية
  const { data: freshUser } = useQuery({
    ...userQueryOptions(userId),
    enabled: !!userId,
  });

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery(courseQueryOptions(id as string));

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );

  if (isError || !course)
    return (
      <div className="flex items-center justify-center min-h-screen font-bold text-red-500">
        {t("Course not found")}
      </div>
    );

  const isEnrolled = useMemo(
    () => freshUser?.enrolledCourses?.some((c) => c.id === course.id),
    [freshUser, course],
  );

  return (
    <div
      className={clsx(
        "min-h-screen pb-24 transition-colors duration-500",
        darkMode
          ? "bg-[#0f172a] text-slate-100"
          : "bg-[#f8fafc] text-slate-900",
      )}
    >
      <Toaster 
        position="top-center" 
        containerStyle={{ 
          zIndex: 99999999, // رفع القيمة لضمان الظهور فوق أي مكون
          top: 100 
        }} 
      />

      {/* Hero Section */}
      <div
        className={clsx(
          "relative w-full pt-12 pb-20 mb-12 border-b",
          darkMode
            ? "bg-slate-900/40 border-slate-800"
            : "bg-white border-slate-200",
        )}
      >
        <div className="container flex flex-col items-center gap-12 px-6 mx-auto md:px-12 lg:flex-row">
          <div className="lg:w-2/3">
            <div className="flex items-center gap-2 px-3 py-1 mb-6 text-sm font-bold text-purple-600 uppercase rounded-full bg-purple-100/50 w-fit dark:bg-purple-900/30 dark:text-purple-400">
              <Layers size={14} />
              <span>{course.subject[locale]}</span>
            </div>

            <h1 className="mb-6 text-4xl font-black leading-[1.2] md:text-5xl lg:text-6xl tracking-tight">
              {course.title[locale]}
            </h1>

            <div className="flex flex-wrap items-center gap-8 mb-10 text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2 font-bold text-yellow-500">
                <Star size={22} fill="currentColor" />
                <span className="text-xl">{course.rating ?? "4.8"}</span>
                <span className="text-sm font-medium text-slate-400">
                  ({t("reviews")})
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={22} className="text-purple-500" />
                <span className="font-semibold">
                  {typeof course.duration === 'string' 
                    ? course.duration 
                    : course.duration?.[locale]}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <BookOpen size={22} className="text-purple-500" />
                <span className="font-semibold">12 {t("Modules")}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <PDFDownloadLink
                document={
                  <CourseSyllabusPDF
                    course={course as Course}
                    locale={locale}
                  />
                }
                fileName={`Syllabus-${course.title[locale]}.pdf`}
                className="flex items-center gap-2 px-8 py-4 font-bold transition-all shadow-sm bg-slate-200 dark:bg-slate-800 rounded-2xl hover:bg-slate-300 dark:hover:bg-slate-700"
              >
                {({ loading }) => (
                  <>
                    <Download
                      size={20}
                      className={loading ? "animate-bounce" : ""}
                    />
                    {loading
                      ? t("Downloading...") || "Loading..."
                      : t("Download Syllabus")}
                  </>
                )}
              </PDFDownloadLink>
            </div>
          </div>

          {/* Video Preview */}
          <div className="relative w-full lg:w-1/3 group">
            <div className="relative z-10 overflow-hidden shadow-2xl border-8 border-white rounded-[2.5rem] dark:border-slate-800 aspect-square">
              {course.videoUrl ? (
                <video
                  src={course.videoUrl}
                  controls
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={course.image}
                    alt="Preview"
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="p-5 transition-transform bg-white rounded-full shadow-xl dark:bg-purple-600 group-hover:scale-110">
                      <PlayCircle
                        size={40}
                        className="text-purple-600 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container flex flex-col gap-16 px-6 mx-auto md:px-12 lg:flex-row">
        {/* Main Content (Left) */}
        <div className="space-y-16 lg:w-2/3">
          <section>
            <h2 className="flex items-center gap-3 mb-8 text-3xl font-black">
              <div className="w-1.5 h-10 bg-purple-600 rounded-full" />
              {t("Course Overview")}
            </h2>
            <div className="p-8 leading-relaxed border rounded-3xl bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
              <p className="text-lg leading-relaxed">
                {course.description?.[locale]}
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-8 text-3xl font-black">{t("Course Content")}</h2>
            <div className="overflow-hidden border rounded-[2rem] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              {[1, 2, 3].map((m, idx) => (
                <div
                  key={m}
                  className={clsx(
                    "p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer",
                    idx !== 2 &&
                      "border-b border-slate-100 dark:border-slate-800",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 font-bold text-purple-600 bg-purple-100 rounded-xl dark:bg-purple-900/40 dark:text-purple-400">
                      {m}
                    </div>
                    <span className="text-lg font-bold">
                      {t("Modules")} {m}
                    </span>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-8 text-3xl font-black">
              {t("Meet your instructor")}
            </h2>
            <div
              className={clsx(
                "p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center md:items-start",
                darkMode
                  ? "bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800"
                  : "bg-white border border-slate-200 shadow-sm",
              )}
            >
              <img
                src={course.teacherImage || course.image}
                className="object-cover w-32 h-32 shadow-xl rounded-3xl ring-4 ring-purple-500/10"
                alt="Teacher"
              />
              <div className="text-center md:text-start">
                <h3 className="mb-2 text-2xl font-black">
                  {typeof course.teacher === 'string' 
                    ? course.teacher 
                    : course.teacher?.[locale]}
                </h3>
                <div className="px-4 py-1.5 mb-6 text-sm font-bold text-purple-600 bg-purple-50 rounded-full dark:bg-purple-900/30 dark:text-purple-400 w-fit mx-auto md:mx-0 uppercase tracking-wide">
                  {t("Instructor")}
                </div>
                <p className="max-w-md text-lg italic leading-relaxed text-slate-500 dark:text-slate-400">
                  {t(
                    "Expert educator specializing in modern web architectures and frontend development.",
                  )}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar (Right) */}
        <div className="lg:w-1/3">
          <div
            className={clsx(
              "sticky top-12 p-10 rounded-[3rem] shadow-2xl border transition-all duration-300",
              darkMode
                ? "bg-slate-900 border-slate-800 shadow-purple-900/20"
                : "bg-white border-slate-100",
            )}
          >
            <div className="flex flex-col mb-8">
              <span className="mb-2 text-sm font-bold tracking-widest uppercase text-slate-400">
                {t("Level")}: {course.level[locale]}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black">${course.price}</span>
                <span className="text-lg font-medium line-through text-slate-400">
                  $299
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (!userId) {
                  toast.error(t("Please login to enroll"));
                  router.push(`/${locale}/auth/login`);
                  return;
                }
                
                if (isEnrolled) {
                  toast.error(t("Enrolled Already") || "You are already in this course");
                  return;
                }
                router.push(`/${locale}/payment/${id}`);
              }}
              className={clsx(
                "w-full py-5 rounded-[1.5rem] font-black text-xl shadow-lg transition-all active:scale-[0.98] mb-8",
                isEnrolled && userId
                  ? "bg-green-500 text-white cursor-default"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-500/25",
              )}
            >
              {isEnrolled && userId ? t("Enrolled Already") : t("Enroll Now")}
            </button>

            {/* Included Features */}
            <div className="pt-6 space-y-6 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-black tracking-[0.2em] text-center uppercase text-slate-400 mb-4">
                {t("This course includes")}
              </p>

              <div className="flex items-center gap-4 group">
                <div className="p-2 transition-colors rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <PlayCircle
                    size={20}
                    className="text-purple-600 dark:text-purple-400"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  35 {t("on-demand video")}
                </span>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-2 transition-colors rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <Clock
                    size={20}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {t("Lifetime access")}
                </span>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-2 transition-colors rounded-lg bg-green-50 dark:bg-green-900/20">
                  <Award
                    size={20}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {t("Certificate of completion")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
