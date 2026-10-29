import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import ScrollFX from "@/components/ScrollFX";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://batobaj.tech"),
  title: "BatoBuzz Software — Full-stack software studio in Nepal",
  description:
    "BatoBuzz Software (Batobaj Technology) is a full-stack development studio in Tulsipur, Nepal. We build production mobile apps, web apps, and the backends behind them — Flutter, .NET, Firebase, Next.js.",
  keywords: [
    "software studio Nepal",
    "Flutter developer",
    ".NET backend",
    "Next.js",
    "app development",
    "Batobaj Technology",
    "BatoBuzz",
  ],
  authors: [{ name: "Batobaj Technology" }],
  openGraph: {
    title: "BatoBuzz Software — Full-stack software studio in Nepal",
    description:
      "We build production apps end to end — mobile, web, and the backends behind them.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0a1120",
  width: "device-width",
  initialScale: 1,
};

// Applies the saved/system theme before first paint to avoid a flash.
const themeScript = `(function(){try{var k="bb-theme",s=localStorage.getItem(k);var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s||(m?"dark":"light");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <Header />
        {children}
        <Footer />
        <FloatingCta />
        <ScrollFX />
      </body>
    </html>
  );
}
