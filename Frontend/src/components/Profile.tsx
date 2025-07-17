
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Grid3X3, 
  Bookmark, 
  Tag, 
  Settings, 
  MoreHorizontal, 
  Heart, 
  MessageCircle, 
  Send,
  UserPlus,
  Users
} from "lucide-react";

interface ProfileProps {
  currentUser?: any;
}

const Profile = ({ currentUser }: ProfileProps) => {
  const [activeTab, setActiveTab] = useState("posts");
  
  const user = currentUser || {
    name: "John Doe",
    username: "johndoe",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    bio: "✨ Creating amazing content\n📸 Photography enthusiast\n🌍 Travel lover",
    website: "www.johndoe.com",
    followers: 1234,
    following: 567,
    posts: 89
  };

  const posts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300",
      likes: 245,
      comments: 12
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=300",
      likes: 189,
      comments: 8
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=300",
      likes: 312,
      comments: 24
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=300",
      likes: 156,
      comments: 6
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=300",
      likes: 278,
      comments: 15
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1682687221080-5cb261c645cb?w=300",
      likes: 423,
      comments: 31
    }
  ];

  const highlights = [
    { id: 1, title: "Travel", cover: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100" },
    { id: 2, title: "Food", cover: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100" },
    { id: 3, title: "Work", cover: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=100" },
    { id: 4, title: "Friends", cover: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100" }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen">
      {/* Profile Header */}
      <div className="p-6">
        <div className="flex items-start space-x-8 mb-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gradient-to-r from-purple-400 to-pink-400"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <h1 className="text-2xl font-light">{user.username}</h1>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Edit profile
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 mb-4">
              <div className="text-center">
                <span className="font-semibold text-lg">{user.posts}</span>
                <span className="text-gray-600 ml-1">posts</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-lg">{user.followers.toLocaleString()}</span>
                <span className="text-gray-600 ml-1">followers</span>
              </div>
              <div className="text-center">
                <span className="font-semibold text-lg">{user.following}</span>
                <span className="text-gray-600 ml-1">following</span>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-4">
              <h2 className="font-semibold mb-1">{user.name}</h2>
              <p className="text-sm whitespace-pre-line">{user.bio}</p>
              {user.website && (
                <a 
                  href={`https://${user.website}`} 
                  className="text-blue-600 text-sm hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Follow
              </Button>
              <Button variant="outline" size="sm">
                Message
              </Button>
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="flex flex-col items-center space-y-2 flex-shrink-0">
              <div className="w-16 h-16 rounded-full border-2 border-gray-300 p-1">
                <img
                  src={highlight.cover}
                  alt={highlight.title}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="text-xs text-gray-600 text-center">{highlight.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-center bg-transparent h-12 border-b">
            <TabsTrigger 
              value="posts" 
              className="flex items-center space-x-2 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
            >
              <Grid3X3 className="w-4 h-4" />
              <span className="text-xs font-semibold">POSTS</span>
            </TabsTrigger>
            <TabsTrigger 
              value="saved" 
              className="flex items-center space-x-2 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
            >
              <Bookmark className="w-4 h-4" />
              <span className="text-xs font-semibold">SAVED</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tagged" 
              className="flex items-center space-x-2 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
            >
              <Tag className="w-4 h-4" />
              <span className="text-xs font-semibold">TAGGED</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-0">
            <div className="grid grid-cols-3 gap-1">
              {posts.map((post) => (
                <div key={post.id} className="aspect-square relative group cursor-pointer">
                  <img
                    src={post.image}
                    alt={`Post ${post.id}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex items-center space-x-4 text-white">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-5 h-5 fill-current" />
                        <span className="font-semibold">{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-5 h-5 fill-current" />
                        <span className="font-semibold">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-0">
            <div className="flex flex-col items-center justify-center py-16">
              <Bookmark className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-light mb-2">Save posts you want to see again</h3>
              <p className="text-gray-600 text-center max-w-md">
                Only you can see what you've saved
              </p>
            </div>
          </TabsContent>

          <TabsContent value="tagged" className="mt-0">
            <div className="flex flex-col items-center justify-center py-16">
              <Tag className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-light mb-2">Photos of you</h3>
              <p className="text-gray-600 text-center max-w-md">
                When people tag you in photos, they'll appear here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
