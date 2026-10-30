import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ContentProvider } from "@/lib/useContent";
import { ModalProvider } from "@/components/ModalProvider";
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
  metadataBase: new URL("https://batobuzz.com.np"),
  title: "BatoBuzz Technology - Software, Web, Mobile & IT Solutions in Nepal",
  description:
    "BatoBuzz Technology is a full-stack product studio in Inaruwa, Nepal. We build mobile and web apps, software, backends, networking and complete IT solutions, from idea to launch.",
  keywords: [
    "software company Nepal",
    "IT solutions Nepal",
    "app development Nepal",
    "web development Nepal",
    "digital marketing Nepal",
    "Flutter developer",
    "BatoBuzz Technology",
    "BatoBuzz",
  ],
  authors: [{ name: "BatoBuzz Technology" }],
  openGraph: {
    title: "BatoBuzz Technology - Software, Web, Mobile & IT Solutions",
    description:
      "A full-stack product studio in Nepal. We design and ship software, apps and complete IT solutions for businesses.",
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
      <body className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
        <ContentProvider>
          <ModalProvider>
            <Header />
            {children}
            <Footer />
            <FloatingCta />
            <ScrollFX />
          </ModalProvider>
        </ContentProvider>
      </body>
    </html>
  );
}
