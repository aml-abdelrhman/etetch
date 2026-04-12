"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Loader2, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import { getCourseById } from "@/queries"; 
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

// تدويل رسائل الخطأ في Zod
const getContactSchema = (t: any) => z.object({
  courseId: z.string().min(1, t("errors.courseRequired")),
  firstName: z.string().min(2, t("errors.firstNameShort")),
  lastName: z.string().min(2, t("errors.lastNameShort")),
  email: z.string().email(t("errors.invalidEmail")),
  phone: z.string().min(10, t("errors.phoneShort")),
  subject: z.string().min(5, t("errors.subjectRequired")),
  message: z.string().min(10, t("errors.messageShort")),
});

type ContactFormData = z.infer<ReturnType<typeof getContactSchema>>;

const JoinHydraForm = () => {
  const t = useTranslations("JoinForm");
  const locale = useLocale() as "en" | "ar";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [courses, setCourses] = useState<any[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses");
      }
    };
    fetchCourses();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(getContactSchema(t)),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const currentCourse = await getCourseById(data.courseId);

      const newEnrollment = {
        id: `reg_${Date.now()}`,
        userData: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        },
        subject: data.subject,
        message: data.message,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const updatedCourse = {
        ...currentCourse,
        enrollments: [...(currentCourse.enrollments || []), newEnrollment],
      };

      await axios.put(`/api/courses/${data.courseId}`, updatedCourse);

      queryClient.invalidateQueries({ queryKey: ["course", data.courseId] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });

      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="join-section" className="w-full py-24 px-5 lg:px-16 bg-[#302C42]" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto">
        <div className="bg-gradient-to-b from-[#211E2E] to-[#343045] rounded-[40px] md:rounded-[100px] p-8 md:p-20 border border-white/5 shadow-2xl relative overflow-hidden">
          
          {/* Hero Content */}
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-wider text-white uppercase md:text-5xl">
              {t("title")}
            </h2>
            <div className="h-px w-40 bg-gradient-to-r from-[#C0B7E8] to-[#8176AF] mx-auto mb-10" />
            <p className="text-2xl tracking-tight text-white md:text-3xl font-extralight">
              {t("subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid max-w-5xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
            
            {/* Custom Styled Select (Course Dropdown) */}
            <div className="relative flex flex-col gap-2 md:col-span-2">
              <select
                {...register("courseId")}
                className={cn(
                  "w-full bg-transparent border-2 rounded-full py-5 px-10 text-white outline-none transition-all duration-300 appearance-none cursor-pointer",
                  errors.courseId ? "border-red-500" : "border-white/20 focus:border-[#C0B7E8]",
                  locale === "ar" ? "text-right pr-10 pl-14" : "text-left pl-10 pr-14"
                )}
              >
                <option value="" className="bg-[#211E2E]">{t("placeholders.selectCourse")}</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id} className="bg-[#211E2E] text-white py-2">
                    {course.title[locale] || course.title.en}
                  </option>
                ))}
              </select>
              <ChevronDown className={cn(
                "absolute pointer-events-none top-6 text-white/50 transition-transform group-focus:rotate-180",
                locale === "ar" ? "left-8" : "right-8"
              )} />
              {errors.courseId && <span className="px-5 text-xs text-red-400">{errors.courseId.message}</span>}
            </div>

            {/* First Name & Last Name */}
            <div className="flex flex-col gap-2">
              <input
                {...register("firstName")}
                placeholder={t("placeholders.firstName")}
                className={cn(
                  "w-full bg-transparent border-2 rounded-full py-5 px-10 text-white outline-none transition-all duration-300",
                  errors.firstName ? "border-red-500" : "border-white/20 focus:border-[#C0B7E8]"
                )}
              />
              {errors.firstName && <span className="px-5 text-xs text-red-400">{errors.firstName.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <input
                {...register("lastName")}
                placeholder={t("placeholders.lastName")}
                className={cn(
                  "w-full bg-transparent border-2 rounded-full py-5 px-10 text-white outline-none transition-all duration-300",
                  errors.lastName ? "border-red-500" : "border-white/20 focus:border-[#C0B7E8]"
                )}
              />
              {errors.lastName && <span className="px-5 text-xs text-red-400">{errors.lastName.message}</span>}
            </div>

            {/* Email & Phone */}
            <div className="flex flex-col gap-2">
              <input
                {...register("email")}
                type="email"
                placeholder={t("placeholders.email")}
                className={cn(
                  "w-full bg-transparent border-2 rounded-full py-5 px-10 text-white outline-none transition-all duration-300",
                  errors.email ? "border-red-500" : "border-white/20 focus:border-[#C0B7E8]"
                )}
              />
              {errors.email && <span className="px-5 text-xs text-red-400">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <input
                {...register("phone")}
                placeholder={t("placeholders.phone")}
                className={cn(
                  "w-full bg-transparent border-2 rounded-full py-5 px-10 text-white outline-none transition-all duration-300",
                  errors.phone ? "border-red-500" : "border-white/20 focus:border-[#C0B7E8]"
                )}
              />
              {errors.phone && <span className="px-5 text-xs text-red-400">{errors.phone.message}</span>}
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <input
                {...register("subject")}
                placeholder={t("placeholders.subject")}
                className={cn(
                  "w-full bg-transparent border-2 rounded-full py-5 px-10 text-white outline-none transition-all duration-300",
                  errors.subject ? "border-red-500" : "border-white/20 focus:border-[#C0B7E8]"
                )}
              />
              {errors.subject && <span className="px-5 text-xs text-red-400">{errors.subject.message}</span>}
            </div>

            {/* Message Area */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <textarea
                {...register("message")}
                rows={5}
                placeholder={t("placeholders.message")}
                className={cn(
                  "w-full bg-transparent border-2 rounded-[35px] py-6 px-10 text-white outline-none transition-all duration-300 resize-none",
                  errors.message ? "border-red-500" : "border-white/20 focus:border-[#C0B7E8]"
                )}
              />
              {errors.message && <span className="px-10 text-xs text-red-400">{errors.message.message}</span>}
            </div>

            {/* Submit Button & Status */}
            <div className="flex flex-col items-center justify-center mt-6 md:col-span-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-gradient-to-r from-[#8176AF] to-[#C0B7E8] text-[#343045] font-bold py-5 px-20 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(192,183,232,0.3)] transition-all duration-300 uppercase tracking-widest text-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <> <Loader2 className="animate-spin" /> {t("status.submitting")} </>
                ) : (
                  t("submitBtn")
                )}
              </button>

              <div className="h-8 mt-4">
                {status === "success" && (
                  <div className="flex items-center gap-2 text-green-400 animate-bounce">
                    <CheckCircle2 size={20} />
                    <span>{t("status.success")}</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertCircle size={20} />
                    <span>{t("status.error")}</span>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JoinHydraForm;