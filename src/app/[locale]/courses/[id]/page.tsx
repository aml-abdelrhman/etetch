import React from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { courseQueryOptions } from "@/queries";
import CourseDetailsClient from "@/components/pages/courses/CourseDetailsClient"; 

// تحديث الواجهة لتتوافق مع التغييرات الجديدة في Next.js
interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

const CourseDetailsPage = async ({ params }: PageProps) => {
  // فك الـ Promise الخاص بالـ params (ضروري جداً لإصلاح الخطأ الذي ظهر لكِ)
  const { id } = await params;
  
  const queryClient = new QueryClient();

  try {
    // تنفيذ الـ Prefetch للبيانات في السيرفر
    await queryClient.prefetchQuery(courseQueryOptions(id));
  } catch (error) {
    console.error("Failed to prefetch course:", error);
  }

  return (
    // تمرير حالة الـ queryClient المحملة مسبقاً للـ Client Component
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CourseDetailsClient />
    </HydrationBoundary>
  );
};

export default CourseDetailsPage;