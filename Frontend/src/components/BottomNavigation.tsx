
import { Home, Search, PlusSquare, Film, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BottomNavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const BottomNavigation = ({ activeView, onViewChange }: BottomNavigationProps) => {
  const navItems = [
    { icon: Home, label: "Home", key: "home" },
    { icon: Search, label: "Search", key: "search" },
    { icon: PlusSquare, label: "Create", key: "create" },
    { icon: Film, label: "Reels", key: "reels" },
    { icon: MessageCircle, label: "Messages", key: "messages" },
    { icon: User, label: "Profile", key: "profile" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size="sm"
            onClick={() => onViewChange(item.key)}
            className={`flex flex-col items-center p-2 min-w-0 ${
              activeView === item.key
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <item.icon className={`w-6 h-6 mb-1 ${activeView === item.key ? 'fill-current' : ''}`} />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
