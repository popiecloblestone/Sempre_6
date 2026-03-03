"use client";

import React, { useState, useRef, useEffect } from "react";
import { PageData } from "./Page";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageFlip } from "page-flip";

interface MagazineViewerProps {
  pages: PageData[];
}

export function MagazineViewer({ pages }: MagazineViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current || pages.length === 0) return;

    // Destruir instância anterior (seguro para hot reload)
    if (pageFlipRef.current) {
      pageFlipRef.current.destroy();
      pageFlipRef.current = null;
    }

    // Calcular dimensões de forma SÍNCRONA antes de instanciar o motor
    const isMobile = window.innerWidth < 1024;
    const pageWidth = isMobile
      ? Math.floor(window.innerWidth * 0.92)
      : Math.floor(Math.min(window.innerWidth * 0.78, 1200) / 2);
    const pageHeight = isMobile
      ? Math.floor(window.innerHeight * 0.68)
      : Math.floor(window.innerHeight * 0.82);

    // Aplicar dimensões no container PRIMEIRO (antes do motor montar)
    const bookTotalWidth = isMobile ? pageWidth : pageWidth * 2;
    containerRef.current.style.width = `${bookTotalWidth}px`;
    containerRef.current.style.height = `${pageHeight}px`;

    // Instanciar o motor StPageFlip no modo nativo (Canvas Mode)
    // Este é o modo que ativa o Page Curl cônico real
    const pageFlip = new PageFlip(containerRef.current, {
      width: pageWidth,
      height: pageHeight,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      size: "fixed" as any,
      minWidth: 300,
      maxWidth: 1000,
      minHeight: 400,
      maxHeight: 1400,
      drawShadow: true,
      showCover: true,
      maxShadowOpacity: 0.85,
      usePortrait: isMobile,
      flippingTime: 900,
      useMouseEvents: true,
      swipeDistance: 20,
      clickEventForward: true,
      mobileScrollSupport: false,
    });

    pageFlipRef.current = pageFlip;

    // loadFromImages() ativa a renderização Canvas em vez de HTML
    // Isso é o que permite a dobra cônica do papel
    pageFlip.loadFromImages(pages.map((p) => p.imageUrl));

    pageFlip.on("flip", (e) => {
      setCurrentPage(e.data as number);
    });

    return () => {
      pageFlip.destroy();
    };
  }, [isClient, pages]);

  if (!isClient) {
    return (
      <div className="w-full h-dvh flex items-center justify-center bg-zinc-950 text-white font-bold text-xl">
        Carregando Revista...
      </div>
    );
  }

  return (
    <div className="relative w-full h-dvh bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Glow de fundo */}
      <div className="absolute inset-0 bg-radial-gradient from-red-600/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative flex items-center justify-center w-full h-full max-w-[1400px] px-16">

        {/* Seta Esquerda */}
        <button
          onClick={() => pageFlipRef.current?.flipPrev()}
          className="absolute left-4 lg:left-6 z-50 p-4 bg-white/5 hover:bg-white/15 text-white rounded-full backdrop-blur-md transition-all duration-200 border border-white/10 hover:scale-110 active:scale-95 flex items-center justify-center group"
          aria-label="Página Anterior"
        >
          <ChevronLeft className="w-7 h-7 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Container onde a engine StPageFlip injeta o canvas/DOM */}
        <div className="flex-1 flex items-center justify-center">
          <div
            ref={containerRef}
            className="shadow-[0_40px_80px_-10px_rgba(0,0,0,0.7)]"
            style={{ width: 0, height: 0 }}
          />
        </div>

        {/* Seta Direita */}
        <button
          onClick={() => pageFlipRef.current?.flipNext()}
          className="absolute right-4 lg:right-6 z-50 p-4 bg-white/5 hover:bg-white/15 text-white rounded-full backdrop-blur-md transition-all duration-200 border border-white/10 hover:scale-110 active:scale-95 flex items-center justify-center group"
          aria-label="Próxima Página"
        >
          <ChevronRight className="w-7 h-7 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Indicadores de páginas */}
      <div className="absolute bottom-6 flex gap-2">
        {Array.from({ length: pages.length }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentPage === i ? "w-8 bg-red-500" : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
