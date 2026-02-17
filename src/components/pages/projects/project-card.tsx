import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { BedDoubleIcon, MapPinIcon } from "lucide-react";
import { AreaIcon } from "@/icons";
import { Progress } from "@/components/ui/progress";
import { formatNumber } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const ProjectCard = ({ project }: { project: Project }) => {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations();
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative h-full block"
    >
      <div className="flex items-center gap-3 absolute top-5 start-5 z-10">
        <Badge
          variant="secondary"
          className="text-sm font-medium text-primary/40 flex items-center gap-2"
        >
          <MapPinIcon className="size-4! text-primary" />
          {project.city[locale]}
        </Badge>
      </div>
      <img
        src={project?.gallery?.[0] || "/gallary-section-img.png"}
        alt={project.title[locale]}
        className="h-[80%] max-h-[500px] w-full object-cover rounded-4xl"
      />
      <div className="grid grid-cols-2 sm:gap-5 mt-5 text-primary/50 z-10 text-start">
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-primary">
            {project.title[locale]}
          </h3>
          <div className="flex items-center gap-2">
            <p className="">
              <span className="text-primary font-inter font-semibold">
                {project?.sold_percentage}%{" "}
              </span>{" "}
              <span className="text-sm">{t("sold units")}</span>
            </p>
            <Progress
              className="max-w-55"
              value={project?.sold_percentage || 0}
            />
          </div>
        </div>
        <div className="space-y-1 max-sm:justify-self-end">
          <div className="flex items-center gap-1.5">
            <BedDoubleIcon className="size-4 text-primary" />
            <p className="text-sm">
              {t("units", { count: project.rooms || 0 })}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <AreaIcon className="size-4 text-primary" />
            <p className="text-sm">
              {project.area}{" "}
              <span className="text-primary/40 inline-block ms-1">
                {" "}
                {t("m")}
              </span>
            </p>
          </div>
          <p className="text-sm text-primary">
            <span className="font-inter">
              {formatNumber(Number(project.price_from))}
            </span>{" "}
            <span className="text-primary/40 inline-block ms-1">
              {" "}
              {t("SAR")}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
