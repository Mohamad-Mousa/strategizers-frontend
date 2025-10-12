import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ar"] as const;
export const defaultLocale = "ar";

// Define the routing configuration
export const routing = defineRouting({
  locales,
  defaultLocale,
  // localePrefix: "as-needed", // Only show locale prefix for non-default locale
  localeDetection: true, // Enable locale detection from Accept-Language header
});

// Create the navigation configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
