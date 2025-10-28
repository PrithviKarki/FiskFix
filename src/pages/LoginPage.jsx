import React, { useState } from 'react';

// This is a standalone component for your Login Page.
// It will be imported by your main App.jsx file.
export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // In a real app, this would be more complex.
      // For now, we just pass the email up to the App component.
      onLogin(email.trim());
    }
  };

  return (
    <div style={styles.pageCard}>
      <h1 style={styles.header}>FiskFix</h1>
      <h2 style={styles.subheader}>Student & Staff Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
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
        <button type="submit" style={styles.buttonPrimary}>
          Sign In
        </button>
      </form>
    </div>
  );
}

// ------------------------------------
// STYLES OBJECT
// We use this to style our components without a CSS file.
// ------------------------------------
const styles = {
  pageCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    padding: '24px 32px',
    width: '100%',
    maxWidth: '450px', // Sized for a login form
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
    boxSizing: 'border-box', // Important for padding to work correctly
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
};
