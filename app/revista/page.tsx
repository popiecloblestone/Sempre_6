"use client";

import dynamic from "next/dynamic";

const MagazineViewer = dynamic(
  () => import("@/components/magazine/MagazineViewer").then(mod => mod.MagazineViewer),
  { ssr: false, loading: () => <div className="min-h-dvh flex items-center justify-center bg-zinc-900"><p className="text-xl font-bold text-white">Carregando Revista...</p></div> }
);

const MOCK_PAGES = [
  {
    id: "capa",
    imageUrl: "https://placehold.co/800x1000/dc2626/ffffff?text=SEMPRE+6\nOFERTAS+DA+SEMANA"
  },
  {
    id: "carnes",
    imageUrl: "https://placehold.co/800x1000/f8fafc/0f172a?text=ESPECIAL\nDE+CARNES"
  },
  {
    id: "bebidas",
    imageUrl: "https://placehold.co/800x1000/f8fafc/0f172a?text=FESTIVAL\nDE+BEBIDAS"
  },
  {
    id: "limpeza",
    imageUrl: "https://placehold.co/800x1000/f8fafc/0f172a?text=PRODUTOS\nDE+LIMPEZA"
  }
];

export default function RevistaPage() {
  return (
    <main className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center">
      <MagazineViewer pages={MOCK_PAGES} />
    </main>
  );
}
