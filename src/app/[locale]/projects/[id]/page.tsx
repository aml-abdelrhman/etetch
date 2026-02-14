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
const ProjectDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(projectQueryOptions(id));

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
