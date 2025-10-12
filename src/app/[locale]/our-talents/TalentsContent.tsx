"use client";

import TeamMemberCard from "@/components/TeamMemberCard";
import Pagination from "@/components/Pagination";
import { useState, useEffect, useCallback } from "react";
import { apiGet } from "@/lib/api";
import { TeamResponse, TeamMember } from "@/types/team";
import { Loader2, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function TalentsContent() {
  const t = useTranslations("ourTeam");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const limit = 6;

  const fetchTeamMembers = useCallback(
    async (page: number) => {
      try {
        setIsLoading(true);
        setError(null);

        const response: TeamResponse = await apiGet(
          `/public/team?page=${page}&limit=${limit}`
        );

        if (!response.error) {
          setTeamMembers(response.results.data);
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
        console.error("Error fetching team members:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [limit, t]
  );

  useEffect(() => {
    fetchTeamMembers(currentPage);
  }, [currentPage, fetchTeamMembers]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {t("section.title")}
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {t("section.description")}
        </p>
      </div>

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

      {/* Team Grid */}
      {!isLoading && !error && teamMembers.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member._id} teamMember={member} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-12"
              showInfo={true}
              totalItems={teamMembers.length}
              itemsPerPage={limit}
            />
          )}
        </>
      )}

      {/* Empty State */}
      {!isLoading && !error && teamMembers.length === 0 && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-600 text-lg">{t("empty.title")}</p>
            <p className="text-gray-400 text-sm mt-2">
              {t("empty.description")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
