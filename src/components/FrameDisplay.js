import React from 'react';
import { motion } from 'framer-motion';
import '../styles/FrameDisplay.css';

export function FrameDisplay({ frames, currentPage, status, replacedPage }) {
  const statusColor = status === 'HIT' ? 'success' : 'danger';

  return (
    <div className="frame-display-wrapper">
      <div className="frames-grid">
        {frames.length === 0 ? (
          <motion.div
            className="empty-memory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="empty-icon">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <rect x="8" y="12" width="40" height="32" stroke="currentColor" strokeWidth="2" fill="none" rx="4" />
                <line x1="8" y1="24" x2="48" y2="24" stroke="currentColor" strokeWidth="2" opacity="0.3" />
              </svg>
            </div>
            <p className="empty-text">No pages in memory</p>
          </motion.div>
        ) : (
          frames.map((page, idx) => (
            <motion.div
              key={idx}
              className={`memory-frame ${page === currentPage ? 'current' : ''} ${page === replacedPage ? 'replaced' : ''}`}
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
                scale: 1.08,
                transition: { type: 'spring', stiffness: 400, damping: 10 },
              }}
            >
              <motion.span
                className="frame-number"
                key={page}
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

              {page === currentPage && (
                <motion.div
                  className="status-indicator current-indicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                />
              )}

              {page === replacedPage && (
                <motion.div
                  className="status-indicator replaced-indicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                />
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Page Info Section */}
      <motion.div
        className="page-info-section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="info-card current-card">
          <div className="info-label">Current Page</div>
          <div className="info-value">{currentPage}</div>
        </div>

        <motion.div
          className={`status-badge ${statusColor}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            delay: 0.2,
          }}
          key={status}
        >
          <div className="status-dot"></div>
          <span className="status-label">{status}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
