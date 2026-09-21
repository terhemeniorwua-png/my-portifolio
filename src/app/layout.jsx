import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://philip-portfolio.example.com"),
  title: "Philip Johnson — Full-Stack Engineer",
  description:
    "Portfolio of Philip Johnson — crafting fluid front-ends and scalable back-ends with React, Node.js and robust system architecture.",
  keywords: ["Full-Stack Engineer", "React", "Node.js", "Next.js", "System Architecture", "Portfolio"],
  openGraph: {
    title: "Philip Johnson — Full-Stack Engineer",
    description: "Crafting fluid front-ends and scalable back-ends.",
    type: "website",
    images: [{ url: "/profile.jpg", width: 640, height: 640, alt: "Philip Johnson" }],
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-white text-zinc-700 antialiased">
        {children}
      </body>
    </html>
  );
}