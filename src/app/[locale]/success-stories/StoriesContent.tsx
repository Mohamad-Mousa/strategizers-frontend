"use client";

import ProjectCard from "@/components/ProjectCard";
import Pagination from "@/components/Pagination";
import { useState, useEffect, useCallback } from "react";
import { apiGet } from "@/lib/api";
import { ProjectsResponse, Project } from "@/types/project";
import { Loader2, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function StoriesContent() {
  const t = useTranslations("successStories");
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const limit = 6;

  const fetchProjects = useCallback(
    async (page: number) => {
      try {
        setIsLoading(true);
        setError(null);

        const response: ProjectsResponse = await apiGet(
          `/public/project?page=${page}&limit=${limit}`
        );

        if (!response.error) {
          setProjects(response.results.data);
          // Calculate total pages based on totalCount and limit
          const calculatedTotalPages = Math.ceil(
            response.results.totalCount / limit
          );
          setTotalPages(calculatedTotalPages);
          setCurrentPage(page);
        } else {
          setError(response.message || t("errors.fetchFailed"));
        }
      } catch (err) {
        setError(t("errors.fetchError"));
        console.error("Error fetching projects:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage, fetchProjects]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="max-w-7xl mx-auto mt-20 px-6">
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-web-primary" />
            <span className="text-gray-600">{t("loading")}</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle className="w-6 h-6" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {!isLoading && !error && projects.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-12"
            showInfo={true}
            totalItems={projects.length}
            itemsPerPage={limit}
          />
        </>
      )}

      {/* Empty State */}
      {!isLoading && !error && projects.length === 0 && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-600 text-lg">{t("empty.title")}</p>
            <p className="text-gray-400 text-sm mt-2">
              {t("empty.description")}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
