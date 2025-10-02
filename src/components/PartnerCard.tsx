import NextImage from "next/image";

interface PartnerCardProps {
  logo: string;
  name: string;
  alt: string;
}

const PartnerCard = ({ logo, name, alt }: PartnerCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 flex flex-col items-center justify-center min-h-[200px] hover:shadow-md transition-shadow duration-300">
      <div className="mb-4 flex items-center justify-center">
        <NextImage
          src={logo}
          alt={alt}
          width={120}
          height={60}
          className="object-contain"
        />
      </div>
      <p className="text-gray-600 text-sm font-medium text-center border-t border-gray-100 pt-4">
        {name}
      </p>
    </div>
  );
};

export default PartnerCard;
