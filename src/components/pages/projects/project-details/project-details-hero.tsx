"use client";
import { Button } from "@/components/ui/button";
import { AreaIcon, WhatsAppIcon } from "@/icons";
import { Building2Icon, HouseIcon, MapPin, PhoneIcon } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { projectQueryOptions } from "@/queries";
import { Link } from "@/i18n/navigation";
import { cn, formatNumber } from "@/lib/utils";
import EmptyState from "@/components/EmptyState";

const FeatureCard = ({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon: React.ComponentType<{ className?: string }>;
}) => {
  return (
    <div className="flex items-center gap-3 min-w-fit w-full">
      <div className="rounded-full p-2 h-8 lg:h-10 w-8 lg:w-10 border border-white glass-bg flex items-center justify-center">
        <Icon className="size-6" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-start">{label}</p>
        <p className="text-lg md:text-xl 2xl:text-2xl font-medium text-center">
          {value}
        </p>
      </div>
    </div>
  );
};

const ProjectDetailsHeroSection = () => {
  const t = useTranslations();
  const locale = useLocale() as "ar" | "en";
  const { id } = useParams<{ id: string }>();
  const { data: project, isError } = useQuery(projectQueryOptions(id));
  console.log("project", project);

  if (isError) {
    return (
      <div className="container py-20">
        <EmptyState type="error" title={t("Error fetching project")} />
      </div>
    );
  }

  if (!project) return null;

  const projectDetails = [
    {
      label: t("Rooms"),
      value: project?.rooms,
      icon: HouseIcon,
      hasBackground: true,
    },
    {
      label: t("Price from"),
      value: formatNumber(Number(project?.price_from)),
      icon: Building2Icon,
      hasBackground: true,
    },
    {
      label: t("Unit types"),
      value: project?.unit_types?.[locale],
      icon: HouseIcon,
      hasBackground: true,
    },
    {
      label: t("Project status"),
      value: t(project?.status),
      icon: Building2Icon,
      hasBackground: true,
    },
    {
      label: t("City"),
      value: project?.city?.[locale],
      icon: MapPin,
      hasBackground: false,
    },
    {
      label: t("Area"),
      value: project?.area,
      icon: AreaIcon,
      hasBackground: true,
    },
  ];

  return (
    <section
      className={cn("bg-top bg-cover bg-no-repeat min-h-svh w-full relative")}
      style={{
        backgroundImage:
          project && project?.gallery?.[0]
            ? `url('${project?.gallery?.[0]}')`
            : "url('/hero-img.svg')",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-[15svh] bg-linear-to-b from-[#897E6F] to-transparent z-5" />
      <div className="h-[43svh]"></div>
      <div className="space-y-11 text-center text-white container z-10 relative py-[10svh]">
        <h1 className="font-light text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl">
          {project?.title?.[locale]}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 nd:gap-6 xl:gap-9 place-items-center">
          {projectDetails.map((projectDetail, index) => (
            <FeatureCard
              key={index}
              label={projectDetail.label}
              value={projectDetail.value}
              Icon={projectDetail.icon}
            />
          ))}
        </div>
        <div className="flex items-center justify-center max-md:flex-wrap -space-x-0.5 max-md:gap-5">
          <Button
            size="lg"
            className="max-md:w-full min-h-15 sm:min-h-17 sm:text-lg z-5 hover:bg-card hover:text-primary hover:border-transparent"
            variant="outline"
          >
            <a href={project?.project_questions_link} target="_blank">
              {t("Have an inquiry about a project")}
            </a>
          </Button>
          <div className="max-md:hidden h-5 sm:h-7 w-2 bg-card -me-1 -ms-0.5 shrink-0 -z-1" />
          <Button
            size="lg"
            className="max-md:w-full min-h-15 sm:min-h-17 sm:text-lg hover:bg-card overflow-hidden"
            variant="secondary"
            endContent={<PhoneIcon className="size-5" />}
          >
            <a href={project?.project_phone_link} target="_blank">
              {t("Phone call")}
            </a>
          </Button>
          <div className="max-md:hidden h-5 sm:h-7 w-2 bg-card -mx-1 shrink-0" />
          <Button
            size="lg"
            className="max-md:w-full min-h-15 sm:min-h-17 sm:text-lg hover:bg-card overflow-hidden"
            variant="secondary"
            endContent={<WhatsAppIcon className="size-6" />}
          >
            <a href={project?.project_file_link} target="_blank">
              {t("Receive project file")}
            </a>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[60svh] bg-linear-to-t from-[#987344] to-transparent z-5" />
    </section>
  );
};
export default ProjectDetailsHeroSection;
