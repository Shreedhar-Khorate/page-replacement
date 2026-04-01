import React from 'react';
import { motion } from 'framer-motion';

export function StatsPanel({ stats, algorithmName }) {
  if (!stats) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-slate-200 mb-4">
          Statistics
        </h3>
        <div className="text-center py-8 text-slate-500">
          <div className="text-3xl mb-2">📊</div>
          <p className="text-sm">Run a simulation to see statistics</p>
        </div>
      </div>
    );
  }

  const statItems = [
    { label: 'Total Pages', value: stats.totalPages, type: 'neutral' },
    { label: 'Page Hits', value: stats.hits, type: 'hit' },
    { label: 'Page Faults', value: stats.faults, type: 'fault' },
    { label: 'Hit Ratio', value: `${stats.hitRatio}%`, type: 'neutral' },
    { label: 'Fault Ratio', value: `${stats.faultRatio}%`, type: 'neutral' },
    { label: 'Frame Count', value: stats.frameCount, type: 'neutral' },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-200 mb-4">
        {algorithmName}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            className="bg-slate-800/30 p-3 rounded-lg border border-white/5 hover:bg-slate-800/50 transition-colors duration-200 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1 leading-tight">
              {item.label}
            </div>
            <div
              className={`font-mono text-lg font-bold ${
                item.type === 'hit'
                  ? 'text-emerald-400'
                  : item.type === 'fault'
                    ? 'text-red-400'
                    : 'text-slate-200'
              }`}
            >
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
