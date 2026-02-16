'use client'
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { projectQueryOptions } from "@/queries";
import Image from "next/image";

const ProjectFeatureCard = ({ title }: { title: string }) => {
  return (
    <Card className="border-0 rounded-xl">
      <CardContent className="space-y-3 text-center flex flex-col items-center justify-center">
        <CheckIcon className="bg-main-700 text-white p-1 rounded-full size-9" />
        <h2 className="text-lg sm:text-xl text-main-700">{title}</h2>
      </CardContent>
    </Card>
  );
};

const ProjectFeatures = () => {
  const t = useTranslations();
  const locale = useLocale() as "ar" | "en";
  const { id } = useParams<{ id: string }>();
  const { data: project } = useQuery(projectQueryOptions(id));

  if (!project) return null;

  return (
    <section className="min-h-[90svh] bg-main-50 relative">
      <Image
        src="/section-bg-caramel.svg"
        alt="Section Background"
        className="absolute top-0 w-fit start-0 z-5 pointer-events-none"
        width={898}
        height={459}
      />
      <div className="container py-[17svh] relative z-10  ">
        <div className="flex items-center gap-3 max-sm:flex-col mb-[7svh]">
          <img
            src="/section-logo.svg"
            alt="Section Logo"
            className="pointer-events-none"
          />
          <h2 className="section-title">{t("Project characteristics")}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-5">
          {project.features.map((feature, index) => (
            <ProjectFeatureCard key={index} title={feature[locale]} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectFeatures;
