import React from 'react';
import { motion } from 'framer-motion';

export function ComparisonMode({ results }) {
  if (!results || results.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-slate-200 mb-4">
          Algorithm Comparison
        </h3>
        <div className="text-center py-8 text-slate-500">
          <div className="text-3xl mb-2">⚖️</div>
          <p className="text-sm">Run simulations to compare algorithms</p>
        </div>
      </div>
    );
  }

  const bestAlgorithm = results.reduce((best, current) =>
    parseFloat(current.stats.hitRatio) > parseFloat(best.stats.hitRatio)
      ? current
      : best
  );

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-200 mb-4">
        Algorithm Comparison
      </h3>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        <table className="w-full min-w-[280px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                Algorithm
              </th>
              <th className="text-center py-2 px-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Hits
              </th>
              <th className="text-center py-2 px-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Faults
              </th>
              <th className="text-center py-2 px-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Hit %
              </th>
              <th className="text-center py-2 px-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Fault %
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <motion.tr
                key={result.name}
                className={`hover:bg-white/5 transition-colors duration-200 ${
                  result.name === bestAlgorithm.name ? 'bg-emerald-500/5' : ''
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-1 min-w-0">
                    <span className="font-medium text-slate-200 text-sm truncate">
                      {result.name}
                    </span>
                    {result.name === 'Optimal' && (
                      <span className="pill-badge text-xs">Opt</span>
                    )}
                    {result.name === bestAlgorithm.name &&
                      result.name !== 'Optimal' && (
                        <span className="text-xs text-emerald-400">★</span>
                      )}
                  </div>
                </td>
                <td className="py-3 px-1 text-center">
                  <span className="font-mono text-emerald-400 font-semibold text-sm">
                    {result.stats.hits}
                  </span>
                </td>
                <td className="py-3 px-1 text-center">
                  <span className="font-mono text-red-400 font-semibold text-sm">
                    {result.stats.faults}
                  </span>
                </td>
                <td className="py-3 px-1 text-center">
                  <span className="font-mono text-slate-200 font-semibold text-sm">
                    {result.stats.hitRatio}%
                  </span>
                </td>
                <td className="py-3 px-1 text-center">
                  <span className="font-mono text-slate-200 font-semibold text-sm">
                    {result.stats.faultRatio}%
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
