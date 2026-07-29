import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fitmatchbr.com"),
  title: "Fit Match | O app de relacionamentos de quem vive academia",
  description:
    "Deslize, dê match e converse com alguém que ama o estilo de vida fitness tanto quanto você. Faça o pré-cadastro e ganhe o 1º mês Premium grátis.",
  keywords: [
    "app de relacionamento",
    "namoro fitness",
    "relacionamentos",
    "academia",
    "match",
    "encontros",
    "dating app",
    "fitness",
  ],
  authors: [{ name: "Fit Match" }],
  creator: "Fit Match",
  publisher: "Fit Match",
  robots: { index: true, follow: true },
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://fitmatchbr.com",
    siteName: "Fit Match",
    title: "Fit Match | O app de relacionamentos de quem vive academia",
    description:
      "Seu próximo match não está no bar. Está na academia. Pré-cadastro aberto — o 1º mês Premium é por nossa conta.",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Fit Match",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fit Match | O app de relacionamentos de quem vive academia",
    description:
      "Seu próximo match não está no bar. Está na academia. Pré-cadastro aberto.",
    images: ["/assets/logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  /* Sem `cover`, celulares com entalhe confinam a página à área segura e as
     bordas aparecem como faixas pretas. Com `cover` o fundo vai até o vidro —
     e o CSS usa env(safe-area-inset-*) para o conteúdo não ficar embaixo do
     entalhe nem do indicador de home. */
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // O script inline abaixo adiciona `js-reveal` ao <html> antes da hidratação,
  // então o atributo do servidor e o do cliente diferem de propósito.
  // suppressHydrationWarning silencia isso apenas nos atributos deste elemento.
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${sora.variable} ${inter.variable}`}>
        {/* Marca que o JS está vivo antes da primeira pintura: só então o CSS
            esconde os elementos para animá-los na entrada. Sem esse sinal a
            página renderiza visível, nunca em branco. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js-reveal')`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
