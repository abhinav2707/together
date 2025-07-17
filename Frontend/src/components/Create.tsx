
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Upload, Image, Video, Music, MapPin, Users, Settings } from "lucide-react";

interface CreateProps {
  onClose: () => void;
}

const Create = ({ onClose }: CreateProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(Array.from(files));
    
    // Simulate upload progress
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFileSelect(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelect(Array.from(e.target.files));
    }
  };

  const handlePost = () => {
    console.log("Posting:", { selectedFiles, caption, location });
    // Simulate posting
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold">Create new post</h1>
        <Button 
          onClick={handlePost}
          disabled={selectedFiles.length === 0}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6"
        >
          Share
        </Button>
      </div>

      <div className="flex-1 flex">
        {/* Left Side - Media Upload */}
        <div className="flex-1 flex flex-col">
          {selectedFiles.length === 0 ? (
            <div 
              className="flex-1 flex flex-col items-center justify-center p-8 border-r bg-gray-50"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  <Upload className="w-12 h-12 text-purple-600" />
                </div>
                <h2 className="text-2xl font-light mb-4">Drag photos and videos here</h2>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Select from computer
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 border-r bg-black flex items-center justify-center relative">
              {selectedFiles[0] && (
                <img
                  src={URL.createObjectURL(selectedFiles[0])}
                  alt="Selected"
                  className="max-w-full max-h-full object-contain"
                />
              )}
              {isUploading && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black bg-opacity-50 rounded p-2">
                    <div className="text-white text-sm mb-1">Uploading... {uploadProgress}%</div>
                    <div className="w-full bg-gray-600 rounded-full h-1">
                      <div 
                        className="bg-purple-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side - Post Details */}
        <div className="w-80 bg-white flex flex-col">
          <div className="p-4 flex-1">
            {/* User Info */}
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">U</span>
              </div>
              <span className="ml-3 font-medium">Your Username</span>
            </div>

            {/* Caption */}
            <div className="mb-4">
              <Label htmlFor="caption" className="text-sm font-medium">Write a caption...</Label>
              <textarea
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                className="w-full mt-2 p-3 border rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {caption.length}/2,200
              </div>
            </div>

            {/* Location */}
            <div className="mb-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Add location"
                    className="border-0 p-0 focus:ring-0"
                  />
                </div>
              </div>
            </div>

            {/* Accessibility */}
            <div className="mb-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">Accessibility</span>
                <span className="text-xs text-gray-500">Alt text</span>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="mb-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">Advanced settings</span>
                <Settings className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-purple-600">
                  <Users className="w-4 h-4 mr-1" />
                  Tag people
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
