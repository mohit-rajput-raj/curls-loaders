import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "./components/Navbar";

export const metadata: Metadata = {
  title: "Curls Loaders — 100+ Beautiful CSS Loading Animations",
  description: "A curated collection of 100+ beautiful, customizable CSS loading animations. Copy the code, customize with live controls, and drop into any project.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
