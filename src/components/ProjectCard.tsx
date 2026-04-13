import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";
import { getImageUrl } from "@/lib/image";
import { useLocale } from "next-intl";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const locale = useLocale();

  // Get localized text based on current locale
  const getLocalizedText = (text: { en: string; ar: string }) => {
    return text[locale as keyof typeof text] || text.en;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "ar" ? "ar" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Build image URL
  const imageUrl = getImageUrl(project.image);

  return (
    <Link
      href={`/${locale}/success-stories/${project.slug}`}
      className="block relative group rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-web-primary"
    >
      <div className="relative overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt={getLocalizedText(project.title)}
          width={400}
          height={300}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* >>> visible overlay on hover <<< */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-web-primary/80
              opacity-0 group-hover:opacity-100
              group-hover:animate-[fade-in-up_0.3s_ease-out_both]"
        />

        {/* centered content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="text-center text-white px-6 py-4">
            <h3 className="text-lg font-semibold mb-2">
              {getLocalizedText(project.title)}
            </h3>
            <p className="text-sm mb-2">
              {getLocalizedText(project.service.title)}
            </p>
            <p className="text-xs opacity-90">{project.customer}</p>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="mt-4 en:text-left ar:text-right">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-web-primary transition-colors duration-300">
          {getLocalizedText(project.title)}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {getLocalizedText(project.service.title)}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{project.customer}</span>
          <span>{formatDate(project.date)}</span>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {tag[locale as keyof typeof tag] || tag.en}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
