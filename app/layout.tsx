import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "StreamIX",
  description:
    "StreamIX is a platform for gamers to connect, share,discover and play games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{ baseTheme: dark }}
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      <html lang="en" suppressHydrationWarning>
        {/* //TODO: Learn How to add favicon */}
        {/* <head>
          <link rel="icon" href="/public/joystick.ico" sizes="any" />
        </head> */}
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            storageKey="streamix-theme"
          >
            <Toaster theme="light" position="bottom-center" />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
