import React, { useState } from 'react';

// Import the 3 page components
// We add .jsx to be explicit and avoid potential import errors
import LoginPage from './pages/LoginPage.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import NewRequestForm from './pages/NewRequestForm.jsx';

// This is the "control center" component
export default function App() {
  // 'page' state tracks which page to show: 'login', 'dashboard', or 'newRequest'
  const [page, setPage] = useState('login');

  // 'user' state tracks who is logged in (null if no one)
  const [user, setUser] = useState(null);

  // --- Event Handlers ---

  /**
   * Called from LoginPage.
   * Sets the user and navigates to the dashboard.
   */
  const handleLogin = (username) => {
    // In a real app, you'd check a password. Here we just log them in.
    setUser({ name: username });
    setPage('dashboard');
  };

  /**
   * Called from StudentDashboard.
   * Clears the user and returns to the login page.
   */
  const handleLogout = () => {
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
            onNewRequest={() => setPage('newRequest')}
            onLogout={handleLogout}
          />
        );
      
      case 'newRequest':
        return (
          <NewRequestForm
            onSubmit={() => setPage('dashboard')} // Go back to dashboard on submit
            onCancel={() => setPage('dashboard')} // Go back to dashboard on cancel
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