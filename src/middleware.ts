import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/navigation";

// Middleware configuration
export default createMiddleware(routing);

// Match only internationalized pathnames
export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
