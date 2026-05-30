import { redirect } from "next/navigation";

/**
 * Root page — redirects to the dashboard.
 * In a full app this would be a landing / auth page.
 */
export default function HomePage() {
  redirect("/dashboard");
}
