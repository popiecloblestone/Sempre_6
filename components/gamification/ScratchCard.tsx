"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ScratchCardProps {
  rewardText: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ScratchCard({ rewardText, isOpen, onClose }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setIsScratched(false), 0);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill the canvas with a silver-like scratch layer
    ctx.fillStyle = "#cbd5e1"; // slate-300
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Context composition for scratching/erasing
    ctx.globalCompositeOperation = "destination-out";
  }, [isOpen]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    checkScratched();
  };

  const getPosition = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const checkScratched = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) {
        transparentPixels++;
      }
    }

    const totalPixels = imageData.data.length / 4;
    const scratchPercentage = (transparentPixels / totalPixels) * 100;

    if (scratchPercentage > 40 && !isScratched) {
      setIsScratched(true);
      // Automatically clear the rest for a satisfying reveal
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const { x, y } = getPosition(e);
    scratch(x, y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const { x, y } = getPosition(e);
    scratch(x, y);
  };

  const handleEnd = () => setIsDrawing(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-center select-none overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-2">Raspadinha Surpresa!</h3>
            <p className="text-sm text-gray-500 mb-6">Raspe a área abaixo para revelar seu cupom.</p>

            <div className="relative w-full h-40 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 mx-auto shadow-inner bg-linear-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
              
              {/* Background text revealed when scratched */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-1">Parabéns!</span>
                <span className="text-2xl font-black text-red-600">{rewardText}</span>
              </div>

              {/* Foreground Canvas */}
              <canvas
                ref={canvasRef}
                width={320} // arbitrary resolution
                height={160}
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
                className={`absolute inset-0 w-full h-full cursor-crosshair touch-none transition-opacity duration-700 ${
                  isScratched ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>

            {isScratched && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 w-full py-3 bg-red-600 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgb(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] hover:bg-red-700 transition"
                onClick={onClose}
              >
                Resgatar Agora
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
