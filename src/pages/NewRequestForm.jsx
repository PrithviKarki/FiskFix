import React from 'react';

// This is a standalone component for your New Request Form Page.
// It will be imported by your main App.jsx file.
export default function NewRequestForm({ onSubmit, onCancel }) {
  
  // In a real app, we'd use state to manage all these inputs.
  // For a static component, we can just display them.

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would gather all form data here
    // and send it to the backend.
    // For now, we just navigate back to the dashboard.
    onSubmit();
  };

  return (
    <div style={styles.pageCard}>
      <h1 style={styles.header}>New Maintenance Request</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        
        <div style={styles.inputGroup}>
          <label htmlFor="issue-title" style={styles.label}>Issue Title</label>
          <input type="text" id="issue-title" style={styles.input} placeholder="e.g., 'Leaking Faucet'" required />
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="building" style={styles.label}>Building</label>
          <select id="building" style={styles.input} required>
            <option value="">Select a building...</option>
            <option>Jubilee Hall</option>
            <option>New Living Center</option>
            <option>Mary D. Shane</option>
            {/* Add other residence halls as needed */}
          </select>
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="room" style={styles.label}>Room Number</label>
          <input type="text" id="room" style={styles.input} placeholder="e.g., '101'" required />
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <textarea id="description" style={styles.textarea} placeholder="Please provide details..."></textarea>
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="upload" style={styles.label}>Upload Photo (Optional)</label>
          <input type="file" id="upload" style={styles.input} />
        </div>
        
        {/* This is the new scheduling feature based on your wireframe */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Maintenance Availability</label>
          <p style={styles.availabilityInfo}>Please select times you are available for maintenance to visit your room.</p>
          <div style={styles.availabilityGrid}>
            <label style={styles.checkboxLabel}><input type="checkbox" /> Mon Morning (8am-12pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" /> Mon Afternoon (1pm-5pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" /> Tue Morning (8am-12pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" /> Tue Afternoon (1pm-5pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" /> Wed Morning (8am-12pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" /> Wed Afternoon (1pm-5pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" /> Thu Morning (8am-12pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" /> Thu Afternoon (1pm-5pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" /> Fri Morning (8am-12pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" /> Fri Afternoon (1pm-5pm)</label>
          </div>
        </div>
        
        <div style={styles.buttonGroup}>
          <button type="button" onClick={onCancel} style={styles.buttonSecondary}>Cancel</button>
          <button type="submit" style={styles.buttonPrimary}>Submit Request</button>
        </div>
      </form>
    </div>
  );
}

// ------------------------------------
// STYLES OBJECT
// ------------------------------------
const styles = {
  pageCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    padding: '24px 32px',
    width: '100%',
    maxWidth: '600px',
  },
  header: {
    color: '#1a202c',
    fontSize: '24px',
    fontWeight: 600,
    margin: 0,
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    marginBottom: '4px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#2d3748',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '16px',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    minHeight: '100px',
    padding: '10px 12px',
    fontSize: '16px',
    border: '1px solid #cbd5e0',
    borderRadius: '6px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  buttonPrimary: {
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 16px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '8px',
  },
  buttonSecondary: {
    backgroundColor: '#e2e8f0',
    color: '#2d3748',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 16px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '8px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '16px',
  },
  availabilityInfo: {
    fontSize: '13px',
    color: '#718096',
    margin: '0 0 12px 0',
  },
  availabilityGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#2d3748',
    cursor: 'pointer',
  }
};
