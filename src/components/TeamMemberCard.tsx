import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { TeamMember } from "@/types/team";
import { getImageUrl } from "@/lib/image";
import { useLocale } from "next-intl";

interface TeamMemberCardProps {
  teamMember?: TeamMember;
  // Legacy props for backward compatibility
  id?: number;
  name?: string;
  role?: string;
  description?: string;
  phone?: string;
  email?: string;
  image?: string;
}

const TeamMemberCard = ({
  teamMember,
  name,
  role,
  description,
  phone,
  email,
  image,
}: TeamMemberCardProps) => {
  const locale = useLocale();

  // Helper function to format social media URLs
  const formatSocialUrl = (url: string, platform: string) => {
    if (!url) return null;

    // If URL already has protocol, return as is
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // Add https:// if not present
    if (url.startsWith("www.")) {
      return `https://${url}`;
    }

    // For platform-specific URLs, construct the full URL
    const domainMap: { [key: string]: string } = {
      facebook: "facebook.com",
      instagram: "instagram.com",
      twitter: "twitter.com",
      linkedin: "linkedin.com",
    };

    const domain = domainMap[platform] || platform;
    return `https://${url.includes(domain) ? url : `${domain}/${url}`}`;
  };

  // Use team member data if available, otherwise fall back to legacy props
  const displayName = teamMember
    ? teamMember.name[locale as keyof typeof teamMember.name] ||
      teamMember.name.en
    : name || "";

  const displayPosition = teamMember
    ? teamMember.position[locale as keyof typeof teamMember.position] ||
      teamMember.position.en
    : role || "";

  const displayDescription = teamMember
    ? teamMember.description[locale as keyof typeof teamMember.description] ||
      teamMember.description.en
    : description || "";

  const displayImage = teamMember
    ? getImageUrl(teamMember.image) || "/1.jpg"
    : image || "/1.jpg";

  const displayPhone = teamMember
    ? `+${teamMember.phone.code}-${teamMember.phone.number}`
    : phone || "";

  const displayEmail = teamMember?.email || email || "";
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
      {/* Profile Image */}
      <div className="relative overflow-hidden rounded-md mb-4 group">
        <NextImage
          src={displayImage}
          alt={displayName}
          width={370}
          height={250}
          className="w-full h-48 object-cover rounded-lg transition-transform duration-700 group-hover:scale-110"
        />

        {/* >>> visible overlay on hover <<< */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-web-primary/80
              opacity-0 group-hover:opacity-100
              group-hover:animate-[fade-in-up_0.3s_ease-out_both]"
        />

        {/* centered icon */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 gap-3">
          {teamMember?.social.facebook && (
            <Link
              href={
                formatSocialUrl(teamMember.social.facebook, "facebook") || "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center bg-white rounded-full text-black hover:bg-black hover:text-white transition-colors duration-300"
            >
              <Facebook size={18} />
            </Link>
          )}
          {teamMember?.social.twitter && (
            <Link
              href={
                formatSocialUrl(teamMember.social.twitter, "twitter") || "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center bg-white rounded-full text-black hover:bg-black hover:text-white transition-colors duration-300"
            >
              <Twitter size={18} />
            </Link>
          )}
          {teamMember?.social.linkedin && (
            <Link
              href={
                formatSocialUrl(teamMember.social.linkedin, "linkedin") || "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center bg-white rounded-full text-black hover:bg-black hover:text-white transition-colors duration-300"
            >
              <Linkedin size={18} />
            </Link>
          )}
          {teamMember?.social.instagram && (
            <Link
              href={
                formatSocialUrl(teamMember.social.instagram, "instagram") || "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center bg-white rounded-full text-black hover:bg-black hover:text-white transition-colors duration-300"
            >
              <Instagram size={18} />
            </Link>
          )}
        </div>
      </div>

      {/* Team Member Info */}
      <div className="space-y-3">
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-800">{displayName}</h3>

        {/* Role */}
        <p className="text-web-primary font-medium">{displayPosition}</p>

        {/* Description */}
        <div
          className="text-gray-600 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: displayDescription }}
        />

        {/* Contact Information */}
        <div className="space-y-2 pt-2">
          {displayPhone && (
            <div className="flex items-center gap-2">
              <Phone size={12} className="text-web-primary" />
              <span className="font-medium text-sm text-gray-600">
                {displayPhone}
              </span>
            </div>
          )}
          {displayEmail && (
            <p className="flex items-center gap-2">
              <Mail size={12} className="text-web-primary" />
              <span className="font-medium text-sm text-gray-600">
                {displayEmail}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
