import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect to English (default locale)
  redirect("/en");
}
