import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fit Match | Pré-cadastro",
  description:
    "Aplicativo de encontros fitness - Cadastre-se para ganhar 1 mês grátis do plano Premium!",
  keywords: [
    "fitness",
    "relacionamentos",
    "academia",
    "treino",
    "matches",
    "saúde",
    "bem-estar",
    "dating app",
  ],
  authors: [{ name: "Fit Match" }],
  creator: "Fit Match",
  publisher: "Fit Match",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://fitmatchbr.com",
    title:
      "Fit Match | O primeiro app de relacionamentos 100% focado em fitness",
    description:
      "Conecte-se com pessoas que compartilham sua paixão por uma vida saudável. Encontre alguém para treinar junto, alcançar metas e construir um relacionamento forte e fitness! 💪❤️",
    siteName: "Fit Match",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Fit Match - App de relacionamentos fitness",
        type: "image/png",
      },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Meta tags adicionais para WhatsApp e outras plataformas */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <link rel="icon" href="/assets/logo.png" />
        <link rel="apple-touch-icon" href="/assets/logo.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
