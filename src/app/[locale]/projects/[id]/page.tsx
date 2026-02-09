import React from "react";
import ProjectDetailsHeroSection from "@/components/pages/projects/project-details/project-details-hero";
import UnitsSection from "@/components/pages/projects/project-details/units-section";
import GallarySection from "@/components/pages/projects/project-details/gallary-section";
import ProjectFeatures from "@/components/pages/projects/project-details/project-features";
import GuaranteesSection from "@/components/pages/projects/project-details/guarantees-section";
import NearToSection from "@/components/pages/projects/project-details/near-to-section";
import ProjectDiagrams from "@/components/pages/projects/project-details/project-diagrams-section";

const ProjectDetailsPage = () => {
  return (
    <>
      <ProjectDetailsHeroSection />
      <UnitsSection />
      <GallarySection />
      <ProjectFeatures />
      <NearToSection />
      <GuaranteesSection />
      <ProjectDiagrams />
    </>
  );
};

export default ProjectDetailsPage;
