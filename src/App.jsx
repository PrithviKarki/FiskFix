import React, { useState } from 'react';

// Import the 3 page components
// We add .jsx to be explicit and avoid potential import errors
import LoginPage from './pages/LoginPage.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import NewRequestForm from './pages/NewRequestForm.jsx';

// This is the "control center" component
export default function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null); // Will hold the user object { _id, email, role }
  const [token, setToken] = useState(null); // Will hold the login token

  // --- Event Handlers ---

  /**
   * Called from LoginPage.
   * Sets the user and navigates to the dashboard.
   */
  const handleLogin = (userData) => {
    // userData is the full { _id, email, role, token } object from the server
    
    // 1. Save the token
    setToken(userData.token); 
    
    // 2. Save the user object
    setUser(userData);
    
    // 3. Navigate to the dashboard
    setPage('dashboard');
  };

  /**
   * Called from StudentDashboard.
   * Clears the user and returns to the login page.
   */
  const handleLogout = () => {
    // Clear both the token and the user object
    setToken(null);
    setUser(null);
    setPage('login');
  };

  // --- Conditional Rendering ---

  /**
   * This function decides which page component to render
   * based on the current value of the 'page' state.
   */
  const renderPage = () => {
    switch (page) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      
      case 'dashboard':
        return (
          <StudentDashboard
            user={user}
            token={token} // <-- ADD THIS LINE
            onNewRequest={() => setPage('newRequest')}
            onLogout={handleLogout}
          />
        );
      
      case 'newRequest':
        return (
          <NewRequestForm
            onSubmit={() => setPage('dashboard')}
            onCancel={() => setPage('dashboard')}
            token={token} // <-- ADD THIS LINE
          />
        );
      
      default:
        // Fallback to login page
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  const styles = {
    appContainer: {
      display: 'flex',
      justifyContent: 'center',    // Horizontally centers the card
      alignItems: 'center',       // Vertically centers the card
      minHeight: '100vh',           // Makes the container fill the screen height
      backgroundColor: '#333333', // A dark background like your screenshot
    }
  };

  // The main render for App. It just renders the result
  // of our renderPage() function. The styles from index.css
  // will handle the background, and each page handles its own layout.
  return (
    <div style={styles.appContainer}>
      {renderPage()}
    </div>
  );
}