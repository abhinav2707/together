import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, User } from "lucide-react";
import { Card } from "@/components/ui/card";

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  followers: number;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver>();
  const lastUserElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  // Generate random users data
  const generateUsers = (count: number, startId: number = 1): User[] => {
    const names = [
      "Emma Johnson", "Liam Smith", "Olivia Brown", "Noah Davis", "Ava Wilson",
      "Ethan Moore", "Sophia Taylor", "Mason Anderson", "Isabella Thomas", "William Jackson",
      "Mia White", "James Harris", "Charlotte Martin", "Benjamin Thompson", "Amelia Garcia",
      "Lucas Rodriguez", "Harper Lewis", "Henry Lee", "Evelyn Walker", "Alexander Hall",
      "Abigail Allen", "Michael Young", "Emily Hernandez", "Daniel King", "Elizabeth Wright"
    ];
    
    return Array.from({ length: count }, (_, index) => ({
      id: startId + index,
      name: names[index % names.length],
      username: `user${startId + index}`,
      avatar: `https://images.unsplash.com/photo-${1472099645785 + index}?w=150&h=150&fit=crop&crop=face`,
      followers: Math.floor(Math.random() * 10000) + 100
    }));
  };

  // Initialize users on component mount
  useEffect(() => {
    const initialUsers = generateUsers(20);
    setUsers(initialUsers);
    setVisibleUsers(initialUsers.slice(0, 8));
  }, []);

  // Load more users when page changes
  useEffect(() => {
    if (page > 1) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const newUsers = generateUsers(8, users.length + 1);
        setUsers(prev => [...prev, ...newUsers]);
        setVisibleUsers(prev => [...prev, ...newUsers]);
        setLoading(false);
      }, 500);
    }
  }, [page, users.length]);

  // Filter users based on search query
  const filteredUsers = visibleUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <Card className="p-4 shadow-sm">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-0 focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </Card>
      </div>

      {/* Users Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredUsers.map((user, index) => (
            <div
              key={user.id}
              ref={index === filteredUsers.length - 1 ? lastUserElementRef : null}
              className="group cursor-pointer"
            >
              <Card className="p-4 hover:shadow-md transition-all duration-200 group-hover:scale-105">
                <div className="text-center">
                  <div className="relative mx-auto w-20 h-20 mb-3">
                    <LazyImage
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover border-2 border-muted group-hover:border-primary transition-colors"
                    />
                  </div>
                  <h3 className="font-semibold text-card-foreground text-sm truncate mb-1">
                    {user.name}
                  </h3>
                  <p className="text-muted-foreground text-xs mb-2">@{user.username}</p>
                  <p className="text-muted-foreground text-xs">
                    {user.followers.toLocaleString()} followers
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
              <span>Loading more users...</span>
            </div>
          </div>
        )}

        {/* No results message */}
        {searchQuery && filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">No users found</h3>
            <p className="text-muted-foreground">Try searching with a different keyword</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Lazy loading image component
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage = ({ src, alt, className }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {isInView ? (
        <>
          {!isLoaded && (
            <div className="w-full h-full bg-muted animate-pulse rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
          <img
            src={src}
            alt={alt}
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            onLoad={() => setIsLoaded(true)}
            style={{ display: isLoaded ? 'block' : 'none' }}
          />
        </>
      ) : (
        <div className="w-full h-full bg-muted animate-pulse rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default Search;
