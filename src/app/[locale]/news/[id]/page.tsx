import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { newsByIdQueryOptions } from "@/queries";
import NewsDetail from "@/components/pages/news/news-details";
import { Metadata } from "next";
import api from "@/lib/api";
import { News } from "@/types";
import { url } from "inspector";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;

  const response = await api.request.get<{ data: News }>(`guest/news/${id}`);
  const item = response?.data;

  if (!item) return {};

  return {
    title: item.title[locale as keyof typeof item.title],
    description: item.description[locale as keyof typeof item.description],
    openGraph: {
      images: [item.image],
      url: `https://hemma-front-fork.vercel.app/${locale}/news/${id}`,
      type: "website",
    },
    icons: {
      icon: "/logo.svg",
    },
  };
}

const NewsDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery(newsByIdQueryOptions(id));
  } catch (error) {
    console.error("Failed to prefetch news:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewsDetail />
    </HydrationBoundary>
  );
};

export default NewsDetailsPage;
