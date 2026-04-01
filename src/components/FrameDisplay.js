import React from 'react';
import { motion } from 'framer-motion';

export function FrameDisplay({ frames, currentPage, status, replacedPage }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {frames.length === 0 ? (
          <motion.div
            className="col-span-full text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-4xl mb-4">📭</div>
            <p className="text-slate-400">No pages in memory</p>
          </motion.div>
        ) : (
          frames.map((page, idx) => (
            <motion.div
              key={idx}
              className={`memory-slot aspect-square flex items-center justify-center relative overflow-hidden ${
                page === currentPage
                  ? 'ring-2 ring-indigo-500/50 bg-indigo-500/10'
                  : page === replacedPage
                    ? 'ring-2 ring-red-500/50 bg-red-500/10'
                    : ''
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: idx * 0.1,
                duration: 0.3,
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 400, damping: 10 },
              }}
            >
              {/* Inner shadow for recessed effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700/20 to-slate-900/40 rounded-lg"></div>

              {/* Page number */}
              <motion.span
                className="relative z-10 text-4xl font-mono font-bold text-slate-200 text-center"
                key={page} // Re-animate when page changes
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 15,
                  delay: 0.1,
                }}
              >
                {page}
              </motion.span>

              {/* Status indicator */}
              {page === currentPage && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                />
              )}

              {page === replacedPage && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                />
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Page Info */}
      <motion.div
        className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-white/5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center space-x-3">
          <span className="text-sm text-slate-400">Current Page:</span>
          <span className="font-mono text-lg font-semibold text-slate-200">
            {currentPage}
          </span>
        </div>

        <motion.div
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === 'HIT'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            delay: 0.2,
          }}
          key={status} // Re-animate when status changes
        >
          {status}
        </motion.div>
      </motion.div>
    </div>
  );
}
