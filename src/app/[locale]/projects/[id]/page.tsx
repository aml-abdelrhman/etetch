import React from "react";
import ProjectDetailsHeroSection from "@/components/pages/projects/project-details/project-details-hero";
import UnitsSection from "@/components/pages/projects/project-details/units-section";
import GallarySection from "@/components/pages/projects/project-details/gallary-section";
import ProjectFeatures from "@/components/pages/projects/project-details/project-features";
import GuaranteesSection from "@/components/pages/projects/project-details/guarantees-section";
import NearToSection from "@/components/pages/projects/project-details/near-to-section";
import ProjectDiagrams from "@/components/pages/projects/project-details/project-diagrams-section";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { projectQueryOptions } from "@/queries";
import { Metadata } from "next";
import api from "@/lib/api";
import { Project } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;

  const response = await api.request.get<{ data: Project }>(
    `guest/projects/${id}`,
  );
  const item = response?.data;

  if (!item) return {};

  return {
    title: item.title[locale as keyof typeof item.title],
    description: item.description[locale as keyof typeof item.description],
    openGraph: {
      images: [{ url: item.gallery?.[0] }],
      title: item.title[locale as keyof typeof item.title],
      description: item.description[locale as keyof typeof item.description],
      type: "website",
      url: `https://hemma-front-fork.vercel.app/${locale}/projects/${id}`,
      siteName: "Hemma",
      locale: locale,
    },
    twitter: {
      images: [{ url: item.gallery?.[0] }],
      title: item.title[locale as keyof typeof item.title],
      description: item.description[locale as keyof typeof item.description],
      card: "summary_large_image",
      site: "@Hemma",
      creator: "@Hemma",
    },
    icons: {
      icon: "/logo.svg",
    },
  };
}
const ProjectDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery(projectQueryOptions(id));
  } catch (error) {
    console.error("Failed to prefetch project:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectDetailsHeroSection />
      <UnitsSection />
      <GallarySection />
      <ProjectFeatures />
      <NearToSection />
      <GuaranteesSection />
      <ProjectDiagrams />
    </HydrationBoundary>
  );
};

export default ProjectDetailsPage;
