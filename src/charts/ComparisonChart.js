import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';
import '../styles/ComparisonChart.css';

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export function ComparisonChart({ results }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!results || results.length === 0 || !chartRef.current) return;

    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart instance BEFORE creating a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    const labels = results.map((r) => r.name);
    const hitData = results.map((r) => parseFloat(r.stats.hitRatio));
    const faultData = results.map((r) => parseFloat(r.stats.faultRatio));

    const gradientHit = ctx.createLinearGradient(0, 0, 0, 400);
    gradientHit.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
    gradientHit.addColorStop(1, 'rgba(16, 185, 129, 0.3)');

    const gradientFault = ctx.createLinearGradient(0, 0, 0, 400);
    gradientFault.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
    gradientFault.addColorStop(1, 'rgba(239, 68, 68, 0.3)');

    try {
      chartInstanceRef.current = new ChartJS(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Hit Ratio (%)',
              data: hitData,
              backgroundColor: gradientHit,
              borderColor: '#10b981',
              borderWidth: 1,
              borderRadius: 8,
              borderSkipped: false,
              barPercentage: 0.7,
              categoryPercentage: 0.8,
            },
            {
              label: 'Fault Ratio (%)',
              data: faultData,
              backgroundColor: gradientFault,
              borderColor: '#ef4444',
              borderWidth: 1,
              borderRadius: 8,
              borderSkipped: false,
              barPercentage: 0.7,
              categoryPercentage: 0.8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#cbd5e1',
                font: {
                  size: 12,
                  weight: 600,
                  family: "'Inter', 'system-ui', 'sans-serif'",
                },
                padding: 16,
                usePointStyle: true,
                pointStyle: 'circle',
              },
            },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#e2e8f0',
              bodyColor: '#cbd5e1',
              borderColor: '#475569',
              borderWidth: 2,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: function (context) {
                  return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + '%';
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                color: '#94a3b8',
                font: {
                  size: 11,
                  weight: 500,
                },
                callback: function (value) {
                  return value + '%';
                },
              },
              grid: {
                color: 'rgba(71, 85, 105, 0.1)',
                drawBorder: false,
              },
            },
            x: {
              ticks: {
                color: '#cbd5e1',
                font: {
                  size: 12,
                  weight: 600,
                },
              },
              grid: {
                display: false,
                drawBorder: false,
              },
            },
          },
        },
      });
    } catch (error) {
      console.error('Error creating chart:', error);
    }

    return () => {
      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.destroy();
          chartInstanceRef.current = null;
        } catch (error) {
          console.error('Error destroying chart:', error);
        }
      }
    };
  }, [results]);

  if (!results || results.length === 0) {
    return (
      <motion.div
        className="chart-container empty-state"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="chart-empty">
          <div className="chart-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 3v18" />
              <rect x="11" y="11" width="6" height="6" fill="currentColor" />
              <rect x="3" y="13" width="4" height="4" fill="currentColor" />
            </svg>
          </div>
          <p>Run a simulation to view comparison charts</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="chart-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="chart-header">
        <h3 className="chart-title">Algorithm Comparison</h3>
        <p className="chart-subtitle">Hit Ratio vs Fault Ratio Analysis</p>
      </div>
      <div className="chart-wrapper">
        <canvas ref={chartRef}></canvas>
      </div>
    </motion.div>
  );
}

