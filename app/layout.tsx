import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sempre 6 - Ofertas da Semana",
  description: "As melhores promoções reunidas em nossa revista digital.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
