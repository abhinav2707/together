
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Phone, Video, Info, Send, Smile, Image, Heart } from "lucide-react";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Alice Johnson",
      username: "alice.j",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b95b35cf?w=150",
      lastMessage: "Hey! How are you doing?",
      time: "2m",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Bob Smith",
      username: "bob.smith",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      lastMessage: "Thanks for sharing that!",
      time: "1h",
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: "Carol Davis",
      username: "carol_d",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      lastMessage: "See you tomorrow 👋",
      time: "3h",
      unread: 1,
      online: true
    }
  ];

  const messages = selectedChat ? [
    {
      id: 1,
      text: "Hey! How are you doing?",
      sender: "other",
      time: "2:30 PM",
      type: "text"
    },
    {
      id: 2,
      text: "I'm doing great! Just finished a new project 🎉",
      sender: "me",
      time: "2:32 PM",
      type: "text"
    },
    {
      id: 3,
      text: "That's awesome! Would love to see it",
      sender: "other",
      time: "2:33 PM",
      type: "text"
    }
  ] : [];

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="h-screen flex bg-white">
      {/* Left Sidebar - Conversations */}
      <div className="w-96 border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">Messages</h1>
            <Button variant="ghost" size="sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations
            .filter(conv => 
              conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              conv.username.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedChat(conversation)}
              className={`p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors ${
                selectedChat?.id === conversation.id ? 'bg-purple-50 border-purple-200' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <span className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat */}
      <div className="flex-1 flex flex-col">
        {!selectedChat ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <Send className="w-12 h-12 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your Messages</h2>
              <p className="text-gray-600">Send private photos and messages to a friend or group.</p>
              <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Send Message</Button>
            </div>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedChat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{selectedChat.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedChat.online ? "Active now" : "Active 1h ago"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Info className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.sender === 'me'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Image className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Heart className="w-5 h-5" />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    placeholder="Message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Send
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Messages;
