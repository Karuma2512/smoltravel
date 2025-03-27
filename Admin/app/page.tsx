import { redirect } from "next/navigation"

export default function Home() {
  // Redirect from the root URL to the dashboard or login page
  redirect("/dashboard")
}

