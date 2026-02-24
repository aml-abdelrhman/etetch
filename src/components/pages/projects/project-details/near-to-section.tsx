"use client";
import { MapPinIcon } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { projectQueryOptions } from "@/queries";

const NearToSection = () => {
  const t = useTranslations();
  const locale = useLocale() as "ar" | "en";
  const { id } = useParams<{ id: string }>();
  const { data: project } = useQuery(projectQueryOptions(id));

  if (!project) return null;

  return (
    <section className="min-h-[90svh] bg-main-200 relative overflow-hidden">
      <div className="container py-[17svh] relative z-10">
        <div className="flex items-center gap-3 max-sm:flex-col mb-[7svh] lg:-mb-[7svh]">
          <Image
            src="/section-logo.svg"
            alt="Section Logo"
            className="pointer-events-none"
            width={60}
            height={60}
          />
          <h2 className="section-title">{t("Near to")}</h2>
        </div>
        <Image
          src="/section-bg-dark-caramel.svg"
          alt="Section Background"
          className="absolute top-0 start-0 w-fit z-5 pointer-events-none"
          width={898}
          height={459}
        />
        <div className="grid lg:grid-cols-2 gap-7 lg:gap-5 relative z-10">
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-5 place-self-end order-2 lg:order-1 w-full">
            {project.near_to.locations.map((location, index) => (
              <div
                key={index}
                className="flex items-center gap-5 min-w-fit w-full text-primary"
              >
                <MapPinIcon className="rounded-full p-2.5 size-10 border border-primary/20 min-w-fit" />
                <div className="space-y-0.5 text-start">
                  <p className="text-xs font-thin">
                    {t("minutes", { count: location.distance })}
                  </p>
                  <a
                    href="#"
                    className="text-lg lg:text-xl font-medium hover:underline"
                  >
                    {location.name[locale]}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <Image
            src={project.near_to.img ?? "/near-to-section-img.svg"}
            alt="Near To"
            width={100}
            height={100}
            className="block w-full h-auto order-1 lg:order-2 rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default NearToSection;
