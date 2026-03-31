import React from 'react';
import '../styles/FrameDisplay.css';

export function FrameDisplay({ frames, currentPage, status, replacedPage }) {
  return (
    <div className="frame-display">
      <h3>Memory Frames</h3>
      <div className="frames-container">
        {frames.length === 0 ? (
          <div className="empty-frames">No pages in memory</div>
        ) : (
          frames.map((page, idx) => (
            <div
              key={idx}
              className={`frame ${
                page === currentPage ? 'current' : ''
              } ${page === replacedPage ? 'replaced' : ''}`}
            >
              {page}
            </div>
          ))
        )}
      </div>
      <div className="page-info">
        <div className={`current-page ${status}`}>
          <strong>Current Page:</strong> {currentPage}
        </div>
        <div className={`status-badge ${status.toLowerCase()}`}>
          {status}
        </div>
      </div>
    </div>
  );
}
