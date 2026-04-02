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
              <rect x="4" y="6" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
              <rect x="8" y="10" width="16" height="8" rx="1" fill="currentColor" opacity="0.8"/>
              <rect x="10" y="12" width="12" height="1" fill="currentColor"/>
              <rect x="10" y="15" width="8" height="1" fill="currentColor"/>
              <rect x="6" y="24" width="20" height="2" rx="1" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="logo-text">Page Replacement Algorithm Simulation</h1>
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
