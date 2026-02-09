import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/icons";
import {
  Building2Icon,
  FileIcon,
  HouseIcon,
  MapPin,
  PhoneIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const projectDetails = [
  {
    label: "الغرف",
    value: "3 - 3",
    icon: HouseIcon,
    hasBackground: true,
  },
  {
    label: "السعر من",
    value: "1,290,000",
    icon: Building2Icon,
    hasBackground: true,
  },
  {
    label: "أنواع الوحدات",
    value: "أدوار",
    icon: HouseIcon,
    hasBackground: true,
  },
  {
    label: "حالة المشروع",
    value: "متاح",
    icon: Building2Icon,
    hasBackground: true,
  },
  {
    label: "المدينة",
    value: "العارض, شمال الرياض",
    icon: MapPin,
    hasBackground: false,
  },
  {
    label: "المساحة",
    value: "215 - 215 م²",
    icon: HouseIcon,
    hasBackground: true,
  },
];

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
      <Icon className="rounded-full p-1.5 size-8 lg:size-10 border border-white glass-bg min-w-fit" />
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
  return (
    <section className="bg-[url('/hero-img.svg')] bg-top bg-cover bg-no-repeat min-h-svh w-full relative">
      <div className="absolute top-0 left-0 w-full h-[15svh] bg-linear-to-b from-[#897E6F] to-transparent z-5" />
      <div className="h-[43svh]"></div>
      <div className="space-y-11 text-center text-white container z-10 relative py-[10svh]">
        <h1 className="font-light text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl">
          ادوار مشروع 21 – حي العارض
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
            {t("Have an inquiry about a project")}
          </Button>
          <div className="max-md:hidden h-5 sm:h-7 w-2 bg-card -me-1 -ms-0.5 shrink-0 -z-1" />
          <Button
            size="lg"
            className="max-md:w-full min-h-15 sm:min-h-17 sm:text-lg hover:bg-card overflow-hidden"
            variant="secondary"
            endContent={<PhoneIcon className="size-5" />}
          >
            {t("Phone call")}
          </Button>
          <div className="max-md:hidden h-5 sm:h-7 w-2 bg-card -mx-1 shrink-0" />
          <Button
            size="lg"
            className="max-md:w-full min-h-15 sm:min-h-17 sm:text-lg hover:bg-card overflow-hidden"
            variant="secondary"
            endContent={<WhatsAppIcon className="size-6" />}
          >
            {t("Receive project file")}
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[60svh] bg-linear-to-t from-[#987344] to-transparent z-5" />
    </section>
  );
};
export default ProjectDetailsHeroSection;
