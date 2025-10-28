import React from 'react';

// This is a standalone component for your Student Dashboard Page.
// It will be imported by your main App.jsx file.
export default function StudentDashboard({ user, onNewRequest, onLogout }) {
  
  // Mock data for existing requests, based on your wireframe
  const mockRequests = [
    { id: '001', title: 'Leaking Faucet', status: 'In Progress', room: 'Jubilee 101' },
    { id: '002', title: 'Window stuck', status: 'Completed', room: 'New Living 302' },
    { id: '003', title: 'Heater not working', status: 'Submitted', room: 'Jubilee 101' },
  ];

  // Helper function to get the correct style for a status
  const getStatusStyle = (status) => {
    if (status === 'In Progress') return { ...styles.statusBadge, ...styles.statusInProgress };
    if (status === 'Completed') return { ...styles.statusBadge, ...styles.statusCompleted };
    return { ...styles.statusBadge, ...styles.statusSubmitted };
  };

  return (
    <div style={styles.pageContainer}>
      <header style={styles.dashboardHeader}>
        <h1 style={styles.header}>Welcome, {user ? user.name.split('@')[0] : 'Student'}!</h1>
        <button onClick={onLogout} style={styles.buttonSecondary}>Logout</button>
      </header>

      <div style={styles.dashboardActions}>
        <h2 style={styles.subheader}>My Maintenance Requests</h2>
        <button onClick={onNewRequest} style={styles.buttonPrimary}>
          + New Request
        </button>
      </div>

      <div style={styles.requestList}>
        {mockRequests.length > 0 ? (
          mockRequests.map(req => (
            <div key={req.id} style={styles.requestCard}>
              <div>
                <p style={styles.requestTitle}>{req.title}</p>
                <p style={styles.requestInfo}>Room: {req.room}</p>
              </div>
              <span style={getStatusStyle(req.status)}>{req.status}</span>
            </div>
          ))
        ) : (
          <p style={styles.requestInfo}>You have no active maintenance requests.</p>
        )}
      </div>
    </div>
  );
}

// ------------------------------------
// STYLES OBJECT
// ------------------------------------
const styles = {
  pageContainer: {
    width: '100%',
    maxWidth: '800px',
  },
  header: {
    color: '#1a202c',
    fontSize: '24px',
    fontWeight: 600,
    margin: 0,
    marginBottom: '8px',
  },
  subheader: {
    color: '#4a5568',
    fontSize: '18px',
    fontWeight: 400,
    margin: 0,
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  dashboardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
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
    fontSize: '16px',
    fontWeight: 600,
    color: '#2d3748',
    margin: 0,
  },
  requestInfo: {
    fontSize: '14px',
    color: '#718096',
    margin: 0,
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  statusSubmitted: {
    backgroundColor: '#e2e8f0',
    color: '#4a5568',
  },
  statusInProgress: {
    backgroundColor: '#fefcbf', // yellow-200
    color: '#975a16', // yellow-800
  },
  statusCompleted: {
    backgroundColor: 'rgba(198, 246, 213, 1)', // green-200
    color: 'rgba(47, 133, 90, 1)', // green-800
  },
  buttonPrimary: {
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  buttonSecondary: {
    backgroundColor: '#e2e8f0',
    color: '#2d3748',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};
