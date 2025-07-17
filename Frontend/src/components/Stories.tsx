
import { useState } from "react";
import { Plus } from "lucide-react";

const Stories = () => {
  const [stories] = useState([
    {
      id: 1,
      username: "your_story",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      isOwn: true
    },
    {
      id: 2,
      username: "sarah_jones",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b732?w=100&h=100&fit=crop&crop=face",
      hasStory: true
    },
    {
      id: 3,
      username: "mike_wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      hasStory: true
    },
    {
      id: 4,
      username: "emma_davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      hasStory: true
    },
    {
      id: 5,
      username: "alex_brown",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      hasStory: true
    }
  ]);

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-4">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">Stories</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0 cursor-pointer group">
            <div className="relative">
              <div className={`w-16 h-16 rounded-full p-1 ${
                story.isOwn 
                  ? 'bg-muted' 
                  : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500'
              }`}>
                <img
                  src={story.avatar}
                  alt={story.username}
                  className="w-full h-full rounded-full object-cover border-2 border-card"
                />
              </div>
              {story.isOwn && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-card">
                  <Plus className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <p className="text-xs text-center mt-2 text-muted-foreground max-w-[64px] truncate">
              {story.isOwn ? "Your story" : story.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
