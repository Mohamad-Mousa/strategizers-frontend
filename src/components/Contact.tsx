import { useSettings } from "@/hooks/useSettings";
import { Mail, Phone, Loader2, AlertCircle } from "lucide-react";
import NextImage from "next/image";
import { useLocale } from "next-intl";

const Contact = () => {
  const { settings, loading, error, refetchSettings } = useSettings();
  const locale = useLocale();

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-200 flex flex-col gap-4 p-4 rounded-md">
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-web-primary" />
            <span className="text-gray-600">Loading contact team...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-200 flex flex-col gap-4 p-4 rounded-md">
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle className="w-6 h-6" />
            <span>{error}</span>
          </div>
        </div>
        <button
          onClick={refetchSettings}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-auto"
        >
          Retry
        </button>
      </div>
    );
  }

  // No settings or no contact team
  if (!settings || !settings.contactTeam || settings.contactTeam.length === 0) {
    return (
      <div className="bg-gray-200 flex flex-col gap-4 p-4 rounded-md">
        <div className="text-center py-8">
          <p className="text-gray-600">No contact team members found</p>
          <button
            onClick={refetchSettings}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load Contact Team
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 flex flex-col gap-4 p-4 rounded-md">
      {settings.contactTeam.map((member) => (
        <div
          key={member._id}
          className="flex flex-col gap-2 bg-white p-4 rounded-md"
        >
          <p className="font-bold text-lg">
            {member.position[locale as keyof typeof member.position] ||
              member.position.en}
          </p>
          <div className="flex items-center gap-4">
            <NextImage
              src={
                member.image
                  ? `https://api-strat.othmanconstruction.com/${member.image}`
                  : "/1.jpg"
              }
              alt={
                member.name[locale as keyof typeof member.name] ||
                member.name.en
              }
              width={100}
              height={100}
              className="rounded-md object-cover"
            />
            <div className="flex flex-col gap-2">
              <p className="text-web-primary font-bold">
                {member.name[locale as keyof typeof member.name] ||
                  member.name.en}
              </p>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-web-primary" />
                <p>
                  +{member.phone.code} {member.phone.number}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-web-primary" />
                <p>{member.email}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contact;
