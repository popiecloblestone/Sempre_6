"use client";

import React from "react";
import Image from "next/image";
import { Share2 } from "lucide-react";

export interface PosterData {
  id: string;
  imageUrl: string;
}

interface PosterViewerProps {
  posters: PosterData[];
}

export function PosterViewer({ posters }: PosterViewerProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Sempre 6 - Ofertas da Semana",
          text: "Confira nossas promoções incríveis!",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      alert("Apenas compartilhe este link: " + window.location.href);
    }
  };

  return (
    <div className="w-full min-h-dvh bg-zinc-900 pb-20">
      
      {/* Header Fixo Premium */}
      <header className="sticky top-0 z-50 w-full bg-red-700/95 backdrop-blur-md shadow-lg border-b border-red-600">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-white font-black text-2xl tracking-tight leading-none">
              SEMPRE <span className="text-yellow-400">6</span>
            </h1>
            <p className="text-red-100 text-xs font-semibold uppercase tracking-wider mt-1">
              Encarte Digital
            </p>
          </div>
          <button 
            onClick={handleShare}
            className="p-2.5 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-inner transition-colors border border-red-500"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Cartazes Stacked / Scroll Infinito Simples */}
      <main className="max-w-3xl mx-auto flex flex-col gap-6 p-4">
        {posters.map((poster, index) => (
          <div 
            key={poster.id} 
            className="relative w-full aspect-[1/1.4] bg-zinc-800 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10"
          >
            <Image
              src={poster.imageUrl}
              alt={`Cartaz de Ofertas ${index + 1}`}
              fill
              priority={index === 0} // Carrega o primeiro cartaz mais rápido
              unoptimized // Necessário para svgs de placeholder externos
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        ))}
        
        {/* Rodapé Chamativo */}
        <div className="mt-8 text-center text-zinc-500 flex flex-col items-center">
          <p className="text-sm font-medium">As ofertas são válidas enquanto durarem os estoques.</p>
          <div className="mt-6 flex items-center justify-center w-12 h-12 rounded-full border border-zinc-700">
            <span className="text-xs font-bold text-zinc-400">FIM</span>
          </div>
        </div>
      </main>

    </div>
  );
}
