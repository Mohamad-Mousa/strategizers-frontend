import About from "@/components/About";
import Blogs from "@/components/Blogs";
import Hero from "@/components/layout/Hero";
import Partners from "@/components/Partners";
import Projects from "@/components/Projects";
import SectionOne from "@/components/SectionOne";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Welcome from "@/components/Welcome";
import { useTranslations } from "next-intl";

const HomePage = () => {
  const t = useTranslations("home");

  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <Hero
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        background="/services.webp"
        buttons={true}
      />
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
};

export default HomePage;
