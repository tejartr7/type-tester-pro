import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "@/app/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Type Tester Pro By WebLancerDev",
  description: "Ace your typing skills with Type Tester Pro ⌨️",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <script src="https://apis.google.com/js/api:client.js"></script>
      <script
        async
        defer
        src="https://scripts.simpleanalyticscdn.com/latest.js"
      ></script>
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

      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-L73PDPC6T6"
      ></script>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5479697126684876"
     crossOrigin="anonymous"></script>
    </html>
  );
}
