import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GeTs Architects Project Brief",
  description: "Interactive project brief questionnaire for GeTs Architects",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
