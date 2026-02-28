"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface ReadingProgressProps {
  currentPage: number;
  totalPages: number;
  onComplete?: () => void;
}

export function ReadingProgress({ currentPage, totalPages, onComplete }: ReadingProgressProps) {
  const [completed, setCompleted] = useState(false);
  const progress = totalPages > 1 ? (currentPage / (totalPages - 1)) * 100 : 100;

  useEffect(() => {
    if (progress >= 100 && !completed) {
      setTimeout(() => {
        setCompleted(true);
        if (onComplete) onComplete();
      }, 0);
    }
  }, [progress, completed, onComplete]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200 z-40 px-4 py-3 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex-1 max-w-2xl mx-auto flex items-center gap-4">
        {/* Texts */}
        <div className="flex flex-col min-w-[120px]">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Sua Jornada
          </span>
          <span className="text-sm font-bold text-gray-900">
            {currentPage + 1} de {totalPages} págs
          </span>
        </div>

        {/* Bar */}
        <div className="flex-1 h-3 bg-gray-200 rounded-full relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-linear-to-r from-red-500 to-red-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />
        </div>

        {/* Reward Icon */}
        <div className="relative">
          <motion.div
            animate={completed ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              completed
                ? "bg-yellow-100 border-yellow-400 text-yellow-600 shadow-lg shadow-yellow-200"
                : "bg-gray-100 border-gray-300 text-gray-400"
            }`}
          >
            <Award className="w-5 h-5" />
          </motion.div>

          {/* Tooltip */}
          {completed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-full mb-3 right-0 md:bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-2xl whitespace-nowrap 
                         bg-red-600 font-medium"
            >
              🎉 Oferta Global Desbloqueada!
              <div className="absolute top-full right-4 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-red-600 md:bg-gray-900 rotate-45"></div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
