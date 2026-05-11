import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/navigation";
import { defaultLocale, locales } from "./i18n/navigation";
import { getSiteModeStatus } from "./lib/siteMode";

const intlMiddleware = createMiddleware(routing);

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function getLocaleFromPath(pathname: string): string {
  const firstSegment = pathname.split("/")[1];
  return locales.includes(firstSegment as (typeof locales)[number])
    ? firstSegment
    : defaultLocale;
}

export default async function middleware(request: NextRequest) {
  const pathname = normalizePath(request.nextUrl.pathname);
  const locale = getLocaleFromPath(pathname);
  const siteMode = await getSiteModeStatus();

  if (siteMode.activeMode) {
    const targetPath = `/${locale}/${siteMode.activeMode}`;

    if (pathname !== targetPath) {
      const url = request.nextUrl.clone();
      url.pathname = targetPath;
      url.search = "";
      return NextResponse.redirect(url);
    }
  } else if (
    pathname === `/${locale}/maintenance` ||
    pathname === `/${locale}/under-construction`
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

// Match only internationalized pathnames
export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
