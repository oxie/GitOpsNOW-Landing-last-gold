import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20"></div>
        
        {/* Spinning ring */}
        <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin"></div>
        
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/10 filter blur-sm animate-pulse"></div>
        
        {/* Center dot */}
        <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-emerald-500"></div>
      </motion.div>
    </div>
  );
}