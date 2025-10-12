"use client";
import Header from "./Header";

const Hero = ({
  title,
  subtitle,
  background,
}: {
  title: string;
  subtitle?: string;
  background: string;
}) => {
  return (
    <div className="relative w-full">
      <div className="w-full flex justify-center">
        <Header className="absolute z-50 w-full md:w-[80%]" />
      </div>
      <div
        className="bg-web-gray h-[450px] flex flex-col items-center justify-center relative gap-4"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(27, 48, 83, 0.4)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 0",
          }}
        ></div>
        <h1 className="text-white text-6xl font-bold relative z-10">{title}</h1>
        {subtitle && (
          <p className="text-white text-lg font-medium relative z-10">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default Hero;
