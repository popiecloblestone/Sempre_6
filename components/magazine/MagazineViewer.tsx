"use client";

import React, { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Page, PageData } from "./Page";

interface MagazineViewerProps {
  pages: PageData[];
}

export function MagazineViewer({ pages }: MagazineViewerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null); 
  const [isClient, setIsClient] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth < 768 ? window.innerWidth : window.innerWidth / 2,
        height: window.innerHeight,
      });
    };

    handleResize(); // Set initial
    setTimeout(() => setIsClient(true), 0);
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isClient) {
    return <div className="w-full h-dvh flex items-center justify-center bg-zinc-900 text-white">Carregando Revista...</div>;
  }

  return (
    <div className="w-full h-dvh bg-zinc-900 flex items-center justify-center overflow-hidden">
      {/* @ts-expect-error - The types of HTMLFlipBook are slightly outdated against React 18/19 */}
      <HTMLFlipBook
        width={dimensions.width}
        height={dimensions.height}
        size="fixed"
        minWidth={315}
        maxWidth={3000}
        minHeight={400}
        maxHeight={3000}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="w-full h-full shadow-2xl"
        ref={bookRef}
      >
        {pages.map((page) => (
          <Page
            key={page.id}
            page={page}
          />
        ))}
      </HTMLFlipBook>
    </div>
  );
}
