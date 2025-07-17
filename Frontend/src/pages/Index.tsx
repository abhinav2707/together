
import { useState } from "react";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleRegister = (userData: any) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return <Dashboard currentUser={currentUser} onLogout={() => setIsAuthenticated(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {showRegister ? (
        <Register 
          onRegister={handleRegister}
          switchToLogin={() => setShowRegister(false)}
        />
      ) : (
        <Login 
          onLogin={handleLogin}
          switchToRegister={() => setShowRegister(true)}
        />
      )}
    </div>
  );
};

export default Index;
