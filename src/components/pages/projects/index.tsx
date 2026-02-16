"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { projectsQueryOptions } from "@/queries";
import { useTranslations } from "next-intl";
import EmptyState from "@/components/EmptyState";
import ProjectCard from "./project-card";
import Pagination from "@/components/Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const ProjectsList = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page")) || 1;
  const { data } = useSuspenseQuery(projectsQueryOptions({ page }));

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="bg-white min-h-screen">
      <div className="bg-main-200 py-[20svh] relative">
        <img
          src="/section-bg-dark-caramel.svg"
          alt="Section Background"
          className="absolute top-0 start-0 z-5 pointer-events-none"
        />
        <div className="container flex flex-col items-center text-center gap-5">
          <img
            src="/section-logo.svg"
            alt="Section Logo"
            className="pointer-events-none w-16"
          />
          <h1 className="section-title">{t("Projects")}</h1>
          <p className="text-cyan-950/60 max-w-2xl mx-auto">
            {t(
              "Discover our latest real estate projects and find your dream home",
            )}
          </p>
        </div>
      </div>

      <div className="container py-20 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
          {data?.data?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {data?.data?.length === 0 && (
          <EmptyState title={t("No projects found")} />
        )}

        {data?.meta && data.meta.last_page > 1 && (
          <div className="flex justify-center pt-8">
            <Pagination
              currentPage={page}
              totalPages={data.meta.last_page}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsList;
