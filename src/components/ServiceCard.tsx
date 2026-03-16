import Image from "next/image";
import Link from "next/link";
import { Service } from "@/types/service";
import { getImageUrl } from "@/lib/image";
import { useLocale } from "next-intl";

const LinkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-link-icon lucide-link"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
};

interface ServiceCardProps {
  service?: Service;
  // Legacy props for backward compatibility
  title?: string;
  description?: string;
  image?: string;
  slug?: string;
}

export default function ServiceCard({
  service,
  title,
  description,
  image,
  slug,
}: ServiceCardProps) {
  const locale = useLocale();

  // Use service data if available, otherwise fall back to legacy props
  const displayTitle = service
    ? service.title[locale as keyof typeof service.title] || service.title.en
    : title || "Customer Insights";

  const displayDescription = service
    ? service.shortDescription[
        locale as keyof typeof service.shortDescription
      ] || service.shortDescription.en
    : description ||
      "Customer Insight Analytics solutions deliver targeted and actionable customer analysis that help financial.";

  const displayImage = service
    ? getImageUrl(service.image) || "/1.jpg"
    : image || "/1.jpg";

  const displaySlug = service?.slug || slug || "customer-insights";
  return (
    <div className="relative text-center group">
      {/* Image + overlay */}
      <div className="relative overflow-hidden rounded-md">
        <Image
          src={displayImage}
          alt={displayTitle}
          width={370}
          height={250}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* >>> visible overlay on hover <<< */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-web-primary/80
              opacity-0 group-hover:opacity-100
              group-hover:animate-[fade-in-up_0.3s_ease-out_both]"
        />

        {/* centered icon */}
        {slug && (
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <Link
              href={`/${locale}/solutions/${displaySlug}`}
              className="flex h-10 w-10 items-center justify-center border-2 border-gray-800 bg-black/90 text-white"
            >
              <LinkIcon />
            </Link>
          </div>
        )}
      </div>

      {/* Text holder */}
      <div className="relative -mt-10 mx-5 border border-gray-100 bg-white p-6 text-center rounded-md shadow-sm z-20">
        <div className="absolute left-0 top-0 h-[3px] w-full bg-web-primary" />
        <div className="absolute left-0 top-0 h-[3px] w-full scale-x-0 bg-black transition-transform duration-500 group-hover:scale-x-100 origin-left" />
        {slug ? (
          <Link href={`/${locale}/solutions/${displaySlug}`}>
            <h3 className="text-[20px] font-normal text-gray-800 capitalize mb-3 transition-colors duration-500 group-hover:text-web-primary">
              {displayTitle}
            </h3>
          </Link>
        ) : (
          <div>
            <h3 className="text-[20px] font-normal text-gray-800 capitalize mb-3 transition-colors duration-500 group-hover:text-web-primary">
              {displayTitle}
            </h3>
          </div>
        )}
        <p
          className="text-gray-500 text-sm"
          dangerouslySetInnerHTML={{
            __html: slug
              ? displayDescription
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis expedita quos, ipsa fuga, et magni hic maiores quo cupiditate aliquam optio corporis eius eaque libero.",
          }}
        ></p>
      </div>
    </div>
  );
}
