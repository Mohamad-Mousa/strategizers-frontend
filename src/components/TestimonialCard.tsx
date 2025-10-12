import { Testimonial } from "@/types/testimonial";
import { useLocale } from "next-intl";

interface TestimonialCardProps {
  testimonial?: Testimonial;
  // Legacy props for backward compatibility
  quote?: string;
  name?: string;
  title?: string;
  company?: string;
}

const TestimonialCard = ({
  testimonial,
  quote,
  name,
  title,
  company,
}: TestimonialCardProps) => {
  const locale = useLocale();

  // Use testimonial data if available, otherwise fall back to legacy props
  const displayName = testimonial
    ? testimonial.name[locale as keyof typeof testimonial.name] ||
      testimonial.name.en
    : name || "";

  const displayPosition = testimonial
    ? testimonial.position[locale as keyof typeof testimonial.position] ||
      testimonial.position.en
    : title || "";

  const displayQuote = testimonial
    ? testimonial.description[locale as keyof typeof testimonial.description] ||
      testimonial.description.en
    : quote || "";
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Quote */}
      <div className="mb-6">
        <div
          className="text-gray-600 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: displayQuote }}
        />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-4"></div>

      {/* Author Info */}
      <div className="text-center">
        <h4 className="font-bold text-gray-800 text-base mb-1">
          {displayName}
        </h4>
        <p className="text-web-primary text-sm font-medium">
          {displayPosition}
          {company && ` at ${company}`}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
