import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Navbar.css';

export function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="8" width="6" height="16" fill="currentColor" opacity="0.6" />
              <rect x="13" y="4" width="6" height="20" fill="currentColor" opacity="0.8" />
              <rect x="22" y="12" width="6" height="12" fill="currentColor" />
            </svg>
          </div>
          <h1 className="logo-text">Page Replacement Simulator</h1>
        </div>

        {/* Subtitle */}
        <div className="navbar-subtitle">
          <p>Visualize & Analyze OS Memory Management Algorithms</p>
        </div>

        {/* Info Section */}
        <div className="navbar-info">
          <div className="info-item">
            <span className="info-label">Algorithms</span>
            <span className="info-value">4</span>
          </div>
          <div className="divider"></div>
          <div className="info-item">
            <span className="info-label">Real-time</span>
            <span className="info-value">Analytics</span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
