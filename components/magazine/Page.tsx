"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface PageData {
  id: string;
  imageUrl: string;
}

export interface PageProps {
  page: PageData;
  className?: string;
}

export const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ page, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full h-full bg-white shadow-md",
          className
        )}
      >
        {/* Center Fold/Spine Shadow for realistic depth */}
        <div className="absolute inset-y-0 left-0 w-8 bg-linear-to-r from-black/10 to-transparent pointer-events-none z-10" />

        {/* Page Image */}
        <div className="absolute inset-0">
          <Image
            src={page.imageUrl}
            alt={`Page ${page.id}`}
            fill
            unoptimized // Necessario para SVGs do placehold.co
            sizes="100vw"
            className="object-cover pointer-events-none"
            draggable={false}
          />
        </div>
      </div>
    );
  }
);

Page.displayName = "Page";
