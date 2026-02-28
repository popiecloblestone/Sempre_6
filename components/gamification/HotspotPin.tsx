"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface HotspotPinProps {
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  rewardId: string;
  onDiscover: (rewardId: string) => void;
  className?: string;
}

export function HotspotPin({ x, y, rewardId, onDiscover, className }: HotspotPinProps) {
  const [discovered, setDiscovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!discovered) {
      setDiscovered(true);
      onDiscover(rewardId);
    }
  };

  return (
    <div
      className={cn("absolute z-50 transform -translate-x-1/2 -translate-y-1/2", className)}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <AnimatePresence>
        {!discovered ? (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="relative group flex items-center justify-center w-10 h-10 rounded-full bg-red-600 shadow-xl cursor-pointer"
          >
            {/* Pulsing ring */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
            
            {/* Core pin */}
            <span className="relative flex items-center justify-center h-full w-full rounded-full bg-gradient-to-br from-red-500 to-red-600 border border-white/20 shadow-inner">
              <Gift className="w-5 h-5 text-white" />
            </span>

            {/* Tooltip */}
            <div className="absolute top-full mt-2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Prêmio Escondido!
            </div>
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: -20 }}
            className="text-red-600 font-bold text-sm bg-white px-2 py-1 rounded shadow-lg border border-red-100"
          >
            +1 Desconto
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
