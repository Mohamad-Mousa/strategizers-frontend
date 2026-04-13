"use client";

import Header from "./Header";

interface PageHeroProps {
  title: string;
  subtitle?: string | React.ReactNode;
  background: string;
}

const PageHero = ({ title, subtitle, background }: PageHeroProps) => {
  return (
    <div className="relative w-full">
      {/* Header */}
      <div className="w-full flex justify-center">
        <Header className="absolute z-50 w-full md:w-[80%]" />
      </div>

      {/* Banner */}
      <div
        className="relative h-[420px] flex flex-col items-center justify-end pb-16 overflow-hidden"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay with brand gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,15,25,0.55) 0%, rgba(138,53,148,0.45) 60%, rgba(15,15,25,0.85) 100%)",
          }}
        />

        {/* Subtle animated accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: "var(--color-web-primary, #8a3594)" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center">
          {/* Decorative dot row */}
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className="block w-1.5 h-1.5 rounded-full opacity-60"
              style={{ background: "var(--color-web-primary, #8a3594)" }}
            />
            <span className="block w-8 h-px bg-white/40" />
            <span
              className="block w-2 h-2 rounded-full"
              style={{ background: "var(--color-web-primary, #8a3594)" }}
            />
            <span className="block w-8 h-px bg-white/40" />
            <span
              className="block w-1.5 h-1.5 rounded-full opacity-60"
              style={{ background: "var(--color-web-primary, #8a3594)" }}
            />
          </div>

          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance drop-shadow-lg">
            {title}
          </h1>

          {subtitle && (
            <div className="mt-1 max-w-2xl">
              {typeof subtitle === "string" ? (
                <p className="text-white/85 text-base md:text-lg font-medium leading-relaxed">
                  {subtitle}
                </p>
              ) : (
                subtitle
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
