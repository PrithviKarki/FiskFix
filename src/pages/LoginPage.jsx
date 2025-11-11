import React, { useState } from 'react';

// This is a standalone component for your Login Page.
// It will be imported by your main App.jsx file.
export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setLoading(true); // Disable the button

    try {
      // Call your backend API endpoint
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send email and password as a JSON string
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Get the { user, token } or { message }

      if (!response.ok) {
        // If server responded with an error (e.g., 401 "Invalid password")
        throw new Error(data.message || 'Login failed. Please try again.');
      }

      // --- SUCCESS ---
      // 'data' is the object: { _id, email, role, token }
      // Pass this full data object up to App.jsx's handleLogin
      onLogin(data);

    } catch (err) {
      // This catches network errors or the error we threw
      setError(err.message);
      setLoading(false); // Re-enable the button only if there's an error
    }
    // We don't set loading to false on success, because the page is about to unmount
  };
  // ---------------------------------------------

  // ... in src/pages/LoginPage.jsx
  return (
    <div style={styles.pageCard}>
      <h1 style={styles.header}>FiskFix</h1>
      <h2 style={styles.subheader}>Student & Staff Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>

        {/* This will display any login errors */}
        {error && <p style={styles.errorText}>{error}</p>}

        {/* --- START: ADD THESE INPUTS BACK --- */}
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="jdoe@fisk.edu"
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="••••••••"
            required
          />
        </div>
        {/* --- END: ADD THESE INPUTS BACK --- */}

        <button 
          type="submit" 
          style={loading ? styles.buttonDisabled : styles.buttonPrimary} 
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        
      </form>
    </div>
  );
}
const baseButtonStyles = {
  border: 'none',
  borderRadius: '6px',
  padding: '12px 16px',
  fontSize: '16px',
  fontWeight: 600,
  cursor: 'pointer',
  marginTop: '8px',
  width: '100%', // Make button full width
};

// Now, define the main styles object
const styles = {
  pageCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    padding: '24px 32px',
    width: '100%',
    maxWidth: '400px',
  },
  header: {
    color: '#1a202c',
    fontSize: '24px',
    fontWeight: 600,
    margin: 0,
    marginBottom: '8px',
    textAlign: 'center',
  },
  subheader: {
    color: '#4a5568',
    fontSize: '16px',
    fontWeight: 400,
    margin: 0,
    marginBottom: '24px',
    textAlign: 'center',
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
  // Use the base style and add the primary color
  buttonPrimary: {
    ...baseButtonStyles,
    backgroundColor: '#3182ce',
    color: 'white',
  },
  // This is the new style we added
  errorText: {
    color: '#e53e3e',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  // Use the base style and add the disabled color
  buttonDisabled: {
    ...baseButtonStyles,
    backgroundColor: '#a0aec0',
    cursor: 'not-allowed',
    color: '#ffffff',
  },
};