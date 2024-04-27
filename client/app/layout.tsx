import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "@/app/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Type Tester Pro By RTR",
  description: "Ace your typing skills with Type Tester Pro ⌨️",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <div>
          <body>
            <main id="root">
              {children}
              <SpeedInsights />
              <Analytics />
            </main>
          </body>
        </div>
      </Providers>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5479697126684876"
      ></script>
    </html>
  );
}
