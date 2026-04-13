import PageHero from "@/components/layout/PageHero";
import { getTranslations } from "next-intl/server";
import { SingleBlogResponse } from "@/types/blog";
import BlogContent from "./BlogContent";
import type { Metadata } from "next";
import { sanitizeTitle } from "@/lib/metadata";
import { getImageUrl } from "@/lib/image";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://strategizers-backend.onrender.com/api/v1";

// Fetch blog data server-side
async function getBlogData(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/blog/${slug}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blog data");
    }

    const data: SingleBlogResponse = await response.json();
    return data.results.blog;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

// Generate metadata for SEO based on blog data
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const blog = await getBlogData(slugString);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found",
    };
  }

  const title = sanitizeTitle(
    blog.title[locale as "en" | "ar"] || blog.title.en,
    "Article"
  );
  const subtitle = sanitizeTitle(
    blog.subTitle[locale as "en" | "ar"] || blog.subTitle.en,
    "Insights"
  );
  const description =
    blog.description[locale as "en" | "ar"] || blog.description.en;

  // Extract text from HTML description for meta description (limit to 160 chars)
  const plainDescription = description
    .replace(/<[^>]*>/g, "")
    .substring(0, 160)
    .trim();

  // Use blog tags as keywords
  const keywords = blog.tags || [];

  // Get blog image for OpenGraph
  const imageUrl = getImageUrl(blog.image) || undefined;

  return {
    title: `${title} - ${subtitle}`,
    description: plainDescription,
    keywords: keywords
      .map((tag) => tag[locale as keyof typeof tag] || tag.en)
      .join(", "),
    authors: blog.author ? [{ name: blog.author }] : undefined,
    openGraph: {
      title: `${title} - ${subtitle}`,
      description: plainDescription,
      type: "article",
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      authors: blog.author ? [blog.author] : undefined,
      publishedTime: blog.updatedAt,
      tags: blog.tags
        .map((tag) => tag[locale as keyof typeof tag] || tag.en)
        .join(", "),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - ${subtitle}`,
      description: plainDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("singleBlog");
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;

  return (
    <div className="flex flex-col">
      <PageHero title={t("hero.title")} background="/services.webp" />

      {/* Blog Content - Client Component */}
      <BlogContent slug={slugString} />
    </div>
  );
}
