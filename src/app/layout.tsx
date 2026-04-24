import type { Metadata } from "next";
import { Poppins, Space_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Portfólio | João Vitor",
  description: "Portfólio de João Vitor Gomes de Faria, Desenvolvedor Front-End",
  icons: {
    icon: "/favicon/myfavicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${poppins.variable} ${spaceMono.variable} antialiased`}
    >
      <head>
        <Script 
          src="https://kit.fontawesome.com/48fc6e8f37.js" 
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* GSAP CDNs Originais para garantir acesso ao ScrollSmoother e SplitText */}
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/ScrollSmoother.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/SplitText.min.js" strategy="beforeInteractive" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
