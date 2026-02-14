import {
  queryOptions,
  useMutation,
} from "@tanstack/react-query";

import type { Project, ApiResponse, Meta } from "@/types";
import api from "@/lib/api";

export interface GeneralPageParams {
  /**
   * Page number.
   */
  page?: number;

  /**
   * Number of items per page.
   */
  limit?: number;

  /**
   * Search term for filtering
   */
  term?: string;

  /**
   * General search query
   */
  search?: string;

  [key: string]: string | number | boolean | undefined | any;
  /**
   * Initial data for query prefetching
   */

  initialData?: any;

  enabled?: boolean;
}

const getProjectById = async (id: string): Promise<Project> => {
  const response = await api.request.get<ApiResponse<Project>>(
    `projects/${id}`,
  );
  if (response.status !== "success") {
    throw new Error("Failed to fetch project");
  }
  return response?.result?.data;
};

export const projectQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
  });

const getProjects = async (
  params: GeneralPageParams,
): Promise<{ data: Project[]; meta?: Meta | undefined }> => {
  const response = await api.request.get<ApiResponse<Project[]>>(
    `projects`,
    params,
  );
  if (response.status !== "success") {
    throw new Error("Failed to fetch project");
  }
  return response?.result;
};

export const projectsQueryOptions = (params: GeneralPageParams) =>
  queryOptions({
    queryKey: ["projects", params],
    queryFn: () => getProjects(params),
  });
