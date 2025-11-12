// File: src/pages/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';

// This is the new component for the Admin/RD dashboard
export default function AdminDashboard({ user, token, onLogout }) {
  // --- STATE ---
  const [requests, setRequests] = useState([]); // To hold ALL work orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- DATA FETCHING ---
  /**
   * This effect runs once on load to get all work orders
   */
  useEffect(() => {
    fetchWorkOrders();
  }, [token]);

  /**
   * Fetches all work orders from the protected admin endpoint
   */
  const fetchWorkOrders = async () => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('http://localhost:5001/api/workorders/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Send the admin's token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch work orders.');
      }

      const data = await response.json();
      // We sort by date, newest first
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRequests(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * This function is called when an admin clicks a status button.
   * It calls the PUT endpoint to update the request's status.
   */
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5001/api/workorders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status.');
      }

      // If successful, update the request in our local state
      // This makes the UI update instantly without a full re-fetch
      setRequests(prevRequests =>
        prevRequests.map(req =>
          req._id === id ? { ...req, status: newStatus } : req
        )
      );

    } catch (err) {
      // If the API call fails, we just log it for now
      console.error('Update failed:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  // --- RENDER LOGIC ---

  const getStatusStyle = (status) => {
    if (status === 'In Progress') return { ...styles.statusBadge, ...styles.statusInProgress };
    if (status === 'Completed') return { ...styles.statusBadge, ...styles.statusCompleted };
    return { ...styles.statusBadge, ...styles.statusSubmitted };
  };

  // Helper to render the main content
  const renderContent = () => {
    if (loading) {
      return <p style={styles.infoText}>Loading all requests...</p>;
    }
    if (error) {
      return <p style={styles.errorText}>{error}</p>;
    }
    if (requests.length === 0) {
      return <p style={styles.infoText}>There are no work orders in the system.</p>;
    }
    
    // Render the table of requests
    return (
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>Student</th>
            <th style={styles.tableCell}>Location</th>
            <th style={styles.tableCell}>Issue</th>
            <th style={styles.tableCell}>Status</th>
            <th style={styles.tableCell}>Submitted</th>
            <th style={styles.tableCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req._id} style={styles.tableRow}>
              <td style={styles.tableCell}>{req.submittedBy ? req.submittedBy.email : 'N/A'}</td>
              <td style={styles.tableCell}>{req.building} {req.room}</td>
              <td style={styles.tableCell}>{req.title}</td>
              <td style={styles.tableCell}>
                <span style={getStatusStyle(req.status)}>{req.status}</span>
              </td>
              <td style={styles.tableCell}>{new Date(req.createdAt).toLocaleDateString()}</td>
              <td style={{...styles.tableCell, ...styles.actionCell}}>
                {/* Only show buttons if the status is not already this */}
                {req.status !== 'In Progress' && (
                  <button 
                    style={styles.actionButton}
                    onClick={() => handleUpdateStatus(req._id, 'In Progress')}
                  >
                    Start
                  </button>
                )}
                {req.status !== 'Completed' && (
                  <button 
                    style={{...styles.actionButton, ...styles.completeButton}}
                    onClick={() => handleUpdateStatus(req._id, 'Completed')}
                  >
                    Complete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.dashboardHeader}>
        <h1 style={styles.header}>Admin Dashboard</h1>
        <div style={styles.userInfo}>
          <span style={styles.subheader}>Welcome, {user ? user.email.split('@')[0] : 'Admin'}!</span>
          <button onClick={onLogout} style={styles.buttonSecondary}>Logout</button>
        </div>
      </header>
      
      <div style={styles.content}>
        <h2 style={styles.subheader}>All Work Orders</h2>
        {renderContent()}
      </div>
    </div>
  );
}

// --- STYLES ---

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
    maxWidth: '1200px', // Admins need a wider view
    padding: '20px',
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
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  buttonSecondary: {
    ...baseButtonStyles,
    padding: '8px 16px', // Smaller logout button
    fontSize: '14px',
    backgroundColor: '#e2e8f0',
    color: '#2d3748',
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    padding: '24px 32px',
  },
  infoText: {
    fontSize: '16px',
    color: '#4a5568',
    textAlign: 'center',
    padding: '40px',
  },
  errorText: {
    fontSize: '16px',
    color: '#e53e3e',
    textAlign: 'center',
    padding: '40px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f7fafc',
  },
  tableRow: {
    borderBottom: '1px solid #e2e8f0',
  },
  tableCell: {
    padding: '12px 16px',
    fontSize: '14px',
    textAlign: 'left',
    color: '#2d3748',
  },
  actionCell: {
    display: 'flex',
    gap: '8px',
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
  actionButton: {
    ...baseButtonStyles,
    padding: '6px 12px',
    fontSize: '12px',
    backgroundColor: '#3182ce',
    color: 'white',
  },
  completeButton: {
    backgroundColor: '#38a169',
  },
};