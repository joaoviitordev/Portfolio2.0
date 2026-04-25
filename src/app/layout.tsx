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
  title: "João Vitor | Desenvolvedor Front-end Next.js & UI/UX",
  description: "Desenvolvedor Front-end especializado em HTML, CSS, JS, React, Next.js, Tailwind, GSAP e UI/UX. Transformo designs complexos em interfaces web de alta performance. Veja meus cases.",
  icons: {
    icon: "/favicon/myfavicon.svg",
  },
  openGraph: {
    title: "João Vitor | Desenvolvedor Front-end Next.js & UI/UX",
    description: "Desenvolvedor Front-end especializado em HTML, CSS, JS, React, Next.js, Tailwind, GSAP e UI/UX. Transformo designs complexos em interfaces web de alta performance. Veja meus cases.",
    url: "https://www.joaoviitordev.com.br",
    siteName: "João Vitor Portfólio",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "João Vitor | Desenvolvedor Front-end Next.js & UI/UX",
    description: "Desenvolvedor Front-end especializado em HTML, CSS, JS, React, Next.js, Tailwind, GSAP e UI/UX. Transformo designs complexos em interfaces web de alta performance.",
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
