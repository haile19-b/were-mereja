import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient(); // no `await` here
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("User:", user);

  // Redirect to login if NOT authenticated
  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      Hello {user?.user_metadata?.full_name ?? "user"}, this is the dashboard page.
    </div>
  );
}
