// File: src/components/WorkOrderModal.jsx

import React from 'react';

// This component receives the 'request' object to display
// and an 'onClose' function to close itself.
export default function WorkOrderModal({ request, onClose }) {

  // This prevents clicks inside the modal content from closing it
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const getStatusStyle = (status) => {
    if (status === 'In Progress') return { ...styles.statusBadge, ...styles.statusInProgress };
    if (status === 'Completed') return { ...styles.statusBadge, ...styles.statusCompleted };
    return { ...styles.statusBadge, ...styles.statusSubmitted };
  };

  return (
    // The "Backdrop" - a full-screen, semi-transparent layer.
    // Clicking this will close the modal.
    <div style={styles.backdrop} onClick={onClose}>
      
      {/* The "Modal Content" - the white card in the middle. */}
      <div style={styles.modalContent} onClick={handleContentClick}>
        
        {/* --- Header --- */}
        <div style={styles.header}>
          <h2 style={styles.title}>{request.title}</h2>
          <span style={getStatusStyle(request.status)}>{request.status}</span>
        </div>

        {/* --- Details Grid --- */}
        <div style={styles.detailsGrid}>
          <div>
            <p style={styles.label}>Submitted By</p>
            <p style={styles.value}>{request.submittedBy.email || 'N/A'}</p>
          </div>
          <div>
            <p style={styles.label}>Submitted On</p>
            <p style={styles.value}>{new Date(request.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p style={styles.label}>Building</p>
            <p style={styles.value}>{request.building}</p>
          </div>
          <div>
            <p style={styles.label}>Room</p>
            <p style={styles.value}>{request.room}</p>
          </div>
        </div>

        {/* --- Description --- */}
        <div style={styles.section}>
          <p style={styles.label}>Description</p>
          <p style={styles.value}>{request.description || '(No description provided)'}</p>
        </div>

        {/* --- Availability --- */}
        <div style={styles.section}>
          <p style={styles.label}>Student Availability</p>
          {request.availability && request.availability.length > 0 ? (
            <ul style={styles.list}>
              {request.availability.map((slot, index) => (
                <li key={index} style={styles.listItem}>{slot}</li>
              ))}
            </ul>
          ) : (
            <p style={styles.value}>(No availability provided)</p>
          )}
        </div>

        {/* --- Close Button --- */}
        <button style={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

// --- STYLES ---

const styles = {
  // Full-screen overlay
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Make sure it's on top
  },
  // White card
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
    padding: '24px 32px',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '80vh', // Make it scrollable if content is tall
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '16px',
    marginBottom: '20px',
  },
  title: {
    color: '#1a20c2',
    fontSize: '22px',
    fontWeight: 600,
    margin: 0,
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '20px',
  },
  section: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#4a5568',
    margin: '0 0 4px 0',
  },
  value: {
    fontSize: '16px',
    color: '#2d3748',
    margin: 0,
  },
  list: {
    margin: 0,
    paddingLeft: '20px',
  },
  listItem: {
    fontSize: '16px',
    color: '#2d3748',
    marginBottom: '4px',
  },
  closeButton: {
    display: 'block',
    marginLeft: 'auto', // Push to the right
    border: 'none',
    borderRadius: '6px',
    padding: '12px 20px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    backgroundColor: '#e2e8f0',
    color: '#2d3748',
  },
  // Status badge styles (copied from dashboards)
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  statusSubmitted: {
    backgroundColor: '#f0f0f0',
    color: '#4a5568',
  },
  statusInProgress: {
    backgroundColor: '#fefcbf',
    color: '#92400e',
  },
  statusCompleted: {
    backgroundColor: '#c6f6d5',
    color: '#2f855a',
  },
};