"use client";
import { LinkIcon } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { Blog } from "@/types/blog";
import { useLocale, useTranslations } from "next-intl";

const BlogCard = ({
  blog,
  className,
  bodyClassName,
}: {
  blog?: Blog;
  className?: string;
  bodyClassName?: string;
}) => {
  const locale = useLocale();
  const t = useTranslations("blogCard");
  return (
    <div className={`flex flex-col gap-4 group bg-white ${className}`}>
      <div className="relative overflow-hidden rounded-md">
        <NextImage
          src={
            blog?.image
              ? `https://api-strat.othmanconstruction.com/${blog.image}`
              : "/1.jpg"
          }
          alt={blog?.title?.en || t("defaults.altText")}
          width={370}
          height={250}
          className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* >>> visible overlay on hover <<< */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-web-primary/80
              opacity-0 group-hover:opacity-100
              group-hover:animate-[fade-in-up_0.3s_ease-out_both]"
        />

        {/* centered icon */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <Link
            href={`/${locale}/insights-and-publications/${blog?.slug || "#"}`}
            className="flex h-10 w-10 items-center justify-center border-2 border-gray-800 bg-black/90 text-white"
          >
            <LinkIcon />
          </Link>
        </div>
      </div>
      <div className={`flex flex-col gap-4 ${bodyClassName}`}>
        <div className="flex flex-col gap-2">
          <h3 className="text-web-primary font-bold text-sm">
            {blog?.service?.title[locale as keyof typeof blog.service.title] ||
              blog?.service?.title?.en ||
              t("defaults.category")}
          </h3>
          <p className="text-black hover:text-web-primary transition-colors duration-300 cursor-pointer text-2xl font-medium">
            {blog?.title?.[locale as keyof typeof blog.title] ||
              blog?.title?.en ||
              t("defaults.title")}
          </p>
          <div className="flex items-center gap-2">
            <p className="border-r-1 border-gray-300 pr-2">
              {t("by")} {blog?.author || t("defaults.author")}
            </p>
            <p>Sep 21, 2025</p>
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          {blog?.subTitle?.[locale as keyof typeof blog.subTitle] ||
            blog?.subTitle?.en ||
            t("defaults.description")}
        </p>
        <Link
          href={`/${locale}/insights-and-publications/${blog?.slug || "#"}`}
        >
          <button className="bg-white text-web-primary border border-web-primary px-6 py-2 font-medium hover:bg-web-primary hover:text-white transition-colors duration-300 rounded-full cursor-pointer w-48">
            {t("readMore")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
