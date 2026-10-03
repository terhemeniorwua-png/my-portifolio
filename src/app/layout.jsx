import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://philip-iorwua.vercel.app"),
  title: "Philip Iorwua — Full-Stack Web Developer",
  description:
    "Portfolio of Philip Iorwua Kizito — full-stack web developer building modern web applications across React, Node.js, PostgreSQL, and REST APIs.",
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Node.js",
    "Next.js",
    "PostgreSQL",
    "REST API",
    "Web Developer Nigeria",
    "Portfolio",
  ],
  openGraph: {
    title: "Philip Iorwua — Full-Stack Web Developer",
    description:
      "Building modern web applications from interface to infrastructure.",
    type: "website",
    images: [
      {
        url: "/profile.png",
        width: 640,
        height: 640,
        alt: "Philip Iorwua Kizito",
      },
    ],
  },
};

export const viewport = {
  themeColor: "#F7F3EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-[#F7F3EC] text-[#171717] antialiased">
        {children}
      </body>
    </html>
  );
}
