import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { projectsQueryOptions } from "@/queries";
import ProjectsList from "@/components/pages/projects";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("Projects"),
    description: t("Hemma projects and developments"),
  };
}

const ProjectsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    projectsQueryOptions({ page: currentPage, is_ready_for_sale: true }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsList />
    </HydrationBoundary>
  );
};

export default ProjectsPage;
