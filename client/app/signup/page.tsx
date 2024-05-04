import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/app/login/submit-button";
import axios from "axios";
import { Button } from "@/components/ui/button";
import GoogleProvider from "./GoogleProvider";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  async function handleSignInWithGoogle(response: any) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: response.credential,
      nonce: "NONCE", // must be the same one as provided in data-nonce (if any)
    });
  }
  const handleGoogleAuth = async () => {
    "use server";
    console.log("Signing in with Google");
    const supabase = createClient();
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          //redirectTo: process.env.SUPABASE_URL,
        },
      });

      if (error) {
        throw error;
      }

      // Handle successful authentication
      console.log("Successfully authenticated with Google:", data.url);

      const parts = data.url.split(".co");
      const path = parts[1];
      console.log("path", path);
      const link = "/temp" + path;
      console.log("link", link);
      console.log(data.url);
      return redirect(link);
    } catch (error) {
      console.log("error", error);
    }
  };

  const signUp = async (formData: FormData) => {
    "use server";
    const supabase = createClient();
    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          username: username,
        },
      },
    });
    const response = await axios.post("http://localhost:8000/register", {
      email,
      username,
    });
    if (error) {
      return redirect("/login?message=Check email to continue sign in process");
    }

    //return redirect("/login?message=Check email to continue sign in process");
  };

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
        <GoogleProvider text={"Sign Up"} />
        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="username">
            {" "}
            {/* New: Add label for username */}
            Username
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="username"
            placeholder="Your Username"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signUp}
            className="bg-green-700 border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing Up..."
          >
            Sign Up
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
