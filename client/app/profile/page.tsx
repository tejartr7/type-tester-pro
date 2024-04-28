import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
export default async function Profile() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex font-poppins items-center justify-center w-screen h-screen">
      <div
        className="flex items-center justify-center 
      flex- flex-col w-full px-8 sm:max-w-md gap-2 p-4"
        style={{
          border: "5px solid #555",
          borderRadius: "10px",
        }}
      >
        <Link
          href="/"
          className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>
        <p>Welcome to Type Tester Pro by RTR 🚀{user?.email}</p>
      </div>
    </div>
  );
}
