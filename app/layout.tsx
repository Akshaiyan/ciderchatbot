import type { Metadata } from "next";
import { Oswald, Lato } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Cider Institute · AI Knowledge Assistant",
  description:
    "Ask questions about cidermaking and get expert answers — fermentation science, acid management, sensory evaluation, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${lato.variable}`}>
      <body className="font-body bg-ci-cream text-ci-body antialiased">
        {children}
      </body>
    </html>
  );
}
