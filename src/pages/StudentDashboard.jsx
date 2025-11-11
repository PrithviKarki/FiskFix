// File: src/pages/StudentDashboard.jsx

import React, { useState, useEffect } from 'react';

// We now accept 'token' as a prop
export default function StudentDashboard({ user, token, onNewRequest, onLogout }) {
  // --- STATE ---
  // We'll store our real requests here
  const [requests, setRequests] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- DATA FETCHING ---
  /**
   * This "effect" hook runs once when the component loads.
   * Its job is to fetch the data from our new API endpoint.
   */
  useEffect(() => {
    // Define the async function to fetch data
    const fetchMyRequests = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await fetch('http://localhost:5001/api/workorders/mine', {
          method: 'GET',
          headers: {
            // We must send our token to prove who we are!
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch requests.');
        }

        const data = await response.json();
        setRequests(data); // Save the real data!

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Call the function
    fetchMyRequests();

  }, [token]); // The dependency array [token] ensures this re-runs if the token changes

  // --- RENDER LOGIC ---

  const getStatusStyle = (status) => {
    if (status === 'In Progress') return { ...styles.statusBadge, ...styles.statusInProgress };
    if (status === 'Completed') return { ...styles.statusBadge, ...styles.statusCompleted };
    return { ...styles.statusBadge, ...styles.statusSubmitted };
  };

  // Helper function to render the list of requests
  const renderRequests = () => {
    if (loading) {
      return <p style={styles.requestInfo}>Loading your requests...</p>;
    }
    if (error) {
      return <p style={styles.requestInfo}>{error}</p>;
    }
    if (requests.length === 0) {
      return <p style={styles.requestInfo}>You have no active maintenance requests.</p>;
    }
    
    // We now map over the real 'requests' from state, not 'mockRequests'
    return requests.map(req => (
      <div key={req._id} style={styles.requestCard}>
        <div>
          <p style={styles.requestTitle}>{req.title}</p>
          <p style={styles.requestInfo}>Room: {req.building} {req.room}</p>
          <p style={styles.requestInfo}>Submitted: {new Date(req.createdAt).toLocaleDateString()}</p>
        </div>
        <span style={getStatusStyle(req.status)}>{req.status}</span>
      </div>
    ));
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.dashboardHeader}>
        <h1 style={styles.header}>Welcome, {user ? user.email.split('@')[0] : 'Student'}!</h1>
        <button onClick={onLogout} style={styles.buttonSecondary}>Logout</button>
      </header>

      <div style={styles.dashboardActions}>
        <h2 style={styles.subheader}>My Maintenance Requests</h2>
        <button onClick={onNewRequest} style={styles.buttonPrimary}>
          + New Request
        </button>
      </div>

      <div style={styles.requestList}>
        {renderRequests()}
      </div>
    </div>
  );
}

// --- STYLES ---
// (These are the same as before, with a few minor tweaks)
const baseButtonStyles = {
  border: 'none',
  borderRadius: '6px',
  padding: '12px 16px',
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',
};

const styles = {
  pageContainer: {
    width: '100%',
    maxWidth: '800px',
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  header: {
    color: '#1a202c',
    fontSize: '24px',
    fontWeight: 600,
    margin: 0,
  },
  subheader: {
    color: '#4a5568',
    fontSize: '20px',
    fontWeight: 500,
    margin: 0,
  },
  dashboardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  buttonPrimary: {
    ...baseButtonStyles,
    backgroundColor: '#3182ce',
    color: 'white',
  },
  buttonSecondary: {
    ...baseButtonStyles,
    backgroundColor: '#e2e8f0',
    color: '#2d3748',
  },
  requestList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  requestCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requestTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#2d3748',
    margin: '0 0 4px 0',
  },
  requestInfo: {
    fontSize: '14px',
    color: '#4a5568',
    margin: 0,
  },
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