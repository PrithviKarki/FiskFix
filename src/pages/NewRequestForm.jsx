// File: src/pages/NewRequestForm.jsx

import React, { useState } from 'react';

// We now accept { onSubmit, onCancel, token } as props
export default function NewRequestForm({ onSubmit, onCancel, token }) {
  // State for all form fields
  const [title, setTitle] = useState('');
  const [building, setBuilding] = useState('Jubilee Hall'); // Default building
  const [room, setRoom] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState([]); // Will hold an array of strings

  // State for loading and messaging
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // --- FORM HANDLERS ---

  /**
   * Special handler for our checkboxes.
   * Adds/removes an availability slot from the array.
   */
  const handleAvailabilityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add the value to the array
      setAvailability(prev => [...prev, value]);
    } else {
      // Remove the value from the array
      setAvailability(prev => prev.filter(slot => slot !== value));
    }
  };

  /**
   * Main submit function.
   * This is what calls your new backend endpoint.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    // This is the data we will send to the backend
    const formData = {
      title,
      building,
      room,
      description,
      availability,
    };

    try {
      const response = await fetch('http://localhost:5001/api/workorders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // This is the "protect" part. We send the token.
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit request.');
      }

      // --- SUCCESS ---
      setSuccess(true); // Show success message
      setLoading(false);
      
      // Clear the form
      setTitle('');
      setBuilding('Jubilee Hall');
      setRoom('');
      setDescription('');
      setAvailability([]);

      // Wait 2 seconds, then navigate back to the dashboard
      setTimeout(() => {
        onSubmit(); // This is the function from App.jsx that changes the page
      }, 2000);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageCard}>
      <h1 style={styles.header}>New Maintenance Request</h1>

      {/* --- Main Form --- */}
      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* --- MESSAGES --- */}
        {error && <p style={styles.errorText}>{error}</p>}
        {success && <p style={styles.successText}>Success! Your request has been submitted.</p>}

        {/* --- FORM FIELDS --- */}
        <div style={styles.inputGroup}>
          <label htmlFor="issue-title" style={styles.label}>Issue Title</label>
          <input 
            type="text" 
            id="issue-title" 
            style={styles.input} 
            placeholder="e.g., 'Leaking Faucet'" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="building" style={styles.label}>Building</label>
          <select 
            id="building" 
            style={styles.input}
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
          >
            <option>Jubilee Hall</option>
            <option>New Living Center</option>
            <option>Mary D. Shane</option>
          </select>
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="room" style={styles.label}>Room Number</label>
          <input 
            type="text" 
            id="room" 
            style={styles.input} 
            placeholder="e.g., '101'" 
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <textarea 
            id="description" 
            style={styles.textarea} 
            placeholder="Please provide details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="upload" style={styles.label}>Upload Photo (Optional)</label>
          <input type="file" id="upload" style={styles.input} disabled />
          {/* File uploads are a Milestone 4 task, so we disable this for now */}
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Maintenance Availability</label>
          <p style={styles.availabilityInfo}>Please select times you are available.</p>
          <div style={styles.availabilityGrid}>
            {/* We use the handleAvailabilityChange for all checkboxes */}
            <label style={styles.checkboxLabel}><input type="checkbox" onChange={handleAvailabilityChange} value="Mon Morning" /> Mon Morning (8am-12pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" onChange={handleAvailabilityChange} value="Mon Afternoon" /> Mon Afternoon (1pm-5pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" onChange={handleAvailabilityChange} value="Tue Morning" /> Tue Morning (8am-12pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" onChange={handleAvailabilityChange} value="Tue Afternoon" /> Tue Afternoon (1pm-5pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" onChange={handleAvailabilityChange} value="Wed Morning" /> Wed Morning (8am-12pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" onChange={handleAvailabilityChange} value="Wed Afternoon" /> Wed Afternoon (1pm-5pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" onChange={handleAvailabilityChange} value="Thu Morning" /> Thu Morning (8am-12pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" onChange={handleAvailabilityChange} value="Thu Afternoon" /> Thu Afternoon (1pm-5pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" onChange={handleAvailabilityChange} value="Fri Morning" /> Fri Morning (8am-12pm)</label>
            <label style={styles.checkboxLabel}><input type="checkbox" onChange={handleAvailabilityChange} value="Fri Afternoon" /> Fri Afternoon (1pm-5pm)</label>
          </div>
        </div>
        
        <div style={styles.buttonGroup}>
          <button type="button" onClick={onCancel} style={styles.buttonSecondary} disabled={loading}>Cancel</button>
          <button type="submit" style={loading ? styles.buttonDisabled : styles.buttonPrimary} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
}

// --- STYLES ---
// (We add new errorText, successText, and buttonDisabled styles)
const baseButtonStyles = {
  border: 'none',
  borderRadius: '6px',
  padding: '12px 16px',
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',
  marginTop: '8px',
};

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
  availabilityInfo: {
    fontSize: '14px',
    color: '#4a5568',
    margin: '0 0 12px 0',
  },
  availabilityGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '16px',
  },
  buttonPrimary: {
    ...baseButtonStyles,
    backgroundColor: '#3182ce',
    color: 'white',
    flex: 1,
  },
  buttonSecondary: {
    ...baseButtonStyles,
    backgroundColor: '#e2e8f0',
    color: '#2d3748',
    flex: 1,
  },
  buttonDisabled: {
    ...baseButtonStyles,
    backgroundColor: '#a0aec0',
    cursor: 'not-allowed',
    color: '#ffffff',
    flex: 1,
  },
  errorText: {
    color: '#e53e3e',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  successText: {
    color: '#38a169',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '16px',
  }
};