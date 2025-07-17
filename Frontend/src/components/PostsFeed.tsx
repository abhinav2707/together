import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostsFeedProps {
  currentUser: any;
  onActivePostChange: (author: any) => void;
}

const PostsFeed = ({ currentUser, onActivePostChange }: PostsFeedProps) => {
  const [posts] = useState([
    {
      id: 1,
      username: "sarah_jones",
      name: "Sarah Jones",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b732?w=100&h=100&fit=crop&crop=face",
      email: "sarah.jones@example.com",
      followers: 2540,
      following: 892,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
      caption: "Beautiful sunset at the beach 🌅 #sunset #beach #nature",
      likes: 1234,
      comments: 56,
      timestamp: "2 hours ago",
      isLiked: false
    },
    {
      id: 2,
      username: "mike_wilson",
      name: "Mike Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      email: "mike.wilson@example.com",
      followers: 1890,
      following: 456,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop",
      caption: "Coffee and code ☕️ #developer #coding #coffee",
      likes: 892,
      comments: 23,
      timestamp: "4 hours ago",
      isLiked: true
    },
    {
      id: 3,
      username: "emma_davis",
      name: "Emma Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      email: "emma.davis@example.com",
      followers: 3240,
      following: 720,
      image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=600&h=600&fit=crop",
      caption: "Delicious homemade pasta 🍝 #cooking #foodie #homemade",
      likes: 2156,
      comments: 78,
      timestamp: "6 hours ago",
      isLiked: false
    }
  ]);

  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set([2]));

  // Set the first post author as active on mount
  useEffect(() => {
    if (posts.length > 0) {
      onActivePostChange({
        name: posts[0].name,
        username: posts[0].username,
        avatar: posts[0].avatar,
        email: posts[0].email,
        followers: posts[0].followers,
        following: posts[0].following
      });
    }
  }, [posts, onActivePostChange]);

  const toggleLike = (postId: number) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const handlePostClick = (post: any) => {
    onActivePostChange({
      name: post.name,
      username: post.username,
      avatar: post.avatar,
      email: post.email,
      followers: post.followers,
      following: post.following
    });
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          {/* Post Header */}
          <div className="flex items-center justify-between p-4">
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:bg-muted p-2 rounded-lg -m-2"
              onClick={() => handlePostClick(post)}
            >
              <img
                src={post.avatar}
                alt={post.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-card-foreground">{post.username}</p>
                <p className="text-sm text-muted-foreground">{post.timestamp}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* Post Image */}
          <div className="relative" onClick={() => handlePostClick(post)}>
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-96 object-cover cursor-pointer"
            />
          </div>

          {/* Post Actions */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleLike(post.id)}
                  className="transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      likedPosts.has(post.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-card-foreground hover:text-muted-foreground'
                    }`}
                  />
                </button>
                <button className="text-card-foreground hover:text-muted-foreground">
                  <MessageCircle className="w-6 h-6" />
                </button>
                <button className="text-card-foreground hover:text-muted-foreground">
                  <Share className="w-6 h-6" />
                </button>
              </div>
              <button className="text-card-foreground hover:text-muted-foreground">
                <Bookmark className="w-6 h-6" />
              </button>
            </div>

            {/* Likes Count */}
            <p className="font-semibold text-card-foreground mb-2">
              {post.likes.toLocaleString()} likes
            </p>

            {/* Caption */}
            <p className="text-card-foreground">
              <span className="font-semibold">{post.username}</span> {post.caption}
            </p>

            {/* Comments */}
            <button className="text-muted-foreground text-sm mt-2 hover:text-card-foreground">
              View all {post.comments} comments
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsFeed;
