"use client";

import About from "@/components/About";
import Blogs from "@/components/Blogs";
import DynamicHero from "@/components/layout/DynamicHero";
import Partners from "@/components/Partners";
import Projects from "@/components/Projects";
import SectionOne from "@/components/SectionOne";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Welcome from "@/components/Welcome";
import { useWebsite } from "@/hooks/useWebsite";
import { Loader2 } from "lucide-react";

export default function HomeContent() {
  const { website, loading } = useWebsite();

  if (!website || loading) {
    return (
      <div className="flex flex-col gap-10 items-center justify-center">
        <div className="w-full h-[450px] bg-gray-200 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-web-primary" />
          </div>
        </div>
        <Welcome />
        <SectionOne />
        <Services />
        <About />
        <Testimonials />
        <Blogs />
        <Projects />
        <Partners />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <DynamicHero banners={website?.homePage?.banner || []} buttons={true} />
      <Welcome />
      <SectionOne />
      <Services />
      <About />
      <Testimonials />
      <Blogs />
      <Projects />
      <Partners />
    </div>
  );
}
