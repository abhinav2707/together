
import { useState } from "react";
import Stories from "@/components/Stories";
import PostsFeed from "@/components/PostsFeed";
import UserProfile from "@/components/UserProfile";
import BottomNavigation from "@/components/BottomNavigation";
import Search from "@/components/Search";
import Create from "@/components/Create";
import Messages from "@/components/Messages";
import Profile from "@/components/Profile";

interface DashboardProps {
  currentUser: any;
  onLogout: () => void;
}

const Dashboard = ({ currentUser, onLogout }: DashboardProps) => {
  const [activePostAuthor, setActivePostAuthor] = useState<any>(null);
  const [activeView, setActiveView] = useState<string>("home");

  const renderMainContent = () => {
    switch (activeView) {
      case "search":
        return <Search />;
      case "create":
        return <Create onClose={() => setActiveView("home")} />;
      case "messages":
        return <Messages />;
      case "profile":
        return <Profile currentUser={currentUser} />;
      case "home":
      default:
        return (
          <div className="flex-1 max-w-2xl mx-auto px-4 py-6 lg:ml-80">
            {/* Stories Section */}
            <div className="mb-8">
              <Stories />
            </div>

            {/* Posts Feed */}
            <PostsFeed 
              currentUser={currentUser} 
              onActivePostChange={setActivePostAuthor}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar - Active Post Author Profile */}
        {activeView === "home" && (
          <div className="hidden lg:block w-80 bg-card shadow-sm border-r border-border fixed left-0 top-0 h-screen z-10">
            <UserProfile 
              user={activePostAuthor || currentUser} 
              onLogout={onLogout}
              isActivePostAuthor={!!activePostAuthor}
            />
          </div>
        )}

        {/* Center Content */}
        {renderMainContent()}

        {/* Right Sidebar - Could be used for future features */}
        <div className="hidden xl:block w-80">
          {/* Reserved for future features */}
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <BottomNavigation activeView={activeView} onViewChange={setActiveView} />
    </div>
  );
};

export default Dashboard;
